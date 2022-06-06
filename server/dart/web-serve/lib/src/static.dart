import 'dart:io';
import "package:serve/src/middware.dart";
import 'package:serve/src/reader.dart';
import 'package:serve/src/write.dart';

final extFileNamemaps = {
  "html": ContentType("text", "html", charset: "utf-8"),
  "css": ContentType("text", "css", charset: "utf-8"),
  "js": ContentType("application", "javascript", charset: "utf-8"),
  "json": ContentType("application", "json", charset: "utf-8"),
  "txt": ContentType.text,
  "jpg": ContentType("image", "jpeg"),
  "jpeg": ContentType("image", "jpeg"),
  "eps": ContentType("application", "postscript"),
  "png": ContentType("image", "png"),
  "gif": ContentType("image", "gif"),
  "bmp": ContentType("image", "bmp"),
  "tiff": ContentType("image", "tiff"),
  "tif": ContentType("image", "tiff"),
  "ico": ContentType("image", "x-icon"),
  "svg": ContentType("image", "svg+xml"),

  /* Documents */
  "rtf": ContentType("application", "rtf"),
  "pdf": ContentType("application", "pdf"),
  "csv": ContentType("text", "plain", charset: "utf-8"),
  "md": ContentType("text", "plain", charset: "utf-8"),

  /* Fonts */
  "ttf": ContentType("font", "ttf"),
  "eot": ContentType("application", "vnd.ms-fontobject"),
  "woff": ContentType("font", "woff"),
  "otf": ContentType("font", "otf"),
};

_extFileNameToheader(HttpWriter write, ext) {
  var hev = extFileNamemaps[ext];
  write.headers.contentType = hev;
}

class StaticServe implements MiddlewareStruct {
  String directory = "public";
  late String _staticPath = StaticServe.getCurrentScriptDirectory();
  late final RegExp _prefix;

  // todo 设置文件
  StaticServe(String prefix, [String? staticPath]) {
    if (staticPath != null) {
      this._staticPath = staticPath;
    }

    this._prefix = RegExp("^" + prefix);
  }

  static String getCurrentScriptDirectory() {
    return Platform.script.path.replaceAll(RegExp(r"/[\w]+.dart$"), "");
  }

  String _buildFullPath(String path) {
    return "${this._staticPath}/${this.directory}${path.replaceFirst(this._prefix, '')}";
  }

  Map<
      String,
      Future<void> Function(HttpReader reader, HttpWriter writer,
          Future<Stream<List<int>>?> Function())> _fileHandler = {};

  StaticServe fileHandler(
      String path,
      Future<void> handler(
          HttpReader reader, HttpWriter writer, dynamic getFile())) {
    this._fileHandler[path] = handler;
    return this;
  }

  Future<Stream<List<int>>?> _getFile(String fullPath) async {
    File file = File(fullPath);
    var exist = await file.exists();
    if (!exist) {
      return null;
    }

    return file.openRead();
  }

  Future<void> apply(HttpReader reader, HttpWriter writer) async {
    String path = reader.path;

    if (!path.startsWith(this._prefix)) {
      return;
    }
    
    var fullPath = this._buildFullPath(path);
    var handler = this._fileHandler[path];

    if (handler is Function) {
      await handler!(reader, writer, () => this._getFile(fullPath));
      return;
    }

    var fileStream = await this._getFile(fullPath);

    if (fileStream == null) {
      writer.text(fullPath);
      writer.text("is not a single file");
      throw MiddleStopProcessRequestError(404);
    }
    // 获取扩展名
    var ext = path.substring(path.lastIndexOf(".") + 1);

    if (ext.isNotEmpty) {
      _extFileNameToheader(writer, ext);
    } else {
      writer.headers.contentType = ContentType.text;
    }

    //>  增加缓存
    writer.headers.set(HttpHeaders.cacheControlHeader, "max-age=3000");


    writer.writeStream(fileStream);
    // await writer.flush();
    throw MiddleStopProcessRequestError(200);
  }
}
