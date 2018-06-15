const express = require('express'),
  http = require('http'),
  path = require('path'),
  mongoose = require('mongoose');
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


let clients = [];
let clientsList = [];
///////WebSocet
wss.on('connection', ws => {
  clients.push(Object.assign(ws, {
    userID: Date.now()
  }));
  ws.on('message', msg => {
    const fromClient = JSON.parse(msg);

    switch (fromClient.type) {

      case 'userMSG':
        userName = fromClient.name;
        const avatar = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_0${Math.floor(Math.random() * 9)+1}.jpg`;
        const sData = {
          userName,
          userID: ws.userID,
          avatar
        }
      
        //console.log( ...clients);
       
        ///send to current
     
  
      userDB.find({
        login: userName,
        pass : fromClient.pass
      })
      .then(u=>{
       
        if (u.length !==0 ){
          ws.send(JSON.stringify({
            type: 'isAuth',
            isAuth : '+'
          }));
          clientsList.push({
            userName,
            userID: ws.userID,
            avatar
          });
          ws.send(JSON.stringify({
            type: 'clientsList',
            data: clientsList
          }));
        }
        else{
          ws.send(JSON.stringify({
            type: 'isAuth',
            isAuth : '-'
          }));
        }
      })
      .catch(er => {
        console.error(er);
      })
     
    
    
   
        ///send to all except current client
        for (let i = 0; i < clients.length - 1; i++) {
          clients[i].send(JSON.stringify({
            type: 'connect_new_user',
            userName,
            avatar,
            userID: ws.userID,
          }));
        }
        console.log(userName + ' login');
        break;
      case 'textMSG':
        console.log(userName + ' say: ' + fromClient.text);
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
       case 'auth':
        delete fromClient.type;
        console.log('authFromClient', fromClient);
        const runDB = async () => {
        
           await  userDB.find({
                login: fromClient.login
              })
              .then(u => {

                if (u.length === 0) {
                  userDB.create(fromClient);
                  ws.send(JSON.stringify({
                    type: 'regStatus',
                    regStatus: "+"
                  }));

                } else {
                  ws.send(JSON.stringify({
                    type: 'regStatus',
                    regStatus: '-'
                  }));
                 
                }


              });

        
        }

        runDB();
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