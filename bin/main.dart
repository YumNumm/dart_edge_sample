import 'dart:js_interop';

// JSResponseを使いたいので cf_workers を入れています．
import 'package:cf_workers/src/http.dart';

@JS()
external JSPromise<JSResponse> fetch(JSString url);

// Dartの結果をresultを通して渡しています
@JS('__js.result')
external void result(JSResponse response);

void main(List<String> arguments) async {
  final JSResponse resp =
      await fetch('https://httpbin.org/anything'.toJS).toDart;
  print(resp);
  result(resp);
}
