import React from "react"
import baseUrl from "../utils/baseUrl"
import { handleLogin, redirectUser } from "../utils/auth"
import { Message, Icon } from "semantic-ui-react"

const Confirm = ({ confirmToken }) => {
  React.useEffect(() => {
    if(confirmToken) {
      if(confirmToken===-1) 
        setTimeout(()=>redirectUser(null,"/"),0)
      else setTimeout(()=>handleLogin(confirmToken),5000)
    }
    console.log(confirmToken)
  },[])

  return (
    <>
      {confirmToken && (
        <>
        {confirmToken!==-1 && (
          <Message success icon attached >
            <Icon name="check" />
            <Message.Content>
              <Message.Header>Success!</Message.Header>
              Your email was successfully confirmed. You will be logged soon.
            </Message.Content>
          </Message>
        )}
        </>
      )}
    </>
  )
}
 
export default Confirm

export const getServerSideProps = async ({ query: { hash } }) => {
  if(!hash) return { props: {} }
  const url = `${baseUrl}/api/signup`
  const payload = { confirm: decodeURIComponent(hash) }
  let token = -1
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
    console.log(error.message) // todo
  })
  return { props: { confirmToken: token } }
}