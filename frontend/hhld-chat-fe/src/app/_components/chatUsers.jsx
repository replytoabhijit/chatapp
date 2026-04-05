import React, { useEffect} from 'react'
import { useUserStore } from '../zustand/useUserStore.js'
import { useChatReceiverStore } from '../zustand/useChatReceiverStore.js';
import { useChatMsgsStore } from '../zustand/useChatMsgsStore.js';
import axios from 'axios';


const ChatUsers = () => {
    const {users} = useUserStore();
    const { chatReceiver, updateChatReceiver} = useChatReceiverStore();

    const setChatReceiver = (user) => {
        updateChatReceiver(user.username);
        console.log("Chat receiver set to: " + user.username);
    }

  return (
    <div>
        {users.map((user, index) => (
            <div key={index} onClick={() =>setChatReceiver(user)}
            className='bg-blue-300 rounded-xl m-1 p-3'>
                {user.username}
            </div>
        ))}
            
    </div>
  )
}

export default ChatUsers