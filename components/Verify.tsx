import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface WalletProps {
    walletState: { provider: any | null; contract: any | null; account: string | null };
}

const Verify = ({ walletState }: WalletProps) => {
    const { provider, contract, account } = walletState;

    const [address, setAddress] = useState<string>("");
    const [age, setAge] = useState<number | "">("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [verificationResult, setVerificationResult] = useState<{
        name: string;
        age: number;
        birthdate: string;
        country: string;
    } | null>(null);

    const handleVerify = async () => {
        if (!contract || !provider || !account) {
            setError("Wallet is not connected or contract is not loaded.");
            return;
        }

        if (!address || !age) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // Call the `verify` function on the contract
            const result = await contract.verify(address, Number(age));
            setVerificationResult({
                name: result[0],
                age: result[1].toNumber(),
                birthdate: result[2],
                country: result[3],
            });

            setLoading(false);
        } catch (err: any) {
            setLoading(false);

            // Extract error message from the error object
            const errorMessage = err.data?.message || err.message;

            if (errorMessage.includes("Access denied")) {
                setError("Access denied: You cannot view someone else's data.");
            } else if (errorMessage.includes("User not registered")) {
                setError("User is not registered.");
            } else if (errorMessage.includes("Age does not match")) {
                setError("Age does not match the registered record.");
            } else {
                setError("Verification failed. Please try again.");
            }

            setVerificationResult(null);
        }
    };

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Verification</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        {/* Address */}
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="address">Wallet Address</Label>
                            <Input
                                id="address"
                                placeholder="Enter your wallet address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        {/* Age */}
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="age">Age</Label>
                            <Input
                                id="age"
                                type="number"
                                placeholder="Enter your age"
                                value={age}
                                onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")}
                            />
                        </div>
                    </div>
                </form>
                {/* Error Message */}
                {error && <p className="text-red-500 mt-2">{error}</p>}

                {/* Verification Result */}
                {verificationResult && (
                    <div className="mt-4 p-4 border rounded">
                        <p><strong>Name:</strong> {verificationResult.name}</p>
                        <p><strong>Age:</strong> {verificationResult.age}</p>
                        <p><strong>Birthdate:</strong> {verificationResult.birthdate}</p>
                        <p><strong>Country:</strong> {verificationResult.country}</p>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button onClick={handleVerify} disabled={loading}>
                    {loading ? "Verifying..." : "Verify"}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default Verify;
