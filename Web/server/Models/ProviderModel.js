const { default: mongoose } = require("mongoose");

const ProviderSchema = mongoose.Schema({
    username:{
      type:String,
      required:true
    },

    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    ProfilePicture:{
        type:String
    },

},{timestamps:true})

const Provider = mongoose.model("Provider",ProviderSchema)
module.exports = Provider