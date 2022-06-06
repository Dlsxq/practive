import "package:serve/src/middware.dart";
import 'package:serve/src/reader.dart';
import 'package:serve/src/write.dart';

class Logger implements MiddlewareStruct {
  Future<void> apply(HttpReader reader, HttpWriter writer) async {
    final path = reader.path;
    final method = reader.method;
    this.log(this._buildMessage(path, method));
  }

  String _buildMessage(String path, String method) {
    var now = DateTime.now().toString();
    return "[${now.substring(0, now.length - 7)}]: $method -> $path";
  }

  void log(String message) {
    print(message);
  }

  success() {}

  warn() {}

}
