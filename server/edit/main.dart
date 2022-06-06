import 'dart:io';
import 'dart:async';

Future<String?> readTemplate(String path) async {
  File readFile = File(path);

  if (!readFile.existsSync()) {
    return null;
  }

  var byte = await readFile.readAsString();
  return byte;
}

String buildFullPath(path) {
  return "./static/" + path;
}

// document.designMode = "on";
sendFile(HttpResponse res, String path, String fullPath) async {
  String? temp = await readTemplate(buildFullPath(path));

  if (temp == null) {
    temp = await readTemplate(buildFullPath("404.html"));
    temp = temp!.replaceFirst(RegExp(r"\[inputUrl\]"), fullPath);
  }

  var ext = path.split(".").last;

  var val;

  switch (ext) {
    case "js":
      val = ContentType("application", "javascript");
      break;
    case "css":
      val = ContentType("text", "css");
      break;
    case "html":
      val = ContentType.html;
      break;
    default:
      val = ContentType.html;
      break;
  }


  res
    ..headers.contentType = val
    ..write(temp)
    ..close();
}

handlerFetch(HttpRequest req, HttpResponse res) {}

void main(List<String> args) async {
  HttpServer server = await HttpServer.bind("127.0.0.1", 7096);

  print("server start! runing is 7096 port");

  await for (HttpRequest req in server) {
    String url = req.uri.path;
    String method = req.method;

    print("client fetch: path[$url] method[${method}]");

    if (url.startsWith("/file")) {
      // render temp
      Map query = req.uri.queryParameters;

      var fileName = query["filename"];

      if (fileName == null) {
        handlerFetch(req, req.response);
        continue;
      }

      sendFile(req.response, fileName, req.uri.toString());
      continue;
    } else {
      // interface
    }

    req.response
      ..write("end")
      ..close();
  }
}

class $ {}
