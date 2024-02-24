'use client'
import { useState } from "react";
import CustomInput from "../components/CustomInput";
import apiClient from "@/libs/api";

export default function Newsletter() {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);

  const handleSubmit = (event) => {
    console.log({ firstName, lastName, email })
    apiClient.post("/newsletter/subscribe", {
      firstName,
      lastName,
      email,
    })
  }

  return (
    <div className="centered-window">
      <div className="normal-text">
        <p>
          do you like reveling in the embarassments of others, at least a little bit?
        </p>
        <br></br>
        <br></br>
        <p>
          well then, i've got a newsletter for you. every one of my weeks is just chock full of them. the main characters of my life are also going to make frequent appearances – that means you can reply to me to get an intro if anyone sounds interesting to you.</p>
        <br></br>
        <br></br>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label className="">
            <p>first name</p>
            <input
              className="col-span-2 w-full border border-gray-200 min-w-40"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </label>
          <label className="">
            <p>last name</p>
            <input
              className="col-span-2 w-full border border-gray-200"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </label>
          <label className="">
            <p>email</p>
            <input
              className="col-span-2 w-full border border-gray-200"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </label>
          <button type="submit" className="border border-gray-200 mt-3">subscribe</button>
        </form>
        <br />
        <a href=".." key="back">
          ⮐
        </a>
      </div>
    </div>
  )
}