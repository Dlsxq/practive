import 'dart:convert';
import 'dart:io';
import 'dart:typed_data';
import "package:serve/src/parser.dart";

abstract class ReadBuilder {
  fromJson(Map<String, dynamic> map);
}

class HttpReader {
  bool _payloadDone = false;

  late HttpRequest _req;
  late StringBuffer _originalPaylaodString;
  late BytesBuilder _originalPayloadBytes;

  HttpReader(HttpRequest this._req);

  Future<void> _readRawDataString() async {
    StringBuffer buffer = StringBuffer();
    BytesBuilder byteBuffer = BytesBuilder();

    try {
      // this._originalPaylaodString =
      //     StringBuffer(this._req.cast<List<int>>().transform(utf8.decoder));

      await for (var byte in this._req) {
        var list = byte.toList();
        buffer.write(String.fromCharCodes(list));
        byteBuffer.add(list);
      }

      this._originalPayloadBytes = byteBuffer;
      this._originalPaylaodString = buffer;
    } catch (e) {
      print("可读流操作失败");
      print(e);
    } finally {
      this._payloadDone = true;
    }
  }

  Future<BytesBuilder> readByte() async {
    return this._originalPayloadBytes;
  }

  Future<String> readString() async {
    if (this._req.method != "POST") {
      return "";
    }

    if (this._payloadDone) {
      return this._originalPaylaodString.toString();
    }
    await this._readRawDataString();
    return this._originalPaylaodString.toString();
  }

  Future<T> json<T extends Map>() async {
    return Parser.json(await readString()) as T;
  }

  Future<T> form<T extends Map>() async {
    return Parser.form(await readString()) as T;
  }

  Future<T> formData<T extends Map>() async {
    return Parser.formData(await readString(),
        _req.headers.contentType!.parameters["boundary"]!) as T;
  }

  Future<T> builder<T extends Object>(ReadBuilder? readBuilder) async {
    Map payload;

    switch (this._req.headers.contentType?.mimeType) {
      case "application/json":
        payload = await json();
        break;
      case "application/x-www-form-urlencoded":
        payload = await form();
        break;
      case "multipart/form-data":
        payload = await formData();
        break;
      default:
        return (readBuilder ?? Map()) as T;
    }

    if (readBuilder != null) {
      readBuilder.fromJson(payload as Map<String, dynamic>);
      return readBuilder as T;
    }

    return payload as T;
  }

  get headers => this._req.headers;
  get path => this._req.uri.path;
  get query => this._req.uri.queryParameters;
  get method => this._req.method;
}
