import "dart:io";
import 'dart:convert';

abstract class WriteBuilder {
  Map toJson();
}

class HttpWriter {
  HttpResponse _response;
  dynamic _responseBodyCache = null;
  int _statusCode = 200;
  bool finished = false;
  bool _writed = false;

  HttpWriter(
    HttpResponse this._response,
  );

  HttpHeaders get headers {
    return _response.headers;
  }

  void builder(WriteBuilder writeBuilder) {
    this.json(writeBuilder.toJson());
  }

  void json(Object payload) {
    var jsonencode = jsonEncode(payload);
    this.headers.contentType = ContentType.json;
    this.write(jsonencode);
  }

  void html(String doc) {
    headers.contentType = ContentType.html;
    this.write(doc);
  }

  void text(String str) {
    headers.contentType = ContentType.text;
    this.write(str);
  }

  void writeStream(Stream<List<int>> entry) {
    this._responseBodyCache = entry;
  }

  /// 模版引擎
  render(String path, {Map<String, dynamic>? state}) async {
    String rawFileContent = await File(path).readAsString();
    this.write(rawFileContent);
  }

  // Future<void> flush() async {
  //   await this._writeBody(_responseBodyCache);
  //   await this._response.flush();
  //   this._writed = false;
  // }

  write(Object data) {
    this._writed = true;
    if (this._responseBodyCache is Set) {
      (this._responseBodyCache as Set).add(data);
      return;
    }

    if (this._responseBodyCache == null) {
      this._responseBodyCache = data;
    } else {
      var s = Set();
      s.add(this._responseBodyCache);
      this._responseBodyCache = s;
    }
  }

  void status(int code, {String? message}) {
    this._statusCode = code;
    // _statusMessage = message;
  }

  cors() {
    this._response.headers
      ..set("Access-Control-Allow-Origin", "*")
      ..set("Access-Control-Allow-Method", "GET,POST,OPTIONS,HEAD,DELETE,PUT")
      ..set("Access-Control-Allow-Headers", "*");
  }

  Future<void> _writeBody(dynamic body) async {
    if (body is String) {
      return this._response.write(body);
    }
    if (body is List<int> || body is String) {
      if (_response.headers.contentLength == -1 && !this.finished) {
        this._response.headers.contentLength = body.length;
      }
      return _response.add(body);
    }
    if (body is Stream) {
      //? 是否开启gzip
      this._response.headers.add(HttpHeaders.transferEncodingHeader, "chunked");
      return await body.pipe(_response);
    }
  }

  Future<void> finish() async {
    if (this.finished) {
      return;
    }

    this.finished = true;
    // 404
    if (!this._writed) {
      this._response.statusCode = HttpStatus.notFound;
      this._response.headers.contentType = ContentType.html;
      this._writeBody("<h1>404</h1>");
      return;
    }

    this._response.statusCode = this._statusCode;

    if (this._responseBodyCache == null) {
      this._response.headers.removeAll(HttpHeaders.contentTypeHeader);
      return;
    }

    if (this._responseBodyCache is Set) {
      for (final el in this._responseBodyCache) {
        await this._writeBody(el);
      }
      return;
    }

    return await this._writeBody(_responseBodyCache);
  }
}
