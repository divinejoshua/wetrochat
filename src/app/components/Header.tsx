"use client"

export default function HeaderComponent({pageName} : {pageName : string}) {

  return (
    <div className='grid grid-cols-12 gap-0 fixed top-0 w-full py-6 main-header bg-white border-b px-10'>

      {/* Loader */}
      {/* {!userEmail || !organizationId ?
        <div className="linear-activity fixed top-0">
          <div className="indeterminate"></div>
        </div> : null
      } */}

     <h1 className='text-xl font-medium'>{pageName}</h1>
    </div>
  )
}
