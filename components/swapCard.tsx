"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"

import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"

import React, { useState, useEffect } from "react";
import axios from "axios"
import { MdOutlineSwapVert } from "react-icons/md";

const SwapCard = () => {
  const [sellAmount, setSellAmount] = useState("");
  const [buyAmount, setBuyAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [top, setTop] = useState("BUSD");
  const [bottom, setBottom] = useState("WBNB");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "sellAmount") {
      setSellAmount(value);
    } else if (name === "buyAmount") {
      setBuyAmount(value); // Update buyAmount if user manually edits it
    }
  };

  const handleSwap = async () => {
    if (top === "BUSD") {
      setBottom("BUSD")
      setTop("WBNB")
    }
    else {
      setBottom("WBNB")
      setTop("BUSD")
    }



  }


  const handleApiCall = async () => {
    if (!sellAmount) {
      return; // Prevent unnecessary API calls if sellAmount is empty
    }

    setIsLoading(true);

    try {

      const values = {
        amnt: sellAmount
      }

      const { data } = await axios.post("/api/fetchPrice", values)

      console.log(data);

      if (data) {
        setBuyAmount(data.message);
      } else {
        setApiError(data.error || "API error occurred"); // Handle API errors with more informative messages
      }
    } catch (error) {
      console.error("API error:", error);
    } finally {
      setIsLoading(false);
    }

  }

  // useEffect(() => {
  //   if (sellAmount) {
  //     handleApiCall(); // Trigger API call when sellAmount changes 
  //   }
  // }, [sellAmount]);

  return (
    <Card className="w-[350px] mb-16">
      <CardHeader>
        <CardTitle>Swap</CardTitle>
        <CardDescription>Trade Tokens in an Instant</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid w-full items-center gap-9">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">{top}</Label>
              <Input id="sellAmount"
                type="number"
                placeholder={"sell " + top}
                name="sellAmount"
                value={sellAmount}
                onChange={handleInputChange} />
            </div>
            <div className="flex items-center pl-7">
              <Button className="w-50 rounded-full border-2" variant="secondary" onClick={() => handleSwap()}>
              <MdOutlineSwapVert />
              </Button>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">{bottom}</Label>
              <Input id="buyAmount"
                type="number"
                placeholder={"buy " + bottom}
                name="buyAmount"
                value={buyAmount} // Display fetched WBNB value
                onChange={handleInputChange} // Allow manual edit
                disabled={!buyAmount}/>
            </div>


          </div>

        </form>
      </CardContent>

      <CardFooter className="flex justify-between">

        <Button variant="default" onClick={() => handleApiCall()}>Get Price</Button>
      </CardFooter>
    </Card>
  )
}

export default SwapCard
