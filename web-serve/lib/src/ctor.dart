import "dart:io";
import "package:serve/src/router.dart";
import "package:serve/src/static.dart";
import "package:serve/src/middware.dart";
import "package:serve/src/logger.dart";
import "package:serve/src/reader.dart";
import "package:serve/src/write.dart";

mixin Base {
  Middleware _middleware = Middleware();
}

class Serve with Base {
  Router _router = Router();
  dynamic _ip = InternetAddress.anyIPv4;


  Serve() {
    this._middleware.use(_router);
    this._middleware.use(Logger());
  }

  late final HttpServer _server;
  late final StaticServe staticServe;

  void get(String path, RouterHandler handler) {
    this._router.get(path, handler);
  }

  void post(String path, RouterHandler handler) {
    this._router.post(path, handler);
  }

  void use(MiddlewareStruct middleware) {
    this._middleware.use(middleware);
  }

  _processClientRequest(HttpRequest req) async {
    final res = req.response;

    HttpReader reader = HttpReader(req);
    HttpWriter writer = HttpWriter(res);
  // todo: 处理404
    try {
      await this._middleware.apply(reader, writer);
    } on MiddleStopProcessRequestError catch (exx, tarck) {
      writer.status(exx.code);
      await writer.finish();
      await res.close();
    } catch (exx, stack) {
      print(exx);
      print(stack);
      // 数据已经写入， code不能更改
      writer.status(500);
      // write.write("error:\r\n");
      // write.write(e);
    } finally {
      if (!writer.finished) {
        await writer.finish();
        await res.close();
      }
    }
  }

  Future<void> listen(int port,
      {void binding(int port, InternetAddress address)?, String? ip}) async {
    if (ip != null) {
      this._ip = ip;
    }

    this._server = await HttpServer.bind(_ip, port);

    if (binding != null) {
      binding(port, _server.address);
    } else {
      print(
          "server started! \r\nnetwork : http://${_server.address.host}:$port");
    }

    await for (HttpRequest req in _server) {
      this._processClientRequest(req);
    }
  }
}
