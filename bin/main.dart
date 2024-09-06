import 'dart:js_interop';

@JS()
external void responseMessage(JSString message);

void main(List<String> arguments) {
  final message = 'Hello, Dart!';
  responseMessage(message.toJS);
}
