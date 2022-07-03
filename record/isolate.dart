import 'dart:isolate';

Stream<int> s() async* {
  var i = 0;
  while (i++ < 20) {
    yield i;
  }
}

childProcess(SendPort p) async {
  await for (var i in s()) {
    print("child process $i");
    p.send(i);

    if (i == 19) {
      Isolate.exit();
    }
  }
}

void main() async {

  var p = ReceivePort();

   await Isolate.spawn(childProcess, p.sendPort);
  p.listen((i) {
    print("main message: $i");

    if (i == 18) {
      p.close();
      // io.kill();
    }
  });

  print("main end");
}
