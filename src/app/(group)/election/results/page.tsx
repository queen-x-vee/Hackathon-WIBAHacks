"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
//import { Provider } from 'ethers';
import { contractAddress, contractAbi } from "../../../../_constants/constant";
import Navbar from "@/_components/navbar";
import Footer from "@/_components/footer";
import BarChart from "@/_components/BarChart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ChartData {
  labels: string[];
  values: number[];
}

const Page = (props: any) => {
  const chartData = {
    labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"],
    values: [10, 20, 15, 25, 30],
  };
  const [labels, setLabels] = useState<any>([]);
  const [chartDat, setChartDat] = useState<ChartData>({
    labels: [],
    values: [],
  });
  const [results, setResults] = useState<any>(null);
  const [electionName, setElectionName] = useState("");
  const [totalVotes, setTotalVotes] = useState(0);

  async function getElection() {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );
    try {
      const results = await contractInstance.getResults(electionName);
      const labels = results.map((name: any) => name.choiceText);
      const values = results.map((votes: any) => parseInt(votes.voteCount, 16));
      const sum = values.reduce(
        (accumulator: number, currentValue: number) =>
          accumulator + currentValue,
        0
      );
      console.log("sum", sum);

      setResults(results);
      setChartDat({ labels, values });
      setTotalVotes(sum);
    } catch (err: any) {
      console.log(err.reason);
      toast.error(err.reason, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  /* useEffect(() => {
    // Fetch initial data when the component mounts
   
    getElection();

    // Set up an interval to fetch data every 5 seconds (adjust as needed)
    const interval = setInterval(getElection, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  });*/

  return (
    <>
      <Navbar connected />

      <div className=" justify-between mt-4 p-8 lg:p-20 bg-[#F8F3F3]">
        <div>
          <label
            className="font-medium text-base md:text-[18px] text-[#0D0D0D] mb-2"
            htmlFor="link"
          >
            Input Election Name to View Results
          </label>
          <div className="flex justify-between mt-2 pl-4 lg:w-[440px] w-[320px] border border-[#D9D9D9] rounded-[10px] bg-[#FAFAFA] ">
            <input
              className="bg-inherit w-11/12 border-none outline-none"
              placeholder="Enter your code"
              id="link"
              name="link"
              value={electionName}
              onChange={(e) => {
                setElectionName(e.target.value);
              }}
            />
            <button
              className="rounded-[10px] text-[#F6F4F4] bg-[#36C] p-4"
              onClick={getElection}
            >
              Submit
            </button>
          </div>
        </div>
        {chartDat && results && (
          <>
            <div className="mb-6 md:mb-8 lg:mb-10 text-left">
              <p className=" text-base md:text-2xl  font-bold mt-8 lg:mt-16">
                Total Number of voters: {totalVotes}
              </p>
            </div>

            <div className="mx-auto w-[300px] md:w-[460px]  ">
              <div className="mb-4 md:mb-6">
                <BarChart data={chartDat} />
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Page;
