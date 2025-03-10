import { createContext, useEffect, useState, useContext } from "react"
import { supabase } from "../SupabaseClient"

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined)

  //   Sign up
  const signUpNewUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) {
      console.error("There was a problem signing up: ", error)
      return {
        success: false,
        error,
      }
    }

    return { success: true, data }
  }

  //   Sign in
  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })

      if (error) {
        console.error("An error occurred signing in: ", error)
        return { success: false, error: error.message }
      }
      console.log("Sign-in successful: ", data)
      return { success: true, data }
    } catch (error) {
      console.error("There was an error signing in: ", error)
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: session }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
    })
  }, [])

  //   Sign out
  const signOut = () => {
    const { error } = supabase.auth.signOut()

    if (error) {
      console.error("There was a problem signing out: ", error)
    }
  }

  return (
    <AuthContext.Provider
      value={{ session, signUpNewUser, signInUser, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const userAuth = () => {
  return useContext(AuthContext)
}
