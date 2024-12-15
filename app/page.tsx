"use client";

import DarkMode from "@/components/DarkMode";
import Register from "@/components/Register";
import Verify from "@/components/Verify";
import Wallet from "@/components/Wallet";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"register" | "verify" >("register");

  const [state, setState] = useState<{ provider: any | null; contract: any | null; account: string | null }>({
    provider: null,
    contract: null,
    account: null
  })

  const saveState = (state: { provider: any; contract: any; account: string }) => {
    console.log(state);
    setState(state);
  }
  return (
    <>
      <div className="flex items-center justify-center mt-4 gap-16">
        <DarkMode />
        <Wallet saveState={saveState} />
      </div>

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
      <div className="flex items-center justify-center mt-8">
        {activeTab === "register" && <Register walletState={state}/>}
        {activeTab === "verify" && <Verify walletState = {state}/>}
      </div>
    </>
  );
}
