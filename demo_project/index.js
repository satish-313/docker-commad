const express = require("express")
const path = require("path")
const fs = require("fs")
const MongoClient = require('mongodb').MongoClient
const { response } = require("express")

const app = express()
app.use(express.static(__dirname + '/'));
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname,"index.html"))
})

app.get('/get-profile', (req,res) => {
  MongoClient.connect('mongodb://admin:admin@localhost:27017', (err,client) => {
    if (err) throw err;

    let db = client.db('user-account');
    let query = { userid : 1}
    db.collection('users').findOne(query, function(err,result) {
      if (err) throw err
      client.close();
      res.send(result)
    })
  })
})

app.post('/update-profile', (req,res) => {
  let userObj = req.body
  console.log('connecting to db')

  MongoClient.connect('mongodb://admin:admin@localhost:27017', (err,client) => {
    if (err) throw err;

    let db = client.db('user-account');
    userObj['userid'] = 1
    let query = { userid : 1}
    let newValues = {$set:userObj}
    console.log("successfully connect to the user account")
    db.collection('users').updateOne(query,newValues,{upsert:true}, function(err,result) {
      if (err) throw err
      client.close();
      res.send(userObj)
    })
  })
})

app.get('/profile-picture', (req,res) => {
  let img = fs.readFileSync("test.jpg")
  res.writeHead(200,{'Content-Type': 'image/jpg'})
  res.end(img,'binary')
})

app.listen(5000,() => console.log("app is running on post : 5000"))

// docker pull mongo-express:1.0.0-alpha