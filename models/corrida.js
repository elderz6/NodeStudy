let mongoose = require('mongoose');
let Float = require('mongoose-float').loadType(mongoose);

//schema
let corridaSchema = mongoose.Schema({
  status:{type:String, required:true},
  passageiro:{type:String, required:true},
  motorista:{type:String, required:true},
  valor:{type:Float, required:true}
});

let Corrida = module.exports = mongoose.model('Corrida', corridaSchema);
