const morgan = require("morgan");
const express = require('express');
const layout = require('./views/layout');
const { db, Page, User } = require('./models');

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.send(layout(''));
  })

app.use("/", require("./views/layout"));
const wikiRouter = require('./routes/wiki');
const usersRouter = require('./routes/users');
app.use(wikiRouter);
app.use(usersRouter);

db.authenticate()
  .then(()=> {
    console.log('connected to the database')
  })

const PORT = 3000;

const init = async() => {
    await db.sync({force: true});
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}!`)
    })
} 

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});