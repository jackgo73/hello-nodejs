// // // // // // // // // var events = require('events');
// // // // // // // // // var eventEmitter = new events.EventEmitter();
// // // // // // // // // var connectHandler = function connected() {
// // // // // // // // //     console.log('连接成功。');
// // // // // // // // //
// // // // // // // // //     eventEmitter.emit('data_received');
// // // // // // // // // }
// // // // // // // // // eventEmitter.on('connection', connectHandler);
// // // // // // // // // eventEmitter.on('data_received', function () {
// // // // // // // // //     console.log('数据接收成功。');
// // // // // // // // // });
// // // // // // // // // eventEmitter.emit('connection');
// // // // // // // // // console.log("程序执行完毕。");
// // // // // // // //
// // // // // // // // var EventEmitter = require('events').EventEmitter;
// // // // // // // // var event = new EventEmitter();
// // // // // // // // event.on('some_event', function() {
// // // // // // // //     console.log('some_event 事件触发');
// // // // // // // // });
// // // // // // // // setTimeout(function() {
// // // // // // // //     event.emit('some_event');
// // // // // // // // }, 1000);
// // // // // // //
// // // // // // // var events = require('events');
// // // // // // // var emitter = new events.EventEmitter();
// // // // // // // emitter.on('someEvent', function(arg1, arg2) {
// // // // // // //     console.log('listener1', arg1, arg2);
// // // // // // // })
// // // // // // // emitter.on('someEvent', function(arg1, arg2) {
// // // // // // //     console.log('listener2', arg1, arg2);
// // // // // // // });
// // // // // // // emitter.emit('someEvent', 'arg1 参数', 'arg2 参数');
// // // // // //
// // // // // // var events = require('events');
// // // // // // var emitter = new events.EventEmitter();
// // // // // // emitter.once('someEvent', function(arg1, arg2) {
// // // // // //     console.log('listener1', arg1, arg2);
// // // // // // })
// // // // // //
// // // // // // emitter.emit('someEvent', 'arg1 参数', 'arg2 参数');
// // // // // // emitter.emit('someEvent', 'arg1 参数', 'arg2 参数');
// // // // //
// // // // // var events = require('events');
// // // // // var eventEmitter = new events.EventEmitter();
// // // // // var listener1 = function listener1() {
// // // // //     console.log('监听器 listener1 执行。');
// // // // // }
// // // // // var listener2 = function listener2() {
// // // // //     console.log('监听器 listener2 执行。');
// // // // // }
// // // // // eventEmitter.addListener('connection', listener1);
// // // // // eventEmitter.on('connection', listener2);
// // // // // var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
// // // // // console.log(eventListeners + " 个监听器监听连接事件。");
// // // // // eventEmitter.emit('connection');
// // // // // eventEmitter.removeListener('connection', listener1);
// // // // // console.log("listener1 不再受监听。");
// // // // // eventEmitter.emit('connection');
// // // // // eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
// // // // // console.log(eventListeners + " 个监听器监听连接事件。");
// // // // // console.log("程序执行完毕。");
// // // // var events = require('events');
// // // // var emitter = new events.EventEmitter();
// // // // emitter.on('error', function(arg1, arg2) {
// // // //     console.log('listener2', arg1, arg2);
// // // // });
// // // // emitter.emit('error');
// // // buf = new Buffer(26);
// // // for (var i = 0 ; i < 26 ; i++) {
// // //     buf[i] = i + 97;
// // // }
// // // console.log( buf.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
// // // console.log( buf.toString('ascii',0,5));   // 输出: abcde
// // // console.log( buf.toString('utf8',0,5));    // 输出: abcde
// // // console.log( buf.toString(undefined,0,5)); // 使用 'utf8' 编码, 并输出: abcde
// //
// // var buffer1 = new Buffer('菜鸟教程 ');
// // var buffer2 = new Buffer('www.runoob.com');
// // var buffer3 = Buffer.concat([buffer1,buffer2]);
// // console.log("buffer3 内容: " + buffer3.toString());
//
// var buffer1 = new Buffer('ABC');
// var buffer2 = new Buffer('ABCD');
// var result = buffer1.compare(buffer2);
//
// if(result < 0) {
//     console.log(buffer1 + " 在 " + buffer2 + "之前");
// }else if(result == 0){
//     console.log(buffer1 + " 与 " + buffer2 + "相同");
// }else {
//     console.log(buffer1 + " 在 " + buffer2 + "之后");
// }

var buffer1 = new Buffer('ABC');
// 拷贝一个缓冲区
var buffer2 = new Buffer(3);
buffer1.copy(buffer2);
console.log("buffer2 content: " + buffer2.toString());