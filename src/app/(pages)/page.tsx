"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { verifyText } from "../utils/generic";
import { isValidOrganisation } from "../actions";


export default function Home() {

  //Hooks
  const router = useRouter()

  const checkValidOrganisation = async (storedOrganisationId) => { 
    if (storedOrganisationId) {
      const isValid = await isValidOrganisation(storedOrganisationId);
      if (isValid) {
        router.replace('/home'); 
      } else {
        window.location.href = 'https://console.wetrocloud.com';
      }
    } else {
      window.location.href = 'https://console.wetrocloud.com';
    }
  }
  //
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('access');

    if (token) {
      const organisationId = token.slice(100);
      const truncatedToken = token.slice(0, 100);
      console.log(truncatedToken);
      let isValidUser = verifyText(truncatedToken);

      if(isValidUser){
        localStorage.setItem('organisationId', organisationId);
        // router.replace('/home');
      } else {
        window.location.href = 'https://console.wetrocloud.com';
      }

    }

    else {
      const storedOrganisationId = localStorage.getItem('organisationId');
      checkValidOrganisation(storedOrganisationId)
    }

  }, []);
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     <p>Home</p>
    </div>
  );
}
