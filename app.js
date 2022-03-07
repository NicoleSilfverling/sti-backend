//app.js

const cors = require("cors")
const express = require("express")
const rug = require('random-username-generator');

const app = express()
const PORT = process.env.PORT || 3001

let users = [];

app.use('/healthcheck', require('./routes/healthcheck.routes'));
app.use(express.urlencoded({ extended: true}));
app.use(cors())

app.get("/", (req ,res)=>{
    headers={"http_status":200, "cache-control": "no-cache"}
    body={"status": "available"}
    res.status(200).send(body)
})

app.get("/highscores", (req ,res)=>{
      headers={"http_status":200, "cache-control":  "no-cache"}

      // sortera
      users.sort((a, b) => b.score - a.score);
      
      res.status(200).send(users)
})

app.get("/registerscore", (req ,res)=>{
      headers={"http_status":200, "cache-control":  "no-cache"}
      let user = req.query.user
      let score = req.query.score
      
      let data = {"user": user, "score": score}

      if(users.length <= 5){
            users.push(data);
      } else if(score > users[4].score){
            users.splice(4, 1);
            users.push(data);
      }
      
      res.status(200).send({"status":"success"})

})

app.get('/auth', (req, res) => {
      let user = rug.generate();
      users[user] = 0
      res.status(200).send({"user":user})
});


app.listen(PORT , ()=>{
    console.log(`STARTED LISTENING ON PORT ${PORT}`)
});