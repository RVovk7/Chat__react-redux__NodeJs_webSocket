let express = require('express'),
  http = require('http'),
  path = require('path');

let app = express();
let server = http.createServer(app);
let WebSocketServer = require('ws').Server;
let wss = new WebSocketServer({
  server: server
});
let colors = ['red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange'];
colors.sort(function (a, b) {
  return Math.random() > 0.5;
});
let clients = [];

wss.on('connection', function (ws) {
  clients.push(Object.assign(ws,{userID: Date.now()}));
  let userName = false;
  let userColor = false;
  ws.on('message', function (msg) {
    if (!userName) {
      userName = msg;
      userColor = colors.shift();

      for (let i = 0; i < clients.length; i++) {
        clients[i].send(JSON.stringify({
          type: 'connect_new_user',
          userName,
          userID: ws.userID
        }));
      }
      console.log(userName + ' login');
    } else {
      console.log(userName + ' say: ' + msg);
      let obj = {
        time: (new Date()).getTime(),
        text: msg,
        author: userName,
        color: userColor
      };
      let json = JSON.stringify({
        type: 'message',
        data: obj
      });
      for (let i = 0; i < clients.length; i++) {
        clients[i].send(json);
      }
    }
  });
  ws.on('close', function () {
    let index = clients.indexOf(ws);
    clients.splice(index, 1);
    if (userName !== false && userColor != false) {
      colors.push(userColor);
    }
  });

});

app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
  app.use(express.errorHandler());
});

app.get('/', function (req, res) {
  res.sendfile('views/chat.html');
});

server.listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});