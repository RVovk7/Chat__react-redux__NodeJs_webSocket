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
let clientsList = [];
wss.on('connection', ws => {
  clients.push(Object.assign(ws, {
    userID: Date.now()
  }));
  let userName = false;
  let userColor = false;

  ws.on('message', msg => {
    const fromClient = JSON.parse(msg);
    switch (fromClient.type) {
      case 'userMSG':
        userName = fromClient.name;
        userColor = colors.shift();

        clientsList.push({
          userName,
          userID: ws.userID,
          avatar: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg'
        });
        ///send to current
        ws.send(JSON.stringify({
          type: 'clientsList',
          data: clientsList
        }));
        ///send to all except current client
        for (let i = 0; i < clients.length - 1; i++) {
          clients[i].send(JSON.stringify({
            type: 'connect_new_user',
            userName,
            userID: ws.userID
          }));
        }
        console.log(userName + ' login');
        break;
      case 'textMSG':
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
        break;
    }
  });
  ws.on('close', () => {
    let index = clients.indexOf(ws);

    clients.splice(index, 1);
    if (userName !== false && userColor != false) {
      colors.push(userColor);
    }

    let json = JSON.stringify({
      type: 'disconnect_user',
      userID: ws.userID
    });
    clientsList = clientsList.filter(u => u.userID !== ws.userID);
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