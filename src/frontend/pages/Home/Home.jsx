import React from "react";
import { SideBar } from "../../components/SideBar";

export function Home() {
  return (
    <>
      <div className="page-container">
        <SideBar />
        <main>Home Page</main>
      </div>
    </>
  );
}
