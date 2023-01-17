import React from "react"
import Link from "next/link"
import baseUrl from "../utils/baseUrl"
import { handleLogin } from "../utils/auth"
import { Message, Form, Icon, Segment, Button } from "semantic-ui-react"
import styles from "../styles/AldenorUI/AldenorUI.Form.module.css"

const INITIAL_USER = {
  login: "",
  password: ""
}

const SignIn = () => {
  const [user, setUser] = React.useState(INITIAL_USER)
  const [error, setError] = React.useState("")
  const [disabled, setDisabled] = React.useState(false)
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
      <div className="bodyContent">
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
            className={styles.input}
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
            className={styles.input}
          />
          <Button
            icon="sign in"
            type="submit"
            className={`${styles.button} ${disabled || loading ? styles.disabled : ""}`}
            content="Sign in!"
          />
        </Segment>
      </Form>  
    
      <Message attached="bottom" color="grey">
        <Icon name="help" />
        Are you new? Sign up <Link href="/signup">here</Link> instead. Did you lost your password? Recover it <Link href="/lostPw">here</Link>
      </Message>
      </div>
    </>
  )
}
 
export default SignIn