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

const Register = () => {
    const [date, setDate] = useState<Date>();

    const [name,setName] = useState("");


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
                            <Input id="name" placeholder="Enter your name" 
                            />
                        </div>

                        {/* Age */}
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="age">Age</Label>
                            <Input id="age" type="number" placeholder="Enter your age" />
                        </div>

                        {/* Birthdate */}
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="birthdate">Birthdate</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full">
                                        {date ? format(date, "PPP") : "Pick a date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={date} onSelect={setDate} />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Country Dropdown */}
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="country">Country</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a country" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="usa">USA</SelectItem>
                                    <SelectItem value="uk">UK</SelectItem>
                                    <SelectItem value="canada">Canada</SelectItem>
                                    <SelectItem value="india">India</SelectItem>
                                    <SelectItem value="bangladesh">Bangladesh</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button>Register</Button>
            </CardFooter>
        </Card>
    );
};

export default Register;
