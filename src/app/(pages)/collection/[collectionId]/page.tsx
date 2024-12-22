/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import HeaderComponent from "@/app/components/Header";
import SidebarComponent from "@/app/components/Sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { use } from "react";
import copy from 'clipboard-copy';
import AddCollectionModal from "@/app/components/AddCollectionModal";
import { createPortal } from "react-dom";
import RemoveResourceModal from "@/app/components/RemoveResourceModal";
import AddResourceModal from "@/app/components/AddResourceModal";
import DeleteCollectionModal from "@/app/components/DeleteCollectionModal";
import { editCollectionName, getCollectionById } from "@/app/actions";


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
  const [isAddCollectionModal, setisAddCollectionModal] = useState<boolean>(false)
  const [isRemoveResourceModal, setisRemoveResourceModal] = useState<boolean>(false)
  const [isAddResourceModal, setisAddResourceModal] = useState<boolean>(false)
  const [collectionName, setcollectionName] = useState<string>("Loading...")
  const [isDeleteCollectioneModal, setisDeleteCollectioneModal] = useState<boolean>(false)
  const [activeResource, setactiveResource] = useState<any>({})

   //Methods

  // handle copy
    const handleCopy = async () =>{
        const currentDomain = window.location.origin;
        await copy(`${currentDomain}/chat/${collectionId}`);
        setisCopied(true);
        setTimeout(() => setisCopied(false), 2000); // Reset the copied state after 2 seconds

    }

    // handle remove resource
    const handleRemoveResource = (id : any) => {
      
      setresourceList(resourceList.filter(resource => resource.id !== id));
      setactiveResource({});
      setisRemoveResourceModal(false);
    }


    // handle copy
    const viewChatPage = async () =>{
        window.open(`/chat/${collectionId}`, "_blank");
    }

    const getCollection = async () => {
      let collectionDetails = await getCollectionById(collectionId)
      setcollectionName(collectionDetails.collection_name)
    }
    
  //Check for collection ID
  useEffect(() => {
    if(!collectionId){
        router.replace("/")
    }

    getCollection()


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
          <h1 className="text-2xl font-bold mb-4">{collectionName}</h1>
          <div className="flex gap-4">
            <button onClick={()=>setisAddResourceModal(true)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              + Add resource
            </button>
            <button onClick={()=>viewChatPage()} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
              View chat
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100" onClick={handleCopy}>
             {isCopied ? ` Copied !! ` : `Copy chat link`}
            </button>
            <button onClick={()=>setisAddCollectionModal(true)} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
              ✏️ Modify
            </button>
            <button onClick={() => setisDeleteCollectioneModal(true)} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
              🗑️ Delete collection
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
                <button onClick={()=> {
                  setactiveResource({id : resource.id, resourceName : resource.name})
                  setisRemoveResourceModal(true);
                }} className="text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
        </div>


       </div>

        {/* Add resource modal */}
        {
            isAddResourceModal &&
            createPortal(
                <AddResourceModal isAddResourceModal={isAddResourceModal} collectionId={collectionId} setisAddResourceModal={setisAddResourceModal}/>,
                document.body
        )}

        {/* Edit collection */}
        {
            isAddCollectionModal &&
            createPortal(
                <AddCollectionModal isAddCollectionModal={isAddCollectionModal} existingCollectionName={collectionName} collectionId={collectionId} setisAddCollectionModal={setisAddCollectionModal} setExistingCollection={setcollectionName} fetchCollections={()=>{}}/>,
                document.body
        )}

        {/* Remove Resource */}
        {
            isRemoveResourceModal &&
            createPortal(
                <RemoveResourceModal isRemoveResourceModal={isRemoveResourceModal} activeResource={activeResource} setisRemoveResourceModal={setisRemoveResourceModal} handleRemoveResource={handleRemoveResource}/>,
                document.body
        )}

        {/* Delete Collection */}
        {
            isDeleteCollectioneModal &&
            createPortal(
                <DeleteCollectionModal isDeleteCollectioneModal={isDeleteCollectioneModal} collectionId={collectionId} setisDeleteCollectioneModal={setisDeleteCollectioneModal}/>,
                document.body
        )}

    </main>
  )
}