import mongoose,{model} from "mongoose";

const Schema = mongoose.Schema;
const objectId = Schema.Types.ObjectId

const User = new Schema({
    username: { type: 'String' , required: true,unique: true},
    password: { type: 'String' , required: true },
})

export const UserModel= model('Users',User)

const Content = new Schema({
    link: { type: 'String'  },
    title: { type: 'String' },
    type: { type: 'String' },
    tags: [{type:objectId, ref:'Tag'}],
    user: { type: objectId, ref: 'Users', required: true ,unique: true},
})

export const ContentModel = model('Content',Content)


const Shareable = new Schema({
    hash : { type: 'String' },
    user: { type: objectId, ref: 'Users', required: true,unique: true },
})
export const ShareableModel = model('Shareable',Shareable)