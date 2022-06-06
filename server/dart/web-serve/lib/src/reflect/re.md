```dart


import 'dart:mirrors';

class Controller {
  final String dataController;
  const Controller(this.dataController);
}

class CatService {
  CatService();
  String request() {
    return "CatService 的request 实例方法";
  }
}

@Controller("dataController 的元数据")
class TestCalss {
  CatService catService;
  TestCalss(CatService this.catService);

  String arbff = "dsafadsf";

  void func(String msg) {
    print(this.catService.request());
    print(msg);
  }
}



void main(List<String> args) {


  print(Symbol("foo") == Symbol("foo"));

  // -------------

  ClassMirror mirror = reflectClass(TestCalss);

  // print([
  //   "reflectedType\t${mirror.reflectedType}",
  //   "simpleName:\t${mirror.simpleName}"
  // ]);

  // print("metadaat ----------start---\r\n");
// print(mirror.instanceMembers);

  mirror.metadata.forEach((metadata) {
    // print(metadata.reflectee.dataController);
  });

  // print("metadaat -------------\r\n");

  var mirrorArgs = [];

  mirror.declarations.forEach((key, dec) {
    if (dec is MethodMirror) {
      if (!dec.isConstructor) {
        return;
      }

      ParameterMirror argv = dec.parameters[0];
      // print([
      //   "参数",
      //   argv.hasDefaultValue ? "存在默认参数" : "不存在默认参数",
      //   argv.type,
      //   " argv.simpleName\t${argv.simpleName}",
      //   argv.qualifiedName,
      // ]);

      final argvType = argv.type;

      if (argvType is ClassMirror) {
        ClassMirror superClass = argvType;

        var instce = superClass.newInstance(Symbol.empty, []);
        mirrorArgs.add(instce.reflectee);
      }

      // argv.

      // print([
      //   "函数:",
      //   dec.constructorName,
      //  ,
      //   dec.parameters,
      //   dec.returnType,
      //   dec.source
      // ]);
      return;
    }

    // print(["mirror.declarations\t\t", key, value, value.qualifiedName, value.simpleName, value]);
  });

  InstanceMirror instMirror = mirror.newInstance(Symbol.empty, mirrorArgs);

  /// 类的实例
// TestCalss t = instMirror.reflectee;

// 执行实例的方法， 如果是父类，执行的是静态方法
  instMirror.invoke(Symbol("func"), ["sdf"]);

// t.func("msg");
  // -------------
}



// import 'dart:convert';
// import 'dart:io';

// wrap(Function() cb, Process res) {
//   Future<void> promise = Future(() async {
//     await for (var i in stdin) {
//       print("杀死进程");
//       res.kill();
//       return;
//     }
//   });
//   return promise;
// }

// void main(List<String> args) async {
//   var res = await Process.start("dart", ["./bin/serve.dart"]);
//   res.stdout.pipe(stdout);

//   wrap(() => null, res);
// }


```