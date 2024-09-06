import 'dart:js_interop';

import 'package:http/http.dart' as http;

@JS()
external void responseMessage(JSString message);

void main(List<String> arguments) async {
  // 普通にHTTP Packageでできる...?
  // ref: https://github.com/vasilev/HTTP-request-from-inside-WASM?tab=readme-ov-file#dart
  final resp = await http.get(Uri.parse('https://httpbin.org/anything'));
  print(resp.body);

  responseMessage(resp.body.toJS);
}
