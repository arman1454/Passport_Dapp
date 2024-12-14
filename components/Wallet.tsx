import React, { useState } from 'react'
import { Button } from './ui/button'
import { ethers } from "ethers";

const Wallet = () => {
    const [connected, setConnected] = useState<boolean>(true);
    const [account, setAccount] = useState("");
    const init = async () => {
        try {
            if (!window.ethereum) {
                alert("MetaMask is not installed");
                return;
            }

            // Request account access
            await window.ethereum.request({ method: "eth_requestAccounts" });

            // Create a provider
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            // Get the signer
            const signer = provider.getSigner();

            // Get the user's account address
            const account = await signer.getAddress();

            // Create the contract instance
            const contract = new ethers.Contract(
                "0xa3D40cDf17bc7fFE248B00CE59d5B11dd47321ca", // Contract address
                ABI, // Contract ABI
                signer // Signer connects the contract to the current account
            );

            console.log(contract);

            // Update state
            setConnected(false); // Assuming this is part of your state logic
            saveState({ provider: provider, contract: contract, account: account });
            setAccount(account); // Update account state

        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
            alert("Failed to connect to MetaMask");
        }
    };
  return (
    <div>
      <Button className='w-32' onClick={()=>}>Connect to Wallet</Button>
    </div>
  )
}

export default Wallet
