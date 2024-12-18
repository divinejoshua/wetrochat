/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import HeaderComponent from "@/app/components/Header";
import SidebarComponent from "@/app/components/Sidebar";
import Link from "next/link";
import { useState } from "react";
// import { useEffect, useState } from "react";

export default function HomePage() {

  const [collectionList, setcollectionList] = useState<any>([
    { id: "111", title: "Staying away from addiction", resources: 3 },
    { id: "222", title: "Report analysis", resources: 4 },
    { id: "333", title: "Extra collections", resources: 3 },
    { id: "444", title: "Extra collections", resources: 3 },
    { id: "555", title: "Extra collections", resources: 4 },
  ])


  return (
    <main className="mx-auto main-container">

      <div className="sidebar">
        <SidebarComponent/>
      </div>
      <div>
        <HeaderComponent pageName="Home"/>

        {/* Main page */}
        <div className="main-page px-10 mb-20">
        <h1 className="text-2xl font-bold mb-6">My collections</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Add Collection Box */}
          <div className="flex items-center justify-center h-40 border-2 border-gray-300 border-dashed rounded-md">
            <div className="text-center">
              <div className="text-4xl text-gray-400">+</div>
              <p className="text-gray-600">Add collection</p>
            </div>
          </div>

          {/* Render Collections */}
          {collectionList.map((collection : any) => (
            <Link  key={collection.id} href={`/collection/${collection.id}`}>
              <div
                className="p-4 bg-white shadow rounded-md border border-gray-200 h-40 truncate"
              >
                <h2 className="text-lg font-medium text-gray-800">
                  {collection.title}
                </h2>
                <p className="text-gray-500 text-sm">
                  {collection.resources} resources
                </p>
              </div>
            </Link>
          ))}
        </div>
        </div>


      </div>

    </main>
  )
}
