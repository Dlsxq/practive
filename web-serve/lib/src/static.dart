import 'dart:io';
import "package:serve/src/middware.dart";
import 'package:serve/src/reader.dart';
import 'package:serve/src/write.dart';

final extFileNameMaps = {
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

_extMediaTypeOfFile(HttpWriter write, ext) {
  var hev = extFileNameMaps[ext];
  write.headers.contentType = hev;
}

class StaticServe implements MiddlewareStruct {
  late String _rootPath = StaticServe.getCurrentScriptDirectory();
  late final RegExp _prefix;
  late final String _cache;
  late final String _directory;

  // todo 设置文件
  StaticServe(dynamic prefix,
      {String? rootPath, String? cache, String? directory}) {
    if (rootPath != null) {
      this._rootPath = rootPath;
    }

    if (prefix is RegExp) {
      this._prefix = prefix;
    } else if (prefix is String) {
      this._prefix = RegExp("^" + prefix);
    }

    this._cache = cache ?? "max-age=3000";
    this._directory = directory ?? "public";
  }

  static String getCurrentScriptDirectory() {
    return Platform.script.path.replaceAll(RegExp(r"/[\w]+.dart$"), "");
  }

  String _buildFullPath(String path) {
    return "${this._rootPath}/${this._directory}${path.replaceFirst(this._prefix, '')}";
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
      fileStream = await this._getFile(this._buildFullPath("index.html"));
    }
    if (fileStream == null) {
      writer.text(fullPath);
      writer
          .html("<h1 style=\"text-align: center\" >is not a single file</h1>");
      throw MiddleStopProcessRequestError(404);
    }

    // 获取扩展名
    var ext = path.substring(path.lastIndexOf(".") + 1);

    // 写入请求头， 文件的媒体类型
    if (ext.isNotEmpty) {
      _extMediaTypeOfFile(writer, ext);
    } else {
      writer.headers.contentType = ContentType.text;
    }

    //>  增加缓存
    writer.headers.set(HttpHeaders.cacheControlHeader, this._cache);

    writer.writeStream(fileStream);
    // await writer.flush();
    throw MiddleStopProcessRequestError(200);
  }
}
