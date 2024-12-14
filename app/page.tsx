"use client";

import DarkMode from "@/components/DarkMode";
import Register from "@/components/Register";
import Verify from "@/components/Verify";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"register" | "verify" >("register");

  return (
    <>
      <div className="flex items-center justify-center mt-4">
        <DarkMode />
      </div>

      {/* Buttons to toggle between Register and Verify */}
      <div className="flex items-center justify-center gap-16 mt-8">
        <Button
          className="w-50 rounded-full border-2"
          variant="secondary"
          onClick={() => setActiveTab("register")}
        >
          Register
        </Button>
        <Button
          className="w-50 rounded-full border-2"
          variant="secondary"
          onClick={() => setActiveTab("verify")}
        >
          Verify
        </Button>
      </div>
{/* Render Register or Verify based on activeTab */}
      <div className="flex items-center justify-center mt-8">
        {activeTab === "register" && <Register />}
        {activeTab === "verify" && <Verify />}
      </div>
    </>
  );
}
