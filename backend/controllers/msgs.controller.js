import Conversation from "../models/chat.model.js";

export const addMsgToConversation = async (participants, msg) =>{
    try{
        console.log("Adding message to conversation between: ", participants);

        let conv = await Conversation.findOne({users: { $all: participants }});
        
        console.log("Conversation found: ", conv);

        if(!conv){
            conv = await Conversation.create({users: participants});
        }
        conv.msgs.push(msg);
        await conv.save();
        //return res.Status(200).json(conv);
    }catch(error){
        console.log("Error adding message to conversation: ", error);
    }
};

// Get messages for a conversation identified by participants
const getMsgsForConversation = async (req, res) => {
   try {
       const { sender, receiver } = req.query;
       console.log(sender + receiver);
       const participants = [sender, receiver];
       // Find conversation by participants
       const conversation = await Conversation.findOne({ users: { $all: participants } });
       if (!conversation) {
           console.log('Conversation not found');
           return res.status(200).send();
       }
       return res.json(conversation.msgs);




   } catch (error) {
       console.log('Error fetching messages:', error);
       res.status(500).json({ error: 'Server error' });
   }
};
export default getMsgsForConversation;