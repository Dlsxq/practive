import "package:serve/src/middware.dart";
import 'package:serve/src/reader.dart';
import 'package:serve/src/write.dart';

typedef RouterHandler(HttpReader reader, HttpWriter writer);

class Router implements MiddlewareStruct {
  late String? _baseRouterPath;

  Router([String? _baseRouterPath]);

  Map<String, Map<String, Set<RouterHandler>>> _routerHandlers = {
    "GET": {},
    "POST": {},
    "PUT": {}
  };

  Future<void> apply(HttpReader reader, HttpWriter writer) async {
    try {
      _runner(Set<RouterHandler> clientListener, HttpReader req,
          HttpWriter res) async {
        Future<void> promise = Future(() async {
          for (RouterHandler fn in clientListener.toList()) {
            await fn(req, res);
          }
        });
        return promise;
      }

      return _runner(
          _getHandlerSet(reader.method, reader.path), reader, writer);
    } catch (exx) {
      print("erout");
      print(exx);
    }
  }

  Set<RouterHandler> _getHandlerSet(String method, String path) {
    Map<String, Set<RouterHandler>> innerMap = this._routerHandlers[method]!;

    Set<RouterHandler>? innerMapping = innerMap[path];

    if (innerMapping == null) {
      innerMapping = innerMap[path] = {};
    }

    return innerMapping;
  }

  _appendHandler(String method, String path, RouterHandler handler) {
    Set<RouterHandler> innerMapping = this._getHandlerSet(method, path);
    innerMapping.add(handler);
  }

  Router get(String path, RouterHandler handler) {
    _appendHandler("GET", path, handler);
    return this;
  }

  Router post(String path, RouterHandler handler) {
    _appendHandler("POST", path, handler);
    return this;
  }
}
