import React, { useState } from "react";
import { Button } from "./ui/button";
import { ethers } from "ethers";
import ABI from "./ABI.json";

interface WalletProps {
    saveState: (state: { provider: any; contract: any; account: string }) => void;
}


const Wallet = ({ saveState }: WalletProps) => {
    const [connected, setConnected] = useState(false); // Track connection status
    const [account, setAccount] = useState<string | null>(null);

    const init = async () => {
        try {
            const ethereum = (window as any).ethereum;
            if (!ethereum) {
                alert("MetaMask is not installed");
                return;
            }

            // Request account access
            await ethereum.request({ method: "eth_requestAccounts" });

            // Create a provider
            const provider = new ethers.providers.Web3Provider(ethereum);

            // Get the signer
            const signer = provider.getSigner();

            // Get the user's account address
            const account = await signer.getAddress();

            // Create the contract instance
            const contract = new ethers.Contract(
                "0x55D201F92CF82CEdA92dE6F33Bd9008d481dcB23", // Contract address
                ABI, // Contract ABI
                signer // Signer connects the contract to the current account
            );

            // Update state
            setConnected(true); // Connection established
            setAccount(account); // Set the account address
            saveState({ provider, contract, account }); // Save contract-related state
        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
            alert("Failed to connect to MetaMask");
        }
    };

    return (
        <div>
            {connected && account ? (
                <Button className="w-32" disabled>
                    Connected 
                </Button>
            ) : (
                <Button className="w-32" onClick={init}>
                    Connect to Wallet
                </Button>
            )}
        </div>
    );
};

export default Wallet;
