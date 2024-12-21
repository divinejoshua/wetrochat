'use client'
import { getCollectionIdFromFirebase } from "@/app/actions";
import { ChatInput } from "@/app/components/ChatInput";
import { ChatMessages } from "@/app/components/ChatMessages";
import { queryCollection } from "@/lib/utils/fetchData";
import React, { useState } from "react";
import {useImmer} from "use-immer";

// TODO: Create an interface file for the Message interface
interface Message {
  role: 'user' | 'assistant';
  content: string;
  loading: boolean;
  error: boolean;
}

export default function ChatPage() {
  const [collectionId, setCollectionId] = useState<string|null>(null)
  const [messages, setMessages] = useImmer<Message[]>([]) // This solves the issue of mutating state directly instead of duplicating the state
  const [newMessage, setNewMessage] = useState('')

  // Check if the last message is loading
  const isLoading = messages.length && messages[messages.length - 1].loading;

  async function submitNewMessage() {
    // get the trimmed message
    const trimmedMessage = newMessage.trim();
    // if the message is empty or the message is loading, do nothing
    if (!trimmedMessage || isLoading) return;
    // add the user message to the messages array
    setMessages(draft => [...draft,
      { role: 'user', content: trimmedMessage },
      { role: 'assistant', content: '', loading: true }
    ]);
    setNewMessage('');
    try {
      // Get the collection id from the database
      const newCollectionId = await getCollectionIdFromFirebase()
      // store the collection id in the state
      setCollectionId(newCollectionId)
      // query the collection
      const response = await queryCollection(newCollectionId,trimmedMessage)
      // add the response to the messages by mutating the state directly through use Immer
      setMessages(draft => {
        let lastMessage = draft[draft.length - 1]
        lastMessage.content += response.response
        lastMessage.loading = false
      });
    } catch (err) {
      console.log(err);
      // set the loading to false
      setMessages(draft => {
        let lastMessage = draft[draft.length - 1]
        lastMessage.loading = false;
        // set the error to true
        lastMessage.error = true;
      });
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6 font-sans">
      {/* Header */}
      {/* TODO: Retrieve the chat title from the database */}
      <header className="w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-gray-800">Staying away from addiction</h1>
      </header>

      {/* Q&A Section */}
      <ChatMessages messages={messages} />
      {/* Input Box Placeholder */}
      <ChatInput newMessage={newMessage} isLoading={isLoading} setNewMessage={setNewMessage} submitNewMessage={submitNewMessage} />
      <p className="text-sm text-gray-300 mt-2">Powered by <a href="https://wetrocloud.com" target="_blank" className="text-sm text-gray-300 mt-2 underline">Wetrochat</a></p>
    </div>
  );
}
