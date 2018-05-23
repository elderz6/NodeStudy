const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const{matchedData, sanitize} = require('express-validator/filter');
//db models
let User = require('../models/user');
let Motorista = require('../models/motorista');

//cadastro---------------------------------
router.get('/register', function(req, res)
{
  res.render('register');
});
//cadastro dos motoristas---------------------------------
router.get('/motorista', function(req, res)
{
  res.render('motorista');
});
//subir motorista no banco---------------------------------
router.post('/motorista',[check('nome').isLength({min:1}).trim().withMessage('Preencha o nome')], function(req, res)
{
  let motorista = new Motorista();
  motorista.status = req.body.status;
  motorista.nome = req.body.nome;
  motorista.email = req.body.email;
  motorista.username = req.body.usuario;
  motorista.password = req.body.senha;
  motorista.mod_carro = req.body.mod_carro;
  motorista.cpf = req.body.cpf;
  motorista.data_nasc = req.body.data_nasc;
  motorista.sexo = req.body.sexo;

  const errors = validationResult(req);
  if (!errors.isEmpty())
  {
      console.log(errors);
      req.flash('danger', 'Ocorreu um erro');
      res.render('motorista',
      {
        errors:errors.mapped()
      });

  }
  else
  {
    motorista.save(function(err)
    {
      if (err)
      {
        console.log(err);
        return;
      }
      else
      {
        req.flash('success', 'Cadastrado');
        res.redirect('/');
      }
  });
}
});
//registrar usuario no banco---------------------------------
router.post('/register', function(req, res)
{
  let user = new User();
  user.nome = req.body.nome;
  user.email = req.body.email;
  user.password = req.body.senha;
  user.username = req.body.usuario;
  user.cpf = req.body.cpf;
  user.data_nasc = req.body.data_nasc;
  user.sexo = req.body.sexo;
  user.tipo = req.body.tipo;
  user.save(function(err)
  {
    if (err)
    {
      console.log(err);
      return;
    }else {
      res.redirect('/');
    }
  });
});

module.exports = router;
