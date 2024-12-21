/* eslint-disable @typescript-eslint/no-unsafe-function-type */
"use client"
import Image from 'next/image'
import closeIcon from '@/app/assets/images/close-add-resource-modal-icon.png'
import { useEffect, useState } from 'react';
import circleLoaderIcon from "@/app/assets/images/circle-loader-icon.svg"
import { useRouter } from 'next/navigation';


export default function DeleteCollectionModal({isDeleteCollectioneModal, collectionId, setisDeleteCollectioneModal} :{ isDeleteCollectioneModal : boolean, collectionId : string, setisDeleteCollectioneModal : Function}) {

    // HOOKS
    const router = useRouter()

    //Data
    const [loading, setloading] = useState<boolean>(false)
    const [errorMessage, seterrorMessage] = useState<string>("")

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            // handleRemoveResource(activeResource.id)
            console.log("Removed collection")
            // Add your form submission logic here
        } catch (error) {
            seterrorMessage("An error occurred");
        } finally {
            setloading(false);
            seterrorMessage("")
        }
    };


  return (
    <div className={`modal ${isDeleteCollectioneModal ? 'modal-open' : ''}`}>
        <div className="modal-content rounded-lg">

           {/* Close icon  */}
           <p className='text-lg float-left'>Collection name</p>
           <button onClick={()=>setisDeleteCollectioneModal(false)} className="float-right">
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
            <p>Are you sure you want to delete this collection?</p>
            <p className="mt-5 text-red-500">{errorMessage}</p>


            <button type='submit' disabled={loading} className="float-right ml-4 mt-5 rounded bg-white text-red-500 py-2 px-5 border border-red-100 text-sm">Delete</button>
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
