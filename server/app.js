const express = require('express'),
  http = require('http'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost:3001/chatDB')
  .then(() => console.log('DB running on port 3001'))
  .catch((e) => {
    console.error(`DB fail: ${e}`)
  });
const app = express(),
  server = http.createServer(app),
  WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({
    server: server
  });
  /////mongoose schema
const regSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minlength: 3
  },
  email: String,
  pass: String
});

const userDB = mongoose.model('userDB', regSchema);
///////
let clients = [];
let clientsList = [];
let userID;
///////WebSocet
wss.on('connection', ws => {
  userID = Date.now()
  clients.push(Object.assign(ws, {
    userID
  }));
  console.log(`${clientsList.userName},CONNECT: ${ws.userID===userID}`)
  ws.on('message', msg => {
    const fromClient = JSON.parse(msg);

    switch (fromClient.type) {

      case 'userMSG':
        userName = fromClient.name;
          const sData = {
            userName,
            userID: ws.userID,
            avatar
          }; 
        ///send to all except current client
        for (let i = 0; i < clients.length - 1; i++) {
          clients[i].send(JSON.stringify({
            type: 'connect_new_user',
            userName,
            avatar,
            userID
          }));
        }
        console.log(userName + ' login');
        break;
      case 'textMSG':
        let obj = {
          time: (new Date()).getTime(),
          text: fromClient.text,
          author: fromClient.author,
          color: fromClient.color
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
    let json = JSON.stringify({
      type: 'disconnect_user',
      userID: ws.userID
    });
    console.log('wsClose',clientsList.userName)
    clientsList = clientsList.filter(u => u.userID !== ws.userID);
    for (let i = 0; i < clients.length; i++) {
      clients[i].send(json);
    }
  });
});
//////////
/////////authorization =>//
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});
app.use(bodyParser.json());
app.post('/api/reg', (req, res) => {
  userDB.findOne({
      login: req.body.login
    })
    .then(u => {
      if (u) {
        userDB.create(req.body);
        res.send(JSON.stringify({
          isReg: false
        }))
      } else {
        res.send(JSON.stringify({
          isReg: true
        }))
      }
    });
});

app.post('/api/auth', (req, res) => {
  userDB.findOne({
    login: req.body.userName,
      pass: req.body.pass
    })
    .then(u => {
      const avatar = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_0${Math.floor(Math.random() * 9)+1}.jpg`;
      if (u) {
        clientsList.push({
          userName: u.login,
          userID,
          avatar
        });
        res.send(JSON.stringify({
          isAuth: true,
          clientsList
        }));
      } else {
        res.send(JSON.stringify({
          isAuth: false,
          clientsList: false
        }));
      }
    })
    .catch(er => {
      console.error(er);
    })
});
//////////
/////////
server.listen(3000, () => {
  console.log("Express server listening on port " + 3000);
});