import mongoose from "mongoose";

const msgSchema = mongoose.Schema({
    text:{
        type: String,
        require: true
    },
    sender: {
        type: String,
        require: true
    },
    receiver: {
        type: String,
        require: true
    }
})

const conversationSchema = mongoose.Schema({
    users : [{
        type: String,
        require: true
    }],
    msgs : [msgSchema]
})

const conversation = mongoose.model('Conversation', conversationSchema);

export default conversation;