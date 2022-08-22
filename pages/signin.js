import React from "react"
import Link from "next/link"
import baseUrl from "../utils/baseUrl"
import { handleLogin } from "../utils/auth"
import { Message, Form, Icon, Segment, Button } from "semantic-ui-react"

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
      <Message attached icon color="black" >
        <Icon name="settings" />
        <Message.Content>
          <Message.Header>Welcome back!</Message.Header>
          Sign in here
        </Message.Content>
      </Message>    
      <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit} >
        <Message error icon attached >
          <Icon name="x" />
          <Message.Content>
            <Message.Header>Oops!</Message.Header>
            {error}
          </Message.Content>
        </Message>
        <Segment attached>
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
          <Button
            disabled={disabled || loading}
            icon="sign in"
            type="submit"
            color="olive"
            content="Sign in!"
          />
        </Segment>
      </Form>  
    
      <Message attached="bottom" color="grey">
        <Icon name="help" />
        Are you new? Sign up <Link href="/signup">here</Link> instead.
      </Message>
    </>
  )
}
 
export default SignIn

export const getServerSideProps = async ({ query: { confirm } }) => {
  if(!confirm) return { props: {} }
  const url = `${baseUrl}/api/signup`
  const payload = { confirm: decodeURIComponent(confirm) }
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