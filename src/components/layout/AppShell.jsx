import React from "react";
import Navbar from "../Navbar";

export default function AppShell({ children }) {
  return (
    <>
      <Navbar />
      <div className ="container py-4">{children}</div>
    </>
  );
}
