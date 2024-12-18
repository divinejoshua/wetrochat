/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import HeaderComponent from "@/app/components/Header";
import SidebarComponent from "@/app/components/Sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { use } from "react";
import copy from 'clipboard-copy';


export default function CollectionPage({ params }: { params: Promise<{ collectionId: string }> }) {
  // HOOKS
  const router = useRouter()
  const { collectionId } = use(params);

  // DATA
  const [resourceList, setresourceList] = useState<any>([
    { id: 1, type: "link", name: "How to stay away from drugs - Wikipedia", icon: "🔗" },
    { id: 2, type: "link", name: "Maintaining a healthy lifestyle | Medium.com", icon: "🔗" },
    { id: 3, type: "video", name: "10 best ways to find new habits", icon: "▶️" },
    { id: 4, type: "pdf", name: "Connect with your mind.pdf", icon: "📄" },
  ])
const [isCopied, setisCopied] = useState<boolean>(false);

   //Methods

  // handle copy
    const handleCopy = async () =>{
        await copy("https://wetrocloud.com");
        setisCopied(true);
        setTimeout(() => setisCopied(false), 2000); // Reset the copied state after 2 seconds

    }

    // handle copy
    const viewChatPage = async () =>{
        window.open("/chat/1234", "_blank");
    }

  //Check for collection ID
  useEffect(() => {
    if(!collectionId){
        router.replace("/")
    }

    return () => {
    }
  }, [collectionId])
  return (
   <main className="mx-auto main-container">
  
        <div className="sidebar">
          <SidebarComponent/>
        </div>
      <div>
        B
        <HeaderComponent pageName="Collection"/>

          {/* Header Section */}
        <div className="main-collection-page px-10 mb-20">
          <Link href={"/home"} className="text-blue-500 mb-12">{`< Go Home`}</Link>
        <div className="flex flex-col mb-6">
          <h1 className="text-2xl font-bold mb-4">Staying away from addiction</h1>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              + Add resource
            </button>
            <button onClick={()=>viewChatPage()} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
              View chat
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100" onClick={handleCopy}>
             {isCopied ? ` Copied !! ` : `Copy chat link`}
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
              ✏️ Modify
            </button>
          </div>
        </div>

        {/* Resources Section */}
        <div>
          <h2 className="text-lg font-semibold mb-3">My resources</h2>
          <ul className="space-y-4">
            {resourceList.map((resource) => (
              <li
                key={resource.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{resource.icon}</span>
                  <span className="text-gray-700">{resource.name}</span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
        </div>


       </div>

    </main>
  )
}