'use client'
import React, {useState, useEffect} from 'react'
import io from 'socket.io-client'

const Chat = () => {

    const sendMsg = (e) => {
        e.preventDefault();
        console.log("Button pressed");
        if(socket) {
            console.log("Emitting message: " + msg);
            socket.emit('chat msg', msg);
            setMsgs(prevMsgs => [...prevMsgs, {text:msg, sentByCurrentUser: true}]);
            setMsg('');
        }
    }

    const [msg, setMsg] = useState('');
    const [socket, setSocket] = useState(null);
    const [msgs, setMsgs] = useState([]);

    useEffect(() => {
        const newsocket = io('http://localhost:8080');
        setSocket(newsocket);

        //Listen to incoming messages
        newsocket.on('chat msg', msg => {
            console.log("Message received on client " + msg);
            setMsgs(prevMsgs => [...prevMsgs, {text: msg, sentByCurrentUser: false}]);
        })


        return () => newsocket.close();
    }, []);

  return (
    <div>
        <div className='msgs-container'>
           {msgs.map((msg, index) => (
            //    <div key={index} className='msg text-right m-5'> old code
            <div key={index} className={`msg ${msg.sentByCurrentUser ? 'text-right' : 'text-left'} m-5`}>
                   {msg}
               </div>
           ))}
        </div>
        <form onSubmit={sendMsg} className="max-w-md mx-auto my-10">     
            <div className="relative">  
               <input type="text"
                       value={msg}
                       onChange={(e) => setMsg(e.target.value)}
                       placeholder="Type your text here"
                       required
                       className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
               <button type="submit"
                       className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                       Send
               </button>
           </div>

        </form>
    </div>
  )
}

export default Chat