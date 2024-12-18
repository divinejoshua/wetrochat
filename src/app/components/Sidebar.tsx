"use client"
import Link from "next/link";
import headerLogo from "@/app/assets/images/header-logo.png"
import Image from "next/image";



export default function SidebarComponent() {


    return (
        <div className="sidebar-panel fixed top-0 border-r">
            <div className="px-6 py-6">
            <h1 className="text-xl font-bold">
            <Image
                src={headerLogo}
                alt="Wetrocloud"
                className="header-logo"
            />
            </h1>

            <ul className="mt-12 font-medium">
                <Link href="/home"><li className={`px-3 py-3 cursor-pointer sidebar-list active`}>Home</li></Link>
                <a href="https://console.wetrocloud.com/" target="_blank"><li className="px-3 py-3 cursor-pointer sidebar-list">Back to console</li></a>
                {/* <a href={PAGE_PATH_API_REFERENCES} target="_blank"><li className="px-3 py-3 cursor-pointer sidebar-list">API reference</li></a> */}
                {/* <Link  href={PAGE_PATH_BILLING}><li className={`px-3 py-3 cursor-pointer sidebar-list ${pathname === PAGE_PATH_BILLING ? 'active' : null}`}>Billing</li></Link> */}
                {/* <Link  href={PAGE_PATH_SETTINGS}><li className={`px-3 py-3 cursor-pointer sidebar-list ${pathname === PAGE_PATH_SETTINGS ? 'active' : null}`}>Settings</li></Link> */}
            </ul>

            </div>


            {/* <div className="sidebar"> */}
                {/* <div className="sidebar-bottom-item">
                    <div className="px-6">
                        <div className="flex">
                            <button className="sidebar-avatar bg-purple-700 text-xl text-white">D</button>
                            <p className="mt-3 ml-4 truncate"> {userEmail ? userEmail : "divine@email.com"}</p>
                        </div>
                        <button className="mt-5 text-medium text-gray-400" onClick={()=> setisLogoutModal(true)}>Logout</button>
                    </div>

                    {
                        isLogoutModal &&
                        createPortal(
                            <LogoutModal isLogoutModal={isLogoutModal} setisLogoutModal={setisLogoutModal}/>,
                            document.body
                    )}
                </div> */}
            {/* </div> */}
        </div>
    )
}
