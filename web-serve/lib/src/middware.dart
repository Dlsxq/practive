
import 'package:serve/src/reader.dart';
import 'package:serve/src/write.dart';

abstract class MiddlewareStruct {
  Future<void> apply(HttpReader reader,
      HttpWriter writer); // (HttpRequest req, HttpResponse res);
}

abstract class MiddlewareError {
  late String message;
}

class MiddleWareError implements MiddlewareError {
  String message = "middle ware error";
}

class MiddleStopProcessRequestError implements MiddlewareError {
  String message = "stop current req";
  int code = 500;
  MiddleStopProcessRequestError(int this.code);
}

class Middleware {
  Middleware();

  Set<MiddlewareStruct> _middlewareSets = {};

  use(MiddlewareStruct middleware) {
  this.  _middlewareSets.add(middleware);
  }

  Future<void> apply(HttpReader reader, HttpWriter writer) async {
    Future<void> promise = Future(() async {
      for (MiddlewareStruct fn in this._middlewareSets.toList()) {
        try {
          await fn.apply(reader, writer);
        } catch (exx, exx2) {
          if (exx is MiddleWareError) {
            continue;
          }
          throw exx;
        }
      }
    });
    return promise;
  }
}
