import 'dart:js_interop';

import 'package:cf_workers/cf_workers.dart';
import 'package:cf_workers/http.dart';
import 'package:http/http.dart';

void main(List<String> arguments) async {
  return Workers((request) async {
    final req = await request.toDart;
    print(req.url);
    print(req.toString());

    final jsRes =
        await http("https://httpbin.org/anything", "GET", null, null).toDart;
    final res = await jsRes.toDart;
    print("----- HTTP RESPONSE (handled by Dart Worker) -----");
    print(res.body);
    print(res.statusCode);
    print(res.headers);
    return Response.bytes(
      res.bodyBytes,
      res.statusCode,
      headers: res.headers,
    ).toJS;
  }).serve();
}

@JS('__dart_cf_workers.http')
external JSPromise<JSResponse> http(
  String url,
  String method, [
  JSBoxedDartObject? headers,
  String? body,
]);
