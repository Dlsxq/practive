import 'dart:io';

import 'package:serve/serve.dart';

class User implements ReadBuilder, WriteBuilder {
  late String userName;
  late String password;
  late String desc;

  late String? userId;

  String? createTime = null;
  String? updateTime = null;

  @override
  fromJson(Map<String, dynamic> map) {
    this.userId = map["userId"];
    this.password = map["password"];
    this.userName = map["userName"];
    this.desc = map["desc"];

    var id = map["userId"];
    if (id != null) {
      this.userId = id;
    } else {
      this.userId = "iddddss";
    }
    if (this.createTime is! String) {
      this.createTime = "current";
    }
  }

  @override
  Map toJson() {
    Map map = Map();
    map["userId"] = this.userId;
    map["userName"] = this.userName;
    map["password"] = this.password;
    map["desc"] = this.desc;
    return map;
  }
}

main(List<String> args) {

  Router router = Router();
  StaticServe staticServe = StaticServe("/static");

  router
    ..get("/", (req, res) {
      res.text("foo");
    })
    ..post("/form", (reader, writer) async {
      var user = await reader.builder<User>(User());

      print([user.userName, "userName"]);
      writer.builder(user);
    })
    ..post("/form-file", (reader, writer) async {
      Map formData = await reader.formData();

      var files = formData["fff"];
      var fileName = "./" + files["fileName"];
      var fileBytes = (files["file"] as BytesBuilder).toBytes();

      await File(fileName).writeAsBytes(fileBytes);

      writer.json({"message": "success", "code": 200});
    });

  Serve()
    ..use(router)
    ..use(staticServe)
    ..listen(4096);
}
