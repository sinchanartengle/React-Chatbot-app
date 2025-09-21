import { useState } from 'react'
import { Chatbot } from 'supersimpledev';
import './ChatInput.css';


 export function ChatInput({ chatMessages, setChatMessages }) {
   const [inputText, setInputText] = useState('');
 
   function saveInputText(event) {
     setInputText(event.target.value);
   }
 
   function sendMessages() {
     const newChatMessages = [
       ...chatMessages,
       {
         message: inputText,
         sender: 'user',
         id: crypto.randomUUID()
       }
     ];
     const response = Chatbot.getResponse(inputText);
     setChatMessages([
       ...newChatMessages,
       {
         message: response,
         sender: 'robot',
         id: crypto.randomUUID()
       }
     ]);
     setInputText('');
   }
 
   function handleKeyDown(event) {
     if (event.key === 'Enter') {
       sendMessages();
     } else if (event.key === 'Escape') {
       setInputText('');
     }
   }
 
   return (
     <div className="chat-input-container">
       <input
         placeholder="Send a message to a Chatbot"
         size="30"
         onChange={saveInputText}
         onKeyDown={handleKeyDown}
         value={inputText}
         className="chat-input"
       />
       <button
         onClick={sendMessages}
         className="send-button"
       >Send</button>
     </div>
   );
 }