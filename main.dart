import "dart:io";
import 'package:serve/serve.dart';

void main(List<String> args) {
  var router = Router();

  var server = Serve();

  router.get("/", (reader, writer) {
    writer.html(File("./ttt.html").readAsStringSync());
  });

  router.get("/js", (reader, writer) {

    var i = reader.query["index"];


    writer.headers.contentType = ContentType("text", "javascript");

    writer.write("""

    globalRecord = {foo: ${i}};
  
""");
  });

  server
    ..use(router)
    ..listen(4096);
}
