import mongoose,{model} from "mongoose";

const Schema = mongoose.Schema;
const objectId = Schema.Types.ObjectId

const User = new Schema({
    username: { type: 'String' , required: true },
    password: { type: 'String' , required: true },
})

export const UserModel= model('Users',User)