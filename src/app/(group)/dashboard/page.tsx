"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const [user, setUser] = useState({
    email: "",
    message: "",
    full_name: "",
  });
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("access_token");
      try {
        axios
          .get("https://voting-basic.onrender.com/api/user", {
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            console.log(response);
            console.log(response.data.message);
            setUser(response.data.message);
            //setStores(response.data.stores[0])
          })
          .catch((error) => {
            // Handle any errors or display appropriate message
            console.error(error);
          });
      } catch (error: any) {
        console.error("Error:", error.message);
      }
      //console.log(stores.address)
    };

    fetchUser();
  }, []);
  return (
    <div className=" min-h-screen bg-gradient-to-b from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <main className="p-4 w-5/6 lg:w-3/5 mx-auto bg-white min-h-screen rounded-2xl">
        <h1 className="text-3xl font-bold text-center p-6">WIBA TEAM 4</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-5">
          <section className="lg:col-span-1">
            <Image
              src={`https://ui-avatars.com/api/?name=${user?.full_name}&background=random`}
              alt="WIBA TEAM 4"
              className="rounded-full"
              width={50}
              height={50}
            />
            <h3>Welcome {user.full_name}</h3>

            <div className="flex flex-col items-left justify-center gap-6 py-6 mt-3">
              <p>What would you like to do today?</p>
              <Link className=" underline" href="/election/create-election">Create an election</Link>
              <Link className="underline" href="/election/manage-election">Manage an election</Link>
            </div>
          </section>
          <section className="lg:col-span-1 mx-auto">
            <h3>Ongoing Elections</h3>
            <div className="w-[250px] h-[250px] bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"></div>
          </section>
        </div>
        <div className="mt-8">
          <h3>Past Elections</h3>
        </div>
      </main>
    </div>
  );
};

export default Page;