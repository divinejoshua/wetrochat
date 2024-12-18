"use client"
import HeaderComponent from "@/app/components/Header";
import SidebarComponent from "@/app/components/Sidebar";
// import { useEffect, useState } from "react";

export default function HomePage() {
  return (
    <main className="mx-auto main-container">

      <div className="sidebar">
        <SidebarComponent/>
      </div>
      <div>
        <HeaderComponent pageName="Dashboard"/>

        {/* Main page */}
        <div className="main-page px-10 mb-20">
          <h1 className="text-lg font-medium">API keys</h1>

        </div>


      </div>

    </main>
  )
}
