import React, { useState } from "react"
import { Link } from "react-router-dom"
import { userAuth } from "../Context/AuthContext"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState("")

  const session = userAuth()

  console.log(session)

  return (
    <div>
      <form className="max-w-md m-auto pt-24 border border-black">
        <h2 className="font-semibold pb-2">Signup today!</h2>
        <p>
          Alrady have an account?{" "}
          <Link to="/signin" className="text-blue-700">
            Sign in
          </Link>
        </p>
        <div className="flex flex-col py-4 ">
          <input
            className="p-3 mt-3 border border-black"
            type="email"
            placeholder="Email"
          />
          <input
            className="p-3 mt-3 border border-black"
            type="password"
            placeholder="Password"
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-5 block w-fit mx-auto"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  )
}

export default Signup
