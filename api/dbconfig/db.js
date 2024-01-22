const mongoose = require("mongoose");
const colors =  require('colors')

const mongoose_url ="mongodb+srv://guptaniket962:Aniket8291@cluster0.p3uadry.mongodb.net/";

const connectDB = async ()=>{
    try {
        await mongoose
          .connect(mongoose_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
          .then(() =>
            console.log("database connection success!".bgGreen.white)
          );
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = connectDB