import React from "react";
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

const Verify = () => {
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
                            <Input id="address" placeholder="Enter your wallet address" />
                        </div>

                        {/* Age */}
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="age">Age</Label>
                            <Input id="age" type="number" placeholder="Enter your age" />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button>Verify</Button>
            </CardFooter>
        </Card>
    );
};

export default Verify;
