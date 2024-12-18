/* eslint-disable @typescript-eslint/no-unsafe-function-type */
"use client"
import Image from 'next/image'
import closeIcon from '@/app/assets/images/close-add-resource-modal-icon.png'
import { useEffect, useState } from 'react';
import circleLoaderIcon from "@/app/assets/images/circle-loader-icon.svg"


export default function RemoveResourceModal({isRemoveResourceModal, activeResource, setisRemoveResourceModal, handleRemoveResource} :{ isRemoveResourceModal : boolean, activeResource : object, setisRemoveResourceModal : Function, handleRemoveResource : Function}) {

    //Data
    const [loading, setloading] = useState<boolean>(false)
    const [errorMessage, seterrorMessage] = useState<string>("")
    const [resourceName, setresourceName] = useState<string>("")

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            handleRemoveResource(activeResource.id)
            console.log("Removed resource")
            // Add your form submission logic here
        } catch (error) {
            seterrorMessage("An error occurred");
        } finally {
            setloading(false);
            seterrorMessage("")
        }
    };


  return (
    <div className={`modal ${isRemoveResourceModal ? 'modal-open' : ''}`}>
        <div className="modal-content rounded-lg">

           {/* Close icon  */}
           <p className='text-lg float-left'>Collection name</p>
           <button onClick={()=>setisRemoveResourceModal(false)} className="float-right">
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
            <p>Are you sure you want to delete <span className='bg-gray-200 rounded font-medium'>{activeResource?.resourceName}</span> from resource list?</p>
            <p className="mt-5 text-red-500">{errorMessage}</p>


            <button type='submit' disabled={loading} className="float-right ml-4 mt-5 rounded bg-white text-red-500 py-2 px-5 border border-red-100 text-sm">Remove</button>
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
