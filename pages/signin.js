import React from "react"
import Link from "next/link"
import baseUrl from "../utils/baseUrl"
import { handleLogin } from "../utils/auth"

const INITIAL_USER = {
  login: "",
  password: ""
}

const SignIn = ({ loginUser }) => {
  const [user, setUser] = React.useState(INITIAL_USER)
  const [error, setError] = React.useState("")
  const [disabled, setDisabled] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if(loginUser) handleLogin(loginUser)
  },[])

  React.useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el))
    isUser ? setDisabled(false) : setDisabled(true)
  },[user])

  const handleChange = event => {
    const { name, value } = event.target
    setUser(prevState => ({ ...prevState, [name]: value }))
  }


  return (<>Sign In</>)
}
 
export default SignIn

export const getServerSideProps = async ({ query: { confirm, _id} }) => {
  if(!confirm || !_id) return { props: {} }
  const url = `${baseUrl}/api/signup`
  const payload = { confirm: decodeURIComponent(confirm), _id: decodeURIComponent(_id) }
  let token = null
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(payload)
  }).then(async response=> {
    if(!response.ok) {
      const er = await response.text()
      throw new Error(er)
    }
    return await response.text()
  }).then(data => {
    token = data
  }).catch(error=>{
    console.log(error.message)
  })
  return { props: { loginUser: token } }
}