import 'dart:convert';
import "dart:io";
import 'package:serve/serve.dart';

void main(List<String> args) {
  var router = Router();

  var server = Serve();

  File listRecordFile = File("./record-content.json");
  if (!listRecordFile.existsSync()) {
    listRecordFile.createSync();
    listRecordFile.writeAsStringSync("{}");
  }

  router.get("/", (reader, writer) {
    writer.html(File("./template.html").readAsStringSync());
  });

  router.get("/a", (reader, writer) {
    print(reader.query.toString());
    writer.text("ok");
  });

  router.post("/save-record", (reader, writer) async {
    var posts = await reader.formData();

    var content = posts["content"];
    var name = posts["date"];

    var filename = "./" + name;

    var file = File(filename);

    if (!file.existsSync()) {
      file.createSync();
    }

    await file.writeAsString(content);

    Map recordMap = jsonDecode(await listRecordFile.readAsString());

    recordMap[name] = filename;
    await listRecordFile.writeAsString(jsonEncode(recordMap));

    writer.json(<String, dynamic>{"ok": true, "code": 200});
  });

  router.get("/templ", ((reader, writer) {
    writer.html(File("./temp2.html").readAsStringSync());
  }));

  router.get("/record-list", (reader, writer) async {
    // Map recordMap = jsonDecode(await listRecordFile.readAsString());
    writer.writeStream(listRecordFile.openRead());
  });

  router.post("/detail", (reader, writer) async {
    var form = await reader.form();

    var i = form["index"];

    print("start ${i}");

    await Future.delayed(const Duration(seconds: 2));

    writer.json(<String, dynamic>{"ok": true, "code": 200, "index": i});

    print("end");
  });

  server
    ..use(router)
    ..listen(4096);
}
