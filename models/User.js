import mongoose from "mongoose";

/*user schema*/
const UserSchema = new mongoose.Schema({
     name:{
        type: String,
        required: true,
        min: 2
     },
     email: {
        type: String,
        required: true,
        max: 50,
        unique: true
     },
     password: {
        type: String,
        required: true
     }
}, {timestamps: true})

const User = mongoose.model("User", UserSchema);
export default User;