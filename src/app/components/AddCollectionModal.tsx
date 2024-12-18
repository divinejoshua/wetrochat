/* eslint-disable @typescript-eslint/no-unsafe-function-type */
"use client"
import Image from 'next/image'
import closeIcon from '@/app/assets/images/close-add-resource-modal-icon.png'
import { useState } from 'react';
import circleLoaderIcon from "@/app/assets/images/circle-loader-icon.svg"


export default function AddCollectionModal({isAddCollectionModal, setisAddCollectionModal} :{ isAddCollectionModal : boolean,  setisAddCollectionModal : Function}) {

    //Data
    const [loading, setloading] = useState<boolean>(false)
    const [errorMessage, seterrorMessage] = useState<string>("")
    const [collectionName, setcollectionName] = useState<string>("")

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setloading(true);
        try {

          console.log("Added collection name")
          setisAddCollectionModal(false)
            // Add your form submission logic here
        } catch (error) {
            seterrorMessage("An error occurred");
        } finally {
            setloading(false);
            setcollectionName("")
        }
    };


  return (
    <div className={`modal ${isAddCollectionModal ? 'modal-open' : ''}`}>
        <div className="modal-content rounded-lg">

           {/* Close icon  */}
           <p className='text-lg float-left'>Collection name</p>
           <button onClick={()=>setisAddCollectionModal(false)} className="float-right">
            <Image
                src={closeIcon}
                className='button-icon'
                alt='DidiAi'
            />
          </button>
          <div className='clear-both'>

          </div>

        {/* Add collection form */}
          <form onSubmit={handleSubmit} className="mt-10">
            <div className="flex">
              <input type="text"
                onClick={()=> seterrorMessage("")}
                onChange={(event)=> setcollectionName(event.target.value)}
                value={collectionName}
                autoFocus
                placeholder="Enter collection name"
                name='collectionName'
                className="form-control w-full py-2 mb-4 border border-gray-200 px-4 text-sm focus:outline-none focus:border-default focus:ring-default focus:ring-1 focus:border-100 transition duration-0 hover:duration-150 text-blacktext shadow-sm"/>
            </div>

            <p className="mt-5 text-red-500">{errorMessage}</p>


            <button type='submit' disabled={loading} className="float-right ml-4 mt-5 rounded bg-default text-white py-2 px-5 shadow-sm text-sm">Add</button>
            {/* Loader image */}
            {loading &&
            <Image
                src={circleLoaderIcon}
                alt="Wetrocloud"
                className="circle-loader-icon mt-7 mr-3 float-right animate-spin"
              />
            }

          </form>

          <div>

          </div>
        </div>
    </div>
  )
}
