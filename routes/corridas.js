const express = require('express');
const router = express.Router();
//db model
let Corrida = require('../models/corrida');
//routes-------------------------------------------------------------
router.get('/add', function(req, res)
{
  res.render('add_corrida',
  {
    title:'Nova Corrida'
  });
});


router.get('/:id', function(req, res)
{
  Corrida.findById(req.params.id, function(err, corrida)
  {
    res.render('corrida',
    {
      corrida:corrida
    });
  });
});
//corrida POST-----------------------------------------------------------------
router.post('/add', function(req, res)
{
  let corrida = new Corrida();
  corrida.status = 1;
  corrida.passageiro = req.body.passageiro;
  corrida.motorista = req.body.motorista;
  corrida.valor = Number(req.body.valor);
  corrida.save(function(err)
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
