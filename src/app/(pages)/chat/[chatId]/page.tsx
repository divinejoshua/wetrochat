'use client'
import { getApiKey, getCollectionById, getCollectionIdFromFirebase } from "@/app/actions";
import { ChatInput } from "@/app/components/ChatInput";
import { ChatMessages } from "@/app/components/ChatMessages";
import { queryCollection } from "@/lib/utils/fetchData";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import {useImmer} from "use-immer";

// TODO: Create an interface file for the Message interface
interface Message {
  role: 'user' | 'assistant';
  content: string;
  loading: boolean;
  error: boolean;
}

export default function ChatPage({ params }: { params: Promise<{ chatId: string }> }) {
  // Hooks
  const router = useRouter()
  const { chatId } = use(params);

  // const [collectionId, setCollectionId] = useState<string|null>(null)
  const [messages, setMessages] = useImmer<Message[]>([]) // This solves the issue of mutating state directly instead of duplicating the state
  const [newMessage, setNewMessage] = useState('')
  const [collectionDetails, setcollectionDetails] = useState<any>({})
  const [collectionName, setcollectionName] = useState<string>("Loading...")


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
      let apiKey = await setAxiosApiKey();
      if (!apiKey) {
        throw new Error('API key not found');
      }
      // query the collection
      const response = await queryCollection(chatId,trimmedMessage, messages, apiKey)
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


  // Get API key from Firebase and set in Axios headers
  const setAxiosApiKey = async () => {
    try {
        let apiKey = await getApiKey(collectionDetails.user_id);
        return apiKey

    } catch (error) {
      console.error('Error setting API key:', error);
    }
  };

  const getCollection = async () => {
    let collectionInfo = await getCollectionById(chatId)
    setcollectionDetails(collectionInfo)
    setcollectionName(collectionDetails.collection_name)

  }

  useEffect(() => {
    if(!chatId){
        router.replace("/")
    }

    getCollection()

    return () => {
    }
  },[])
  return (
    <div className="min-h-screen flex flex-col items-center p-6 font-sans">
      {/* Header */}
      {/* TODO: Retrieve the chat title from the database */}
      <header className="w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-gray-800">{collectionName}</h1>
      </header>

      {/* Q&A Section */}
      <ChatMessages messages={messages} />
      {/* Input Box Placeholder */}
      <ChatInput newMessage={newMessage} isLoading={isLoading} setNewMessage={setNewMessage} submitNewMessage={submitNewMessage} />
      <p className="text-sm text-gray-300 mt-2">Powered by <a href="https://wetrocloud.com" target="_blank" className="text-sm text-gray-300 mt-2 underline">Wetrochat</a></p>
    </div>
  );
}
