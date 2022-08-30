import "dart:io";
import "package:serve/src/middware.dart";
import "package:serve/src/logger.dart";
import "package:serve/src/reader.dart";
import "package:serve/src/write.dart";
import "dart:isolate";

class H {
  late SendPort port;
  late HttpRequest req;
  H(this.port, this.req);
}

mixin Base {
  Middleware _middleware = Middleware();
}

class Serve with Base {
  dynamic _ip = InternetAddress.anyIPv4;

  Serve() {
    this._middleware.use(Logger());
  }

  late final HttpServer _server;

  void use(MiddlewareStruct middleware) {
    this._middleware.use(middleware);
  }

  _processRequestImpl(HttpRequest req) async {
    // var req = h.req;

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
    // h.port.send(null);
  }

  _processClientRequest(HttpRequest req) async {
    // var p = ReceivePort();

    // Isolate.spawn(this._processRequestImpl, H(p.sendPort, req)).then((o) {
    //   p.listen((m) {
    //     p.close();
    //     o.kill(priority: 0);
    //   });
    // });

     this._processRequestImpl(req);

    // final res = req.response;

    // HttpReader reader = HttpReader(req);
    // HttpWriter writer = HttpWriter(res);
    // // todo: 处理404
    // try {
    //   await this._middleware.apply(reader, writer);
    // } on MiddleStopProcessRequestError catch (exx, tarck) {
    //   writer.status(exx.code);
    //   await writer.finish();
    //   await res.close();
    // } catch (exx, stack) {
    //   print(exx);
    //   print(stack);
    //   // 数据已经写入， code不能更改
    //   writer.status(500);
    //   // write.write("error:\r\n");
    //   // write.write(e);
    // } finally {
    //   if (!writer.finished) {
    //     await writer.finish();
    //     await res.close();
    //     return;
    //   }
    //   // if (writer.) {
    // }
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
          "server startup! \r\nlistener: http://${_server.address.host}:$port");
    }

    await for (HttpRequest req in _server) {
      this._processClientRequest(req);
    }
  }
}
