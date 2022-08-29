import React from "react"
import Link from "next/link"
import baseUrl from "../utils/baseUrl"
import { Message, Form, Icon, Segment, Button, Popup } from "semantic-ui-react"
import { handleLogin } from "../utils/auth"

const INITIAL_USER = {
  login: "",
  password: "",
  password2: "",
  email: ""
}

const SignUp = () => {
  const [error, setError] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [disabled, setDisabled] = React.useState(true)
  const [success, setSuccess] = React.useState(false)
  const [user, setUser] = React.useState(INITIAL_USER)

  React.useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el))
    isUser ? setDisabled(false) : setDisabled(true)
  }, [user])

  const handleChange = (event) => {
    const { name, value } = event.target
    setUser(prevState => ({...prevState, [name]:value}))
  }

  const handleSubmit = async(event) => {
    event.preventDefault()
    setLoading(true)
    setError("")

    const url = `${baseUrl}/api/signup`
    const payload = { ...user }

    await fetch(url,{
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(payload)
    }).then(async response => {
      if(!response.ok) {
        throw new Error(await response.text())
      }
      return response.json()
    }).then(async data => {
      await sendEmail(data)
      setSuccess(true)
      setTimeout(()=>handleLogin(data.token),7000)
    }).catch(error => setError(error.message)
    ).finally(() => setLoading(false))
  }

  const sendEmail = async(data) => {
    const { login, email, emailHash } = data
    const url = `${baseUrl}/api/email`
    const a = `${baseUrl}/confirm?hash=${encodeURIComponent(emailHash)}`
    const html = `<h1>Welcome to Founders of Aldenor, ${login}!</h1><p>Please confirm your email here:</p><p><a href='${a}'>${a}</a></p>`
    const payload = {
      to: email,
      subject: `New account created! - Founders of Aldenor`,
      html
    }
    await fetch(url,{
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(payload)
    })
  }

  return (
    <>
      <Message attached icon color="black" >
        <Icon name="settings" />
        <Message.Content>
          <Message.Header>Welcome!</Message.Header>
          Create new account here
        </Message.Content>
      </Message>    
      <Form error={Boolean(error)} loading={loading} success={success} onSubmit={handleSubmit} >
        <Message error icon attached >
          <Icon name="x" />
          <Message.Content>
            <Message.Header>Oops!</Message.Header>
            {error}
          </Message.Content>
        </Message>
        <Message success icon attached >
          <Icon name="check" />
          <Message.Content>
            <Message.Header>Success!</Message.Header>
            Signing up successfull! Don't forget to confirm your email. You will be redirected soon.
          </Message.Content>
        </Message>
        <Segment attached>
          <Popup trigger={
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              label="Login"
              required={true}
              name="login"
              value={user.login}
              onChange={handleChange}
            />}
            content='Your login name. Only you should know that. Login name must be between 5 and 30 chars long with only english alphabet characters and numbers.'
          />
          <Popup trigger={
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
            />}
            content='Password needs to be at least 6 chars long. It is your secret. Strong password should contains upper and lower case characters, number and special char. But it is up to you :)'
          />
          <Popup trigger={
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              label="Password again"
              required={true}
              name="password2"
              type="password"
              value={user.password2}
              onChange={handleChange}
            />}
            content='In case of any mistake please write again your new password.'
          />
          <Popup trigger={
            <Form.Input
              fluid
              icon="envelope"
              iconPosition="left"
              label="Email"
              required={true}
              name="email"
              value={user.email}
              onChange={handleChange}
            />}
            content="Write there your email address. We will send you activation link. Without it you can't play this game."
          />
          <p>By clicking <i>Sign up!</i> button you agree with <Link href="/terms">Terms</Link> and <Link href="/privacy">Privacy</Link>.</p>
          <Button
            disabled={disabled || loading}
            icon="signup"
            type="submit"
            color="olive"
            content="Sign up!"
          />
        </Segment>
      </Form>  
    
      <Message attached="bottom" color="grey">
        <Icon name="help" />
        Do you already have an account? Sign in <Link href="/signin">here</Link> instead.
      </Message>
    </>
  )
}
 
export default SignUp