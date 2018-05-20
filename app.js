//requires----------------------------------------------------------
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const flash = require('connect-flash');
var port = 3000;
//connect to mongo-------------------------------------------------------------
mongoose.connect('mongodb://localhost/notuber');
let db = mongoose.connection;
//test connection -------------------------------------------------------------
db.once('open', function()
{
  console.log('conectado ao banco');
});
//db error----------------------------------------------------------------------
db.on('error', function(err)
{
    console.log(err);
});
//init app---------------------------------------------------------------------
const app = express();
//load model
let Corrida = require('./models/corrida');
//load pug----------------------------------------------------------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')
//bodyParser------------------------------------------------------------------
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//public folder----------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
//Middleware----------------------
//express session
app.use(session({
  secret:'beiruta1',
  resave:true,
  saveUninitialized:true,
  cookie:{secure:true}
}));
//home route------------------------------------------------------------------
app.get('/', function(req, res)
{
      res.render("index",
      {
          title:'Not Uber',
      });
  });
//routes---------------------------------------------------------------
let corridas = require('./routes/corridas');
let users = require('./routes/users');
app.use('/corridas', corridas);
app.use('/users', users);
app.get('/historico', function(req, res)
{
  Corrida.find({}, function(err, corridas)
  {
    if (err)
    {
        console.log(err);
    }
    else
    {
      res.render("historico",
      {
          title:'Not Uber',
          corridas: corridas
      });
    }
  });
});
//start server-----------------------------------------------------------------
app.listen(port, function()
{
    console.log("started on port "+port);
});
