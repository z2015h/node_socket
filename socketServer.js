var app = require('./app');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var sessionTable = {};
server.listen(3000);
io.sockets.on('connection', function (socket) {
  socket.on('regist', function(data, fn) {
    if (data) {
      sessionTable[data.Id] = socket;
    }
    try {
      fn('成功');
    } catch {
      console.log('没有回调');
    }
  });
  socket.on('c:send', function (data, fn) {
    if (sessionTable[data.targetId]) {
      serverEmit(sessionTable[data.targetId], data);
    } else {
      fn('当前用户未在线');
    }
  });
  socket.on('invite', function(fn) {
    try {
      fn(Object.getOwnPropertyNames(sessionTable));
    } catch {
      console.error('没有回调');
    } 	
  });
});

function serverEmit(socket, data) {
	socket.emit('s:send', data);
}