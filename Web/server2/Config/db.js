const { default: mongoose } = require("mongoose");

exports.connectdb = async()=>{
    try {
        const connected = await mongoose.connect(process.env.MONGO_URL)
        if(connected){
            console.log("mongoDB is connected");
        }
    } catch (error) {
       console.log(error);
    }
}