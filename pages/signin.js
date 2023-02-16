import React from "react"
import Link from "next/link"
import baseUrl from "../utils/baseUrl"
import { handleLogin } from "../utils/auth"
import { Message, Form, Icon, Header, Button } from "semantic-ui-react"
import AldenorSegment from "../components/_App/AldenorUIComponents/AldenorSegment"
import AldenorMessage from "../components/_App/AldenorUIComponents/AldenorMessage"
import AldenorIcon from "../components/_App/AldenorUIComponents/AldenorIcon"

const INITIAL_USER = {
  login: "",
  password: ""
}

const SignIn = () => {
  const [user, setUser] = React.useState(INITIAL_USER)
  const [error, setError] = React.useState("")
  const [disabled, setDisabled] = React.useState(true)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el))
    isUser ? setDisabled(false) : setDisabled(true)
  },[user])

  const handleChange = event => {
    const { name, value } = event.target
    setUser(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)
    setError("")
    const url = `${baseUrl}/api/signin`
    const payload = { ...user }
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(payload)
    }).then(async response => {
      if(!response.ok) {
        const er = await response.text()
        throw new Error(er)
      }
      return await response.text()
    }).then(data => {
      handleLogin(data)
    }).catch(error => {
      setError(error.message)
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <>
      <AldenorSegment>
        <AldenorMessage box="grey">
          <Header>Welcome back!</Header>
          <p>Sign in here</p>
        </AldenorMessage>    
        <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit} >
          <AldenorMessage box="red" visible={Boolean(error)}>
            <Header><Icon name="x" />Oops!</Header>
            {error}
          </AldenorMessage>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            label="Login"
            required={true}
            name="login"
            value={user.login}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            label="Password"
            required={true}
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className={disabled || loading ? "basic-button-disabled disabled" : "basic-button"}
          ><Icon name="sign in"/>Sign in!</button>
        </Form>  
        <AldenorMessage box="yellow" >
          <p><Icon name="help" size="large"/> Are you new? Sign up <Link href="/signup">here</Link> instead. Did you lost your password? Recover it <Link href="/lostPw">here</Link></p>
        </AldenorMessage>    
      </AldenorSegment>
    </>
  )
}
 
export default SignIn