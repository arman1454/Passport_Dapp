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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { log } from "console";


interface WalletProps {
    walletState: { contract: any | null; account: string | null };
}

const Register = ({ walletState }: WalletProps) => {
    const [name, setName] = useState("");
    const [age, setAge] = useState<number | "">("");
    const [birthdate, setBirthdate] = useState<Date | undefined>(new Date());
    const [country, setCountry] = useState("");

    const handleSubmit = async () => {
        if (!name || !age || !birthdate || !country) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const { contract, account } = walletState;

            if (!contract || !account) {
                alert("Wallet is not connected. Please connect your wallet first.");
                return;
            }

            const formattedDate = birthdate ? format(birthdate, "dd-MM-yyyy") : "";

            // Prepare data for contract call
            const registrationData = {
                name,
                age: Number(age), // Ensure age is a number
                birthdate: formattedDate,
                country,
            };

            console.log("Submitting Registration:", registrationData);
            console.log(account);
            
            // Call the contract's register function
            const transaction = await contract.register(
                registrationData.name,
                registrationData.age,
                registrationData.birthdate,
                registrationData.country,
            );

            console.log("Transaction:", transaction);

            // Wait for the transaction to be mined
            const receipt = await transaction.wait();
            console.log("Transaction receipt:", receipt);

            alert("Registration successful!");
            setName("")
            setAge("")
            setBirthdate(new Date())
            setCountry("")
        } catch (error) {
            console.error("Error during registration:", error);
            alert("Failed to register. Please check the console for details.");
        }
    };

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Register</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        {/* Name */}
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)} 
                            
                            />
                        </div>

                        {/* Age */}
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="age">Age</Label>
                            <Input id="age"
                                type="number"
                                placeholder="Enter your age"
                                value={age}
                                onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")} />
                        </div>

                        {/* Birthdate */}
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="birthdate">Birthdate</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full">
                                        {birthdate ? format(birthdate, "PPP") : "Pick a date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={birthdate} onSelect={setBirthdate} />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Country Dropdown */}
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="country">Country</Label>
                            <Select onValueChange={(value) => setCountry(value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a country" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="USA">USA</SelectItem>
                                    <SelectItem value="UK">UK</SelectItem>
                                    <SelectItem value="Canada">Canada</SelectItem>
                                    <SelectItem value="India">India</SelectItem>
                                    <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button onClick={handleSubmit}>Register</Button>
            </CardFooter>
        </Card>
    );
};

export default Register;
