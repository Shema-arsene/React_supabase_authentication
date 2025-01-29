import React from "react"
import { userAuth } from "../Context/AuthContext"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const { session, signOut } = userAuth()

  const navigate = useNavigate()

  // console.log(session)

  const handleSignOut = async (e) => {
    e.preventDefault()

    try {
      await signOut()
      navigate("/")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="p-20">
      <h1 className="text-center font-semibold text-3xl my-10">Dashboard</h1>
      <p className="text-center">Welcome {session?.user?.email}!</p>
      <div>
        <button
          onClick={handleSignOut}
          className="mt-5 block w-fit mx-auto border border-[#111] py-3 px-5 rounded-lg cursor-pointer bg-[#111] hover:bg-black hover:border-black duration-300"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default Dashboard
