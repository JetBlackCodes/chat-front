const mongo = require("mongodb").MongoClient;
const client = require("socket.io").listen(4000).sockets;
const assert = require('assert');

mongo.connect("mongodb://127.0.0.1/iragram", function(err, mydb) {
  assert.equal(null, err);
  console.log("MongoDB connected with IraGram...");

  client.on("connection", function(socket) {
    const userInfo = mydb.db("userinfo");
    // let chat = db.collection("chats");

    socket.on("singIn", function(data) {
      const { login, password } = data;

      if (login !== "" && password !== "" ) {
        // userInfo.insert({ login: login, password: password });   
        mydb.runCommand(
          {
             insert: "userInfo",
             documents: [ { login: login, password: password } ]
          }
       )     
        console.log(
          userInfo
            .find()
            .limit(100)
            .toArray()
        );
      }
    });
  });
  mydb.close();
});
