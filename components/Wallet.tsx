import React, { useState } from 'react'
import { Button } from './ui/button'
import { ethers } from "ethers";
import ABI from "./ABI.json"

interface WalletProps {
    saveState: (state: { provider: any; contract: any; account: string }) => void;
}

const Wallet = ({ saveState }: WalletProps) => {
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
                "0x6a5C1689A344E3e307a10a3455e1A5F3E4A5801d", // Contract address
                ABI, // Contract ABI
                signer // Signer connects the contract to the current account
            );

            // console.log(contract);

            // Update state
            setConnected(false); // Assuming this is part of your state logic
            saveState({ provider: provider, contract: contract, account: account });

            // console.log(provider);
            // console.log(contract);
            // console.log(account);
            
            // setAccount(account); // Update account state

        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
            alert("Failed to connect to MetaMask");
        }
    };
  return (
    <div>
          <Button className='w-32' onClick={init}>Connect to Wallet</Button>
    </div>
  )
}

export default Wallet
