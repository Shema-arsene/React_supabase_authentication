import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { userAuth } from "../Context/AuthContext"

const Signin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const { session, signInUser } = userAuth()
  console.log(session)
  // console.log(email, password)

  const handleSignIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await signInUser(email, password)

      if (result.success) {
        navigate("/dashboard")
      } else {
        setError(result.error.message)
      }
    } catch (error) {
      setError("An error occurred signing-in")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSignIn} className="max-w-md m-auto pt-24">
        <h2 className="font-semibold text-center pb-2">Sign In</h2>
        <div className="flex flex-col py-4 ">
          <input
            className="p-3 mt-3 rounded-lg bg-[#111111]"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="p-3 mt-3 rounded-lg bg-[#111111]"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-5 block w-fit mx-auto border border-[#111] py-3 px-5 rounded-lg cursor-pointer bg-[#111] hover:bg-black hover:border-black duration-300"
          >
            Sign in
          </button>
        </div>
        <p className="text-center">
          Don't have an account?
          <Link to="/signup" className="text-blue-700 mx-2">
            Sign up
          </Link>
        </p>

        {error && <p className="text-red-500 text-center pt-5">{error}</p>}
      </form>
    </div>
  )
}

export default Signin
