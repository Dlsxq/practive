import 'dart:convert';
import 'dart:io';

void send(int i) async {
  var client = HttpClient();
  var req = await client.post("0.0.0.0", 4096, "/?id=$i");

  var payload = "client:$i";
  req.contentLength = payload.length;

  req.write(payload);

  var res = await req.close();

  String body = await res.transform(utf8.decoder).join();

  print(body);
  client.close();
}

void main(List<String> args) {
  // var list = [1, 2, 3, 4, 5];

  // list.forEach((element) {
  //   send(element);
  // });

  var i = -1;

  while ((i++) < 1000) {
    send(i);
  }

}
