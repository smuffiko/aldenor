import React from "react"
import baseUrl from "../utils/baseUrl"
import { Message, Form, Icon, Segment, Button, Popup } from "semantic-ui-react"
import { handleLogin } from "../utils/auth"

const INITIAL_USER = {
  loginOrEmail: ""
}
const INITIAL_PW = {
  password1: "",
  password2: ""
}

const LostPw = ({ hash }) => {
  const [user, setUser] = React.useState(INITIAL_USER)
  const [error, setError] = React.useState("")
  const [disabled, setDisabled] = React.useState(false)
  const [disabledPw, setDisabledPw] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [passwords, setPasswords] = React.useState(INITIAL_PW)
  const [successPw, setSuccessPw] = React.useState(false)

  React.useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el))
    isUser ? setDisabled(false) : setDisabled(true)
  },[user])
  
  React.useEffect(() => {
    const isPw = Object.values(passwords).every(el => Boolean(el) && el.length >= 6) && passwords.password1 === passwords.password2
    isPw ? setDisabledPw(false) : setDisabledPw(true)
  },[passwords])

  const handleChange = event => {
    const { name, value } = event.target
    setUser(prevState => ({ ...prevState, [name]: value }))
  }

  const handleChangePw = event => {
    const { name, value } = event.target
    setPasswords(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)
    setError("")
    const url = `${baseUrl}/api/lostPw`
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
      return await response.json()
    }).then(async data => {
      await sendEmail(data)
      setEmail(data.secureEmail)
      setSuccess(true)
    }).catch(error => {
      setError(error.message)
    }).finally(() => {
      setLoading(false)
    })
  }

  const sendEmail = async data => {
    const { login, email, emailHash } = data
    const url = `${baseUrl}/api/email`
    const a = `${baseUrl}/lostPw?hash=${encodeURIComponent(emailHash)}`
    const html = `<h1>Hello, ${login}!</h1><p>For reset your password do it here:</p><p><a href='${a}'>${a}</a></p>`
    const payload = {
      to: email,
      subject: `Reset password - Founders of Aldenor`,
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

  const handlePw = async () => {
    setLoading(true)
    const url = `${baseUrl}/api/lostPw`
    const payload = { password: passwords.password1, emailHash: hash }
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(payload)
    }).then(async response => {
      if(!response.ok) {
        const er = await response.text()
        throw new Error(er)
      }
      return await response.json()
    }).then(data => {

      setSuccessPw(true)
      setTimeout(()=>handleLogin(data.token),7000)
    }).catch(error => {
      setError(error.message) // todo this error is for other form!!
      console.log(error.message)
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <>
      <Message attached icon color="black" >
        <Icon name="settings" />
        <Message.Content>
          <Message.Header>Lost password </Message.Header>
          Recover it here
        </Message.Content>
      </Message>  
      {hash ? (
        <Form loading={loading} onSubmit={handlePw} success={successPw}>
          <Message success icon attached >
            <Icon name="check" />
            <Message.Content>
              <Message.Header>Success!</Message.Header>
              Password was changed! You will be redirected soon!
            </Message.Content>
          </Message>
          <Popup trigger={
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              label="New password"
              required={true}
              name="password1"
              type="password"
              value={passwords.password1}
              onChange={handleChangePw}
            />}
            content='Password needs to be at least 6 chars long. It is your secret. Strong password should contains upper and lower case characters, number and special char. But it is up to you :)'
          />
          <Popup trigger={
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              label="New password again"
              required={true}
              name="password2"
              type="password"
              value={passwords.password2}
              onChange={handleChangePw}
            />}
            content='In case of any mistake please write again your new password.'
          />
          <Button
            disabled={disabledPw || loading}
            icon="mail"
            type="submit"
            color="olive"
            content="Recover password"
          />
        </Form>
      ) : (
        <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit} success={success}>
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
              Message was sent to email {email}. Check it now and reset your password.
            </Message.Content>
          </Message>
          <Segment attached>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              label="Login or email"
              required={true}
              name="loginOrEmail"
              value={user.loginOrEmail}
              onChange={handleChange}
            />
            <Button
              disabled={disabled || loading}
              icon="mail"
              type="submit"
              color="olive"
              content="Recover password"
            />
          </Segment>
        </Form>  
      )}  
    </>
  )
}
 
export default LostPw

export const getServerSideProps = async ({ query: { hash } }) => {
  if(!hash) return { props: {} }
  let isHash = false
  // check if hash exists
  const url = `${baseUrl}/api/lostPw?hash=${hash}`
  await fetch (url, {
    method: "GET",
    headers: {
      "Content-type": "application/json"
    },
  }).then(async response=> {
    if(!response.ok) {
      const er = await response.text()
      throw new Error(er)
    }
    return await response.text()
  }).then(data => {
    isHash = true
  }).catch(error=>{
    console.log(error.message) // todo
  })
  if(!isHash) return { props: {} }
  else return { props: { hash } }
}