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
colors.sort((a, b) => Math.random() > 0.5);
let clients = [];

wss.on('connection', ws => {
  clients.push(Object.assign(ws, {
    userID: Date.now()
  }));
  let userName = false;
  let userColor = false;
  ws.on('message', msg => {
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
  ws.on('close', () => {
    let index = clients.indexOf(ws);
    console.log(ws.userID);
    clients.splice(index, 1);
    if (userName !== false && userColor != false) {
      colors.push(userColor);
    }
    let json = JSON.stringify({
      type: 'disconnect_user',
      userID: ws.userID
    });
    for (let i = 0; i < clients.length; i++) {
      clients[i].send(json);
    }
  });

});

app.configure(() => {
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

app.get('/', (req, res) => {
  res.sendfile('views/chat.html');
});

server.listen(app.get('port'), () => {
  console.log("Express server listening on port " + app.get('port'));
});