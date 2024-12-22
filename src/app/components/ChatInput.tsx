import React from 'react'

export interface IChatInputProps {
    newMessage: string;
    isLoading: boolean|number;
    setNewMessage: React.Dispatch<React.SetStateAction<string>>;
    submitNewMessage: () => void;
}

export function ChatInput({newMessage,isLoading,setNewMessage,submitNewMessage}:IChatInputProps) {
    function handleKeyDown(e:React.KeyboardEvent<HTMLInputElement>) {
        if(e.key === 'Enter' && !e.shiftKey && !isLoading) {
          e.preventDefault();
          submitNewMessage();
        }
      }
    return (
        <div className="w-full max-w-3xl mt-6 p-6 bg-gray-50 fixed bottom-0 left-0 right-0 mx-auto">
        <div className="flex items-center border rounded-lg px-4 py-2 bg-white shadow">
          <input
            type="text"
            autoFocus={true}
            placeholder="Ask any question"
            className="flex-grow outline-none p-2"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <button onClick={submitNewMessage} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            ➡
          </button>
        </div>
        </div>
    )
}