/* eslint-disable @typescript-eslint/no-unsafe-function-type */
"use client"
import Image from 'next/image'
import closeIcon from '@/app/assets/images/close-add-resource-modal-icon.png'
import { use, useEffect, useState } from 'react';
import circleLoaderIcon from "@/app/assets/images/circle-loader-icon.svg"
import { getPageTitle, isValidURL, isValidYouTubeURL } from '../utils/generic';
import axios from 'axios';
import { addResource, getApiKey, updateResourceNumber } from '../actions';


export default function AddResourceModal({isAddResourceModal, collectionId, setisAddResourceModal} :{ isAddResourceModal : boolean, collectionId : string, setisAddResourceModal : Function}) {

    //Data
    const [loading, setloading] = useState<boolean>(false)
    const [errorMessage, seterrorMessage] = useState<string>("")

    const [activeTab, setActiveTab] = useState("web"); // Track active tab
    const [link, setLink] = useState(""); // Input value

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if(errorMessage) return;
      if(loading) return;
      if(!link) return
      if(!link.trim().length) return
        setloading(true)
        try {
            console.log("Added resource")
            await addResourceToDatabase()
            setisAddResourceModal(false)
            // Add your form submission logic here
        } catch (error) {
            seterrorMessage("An error occurred");
        } finally {
            setloading(false);
            seterrorMessage("")
        }
    };


    //Fetch page title
    const fetchPageTitle = async (url: string) => {
      try {

        const formData = new URLSearchParams();
        formData.append('url', url);

        const response = await axios.post('/api/resource', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
        return response.data.title;
      } catch (error) {
        console.error('Error fetching page title:', error);
        throw new Error('Failed to fetch page title');
      }
    };
    // Add resource
    const addResourceToDatabase = async () => {
      // Get page title
      let pageTitle = await fetchPageTitle(link)

      let apiKey = await setAxiosApiKey();
      if (!apiKey) {
        seterrorMessage("An error occurred");
        return
      };

      const formData = new FormData();
      formData.append("collectionId", collectionId);
      formData.append("url", link);
      formData.append("type", activeTab.toLowerCase());
      formData.append("name", pageTitle);
      formData.append("apiKey", apiKey);

      await addResource(formData).then(async()=>{
        await updateResourceNumber(collectionId, 1)
       })
    }


    // Get API key from Firebase and set in Axios headers
    const setAxiosApiKey = async () => {
      try {
          let apiKey = await getApiKey(localStorage.getItem('organisationId') || '');
          return apiKey

      } catch (error) {
        console.error('Error setting API key:', error);
      }
    };

    useEffect(() => {
      let error = "";
      if (activeTab === "youtube" && !isValidYouTubeURL(link)) {
        error = "Invalid YouTube URL";
      } else if (!isValidURL(link)) {
        error = "Invalid URL";
      }
      seterrorMessage(error);

    }, [link, activeTab])


  return (
    <div className={`modal ${isAddResourceModal ? 'modal-open' : ''}`}>
        <div className="modal-content rounded-lg">

        <h2 className="text-lg font-bold mb-4">Add a new resource</h2>
        
        {/* Resource Options */}
        <div className="flex justify-between mb-6">
          {["File", "Web", "Youtube"].map((tab) => (
            <span key={tab}>
              <button
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`flex flex-col items-center h-20 w-20 py-4 ${
                  activeTab === tab.toLowerCase()
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500"
                }`}
              >
                {tab === "File" && "📄"}
                {tab === "Web" && "🌐"}
                {tab === "Youtube" && "▶️"}
                <span>{tab}</span>
              </button>
            </span>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Input Field */}
          <input
            type="text"
            onClick={()=> seterrorMessage("")}
            placeholder={`Enter ${activeTab} link`}
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-6"
          />

          <p className='text-red-500'>{errorMessage}</p>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            {/* Loader image */}
            {loading &&
              <Image
                  src={circleLoaderIcon}
                  alt="Wetrocloud"
                  className="circle-loader-icon mr-3 float-right animate-spin"
                />
            }
            <button
              type="button"
              onClick={() => setisAddResourceModal(false)}
              className="py-2 px-4 rounded border border-gray-300 text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="py-2 px-4 rounded bg-blue-600 text-white"
            >
              Add
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}
