const AuthModel = require("../Model/AuthDataModel");


exports. AddAuthData = async(req,res)=>{
    try {
        const authdata = new AuthModel(req.body)
        await authdata.save()
        res.send(authdata)
    } catch (error) {
        console.log(error);
    }
}

exports. GetAuthData = async(req,res)=>{
    try {
        const {id} = req.query
        const authdata = await AuthModel.findById(id)
        res.send(authdata)
    } catch (error) {
        console.log(error);
    }
}

exports. DeleteAuthData = async(req,res)=>{
    try {
        const {id} = req.query
        const deletedata = await AuthModel.findByIdAndDelete(id)
        res.send(deletedata)
    } catch (error) {
        console.log(error);
    }
}