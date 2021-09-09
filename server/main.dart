import "dart:io";


Future main() async {
  final requests = await HttpServer.bind('localhost', 8888);
  await for (var request in requests) {
    processRequest(request);
  }
}

void processRequest(HttpRequest request) {
  print('Got request for ${request.uri.path}');
  final response = request.response;
  if (request.uri.path == '/dart') {

    response
      ..headers.contentType = ContentType(
        'text',
        'html',
      )
      ..write(File("./wasm.html").readAsStringSync());
  } else if (request.uri.path == "/wasm_exec.js") {
    response
      ..headers.set("Content-Type", "application/javascript");
      response..write(File("./wasm_exec.js").readAsStringSync());
  }else if (request.uri.path == "/main.wasm") {
    response..headers.set("Content-Type", "application/wasm");
    response..write(File("./main.wasm")..readAsBytesSync());
  }
  response.close();
}