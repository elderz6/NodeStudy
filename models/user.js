const mongoose = require('mongoose');

//user schema
const UserSchema = mongoose.Schema(
  {
    nome:{type:String, required:true},
    email:{type:String, required:true},
    username:{type:String, required:true},
    password:{type:String, required:true},
    cpf:{type:String, required:true},
    data_nasc:{type:Date, required:true},
    sexo:{type:String, required:true},
  });

const User = module.exports = mongoose.model('User', UserSchema);
