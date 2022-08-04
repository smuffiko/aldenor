import React from "react"
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent"
import { Icon, Container, Header } from "semantic-ui-react"

const Cookie = () => {
  const [cookieAccept, setCookieAccept] = React.useState(getCookieConsentValue("cookieAccept"))

  return (
    <CookieConsent
    location="top"
    buttonText="Accept"
    enableDeclineButton
    declineButtonText="Decline"
    flipButtons
    overlay
    cookieName="cookieAccept"
    expires={30}
    visible={cookieAccept ? "hidden" : "show"}
    onDecline={() => {
      alert("Ok, as you wish. This button doesn't do nothing more yet. But you will be redirected in the future commits. Maybe you changed your mind and you will click to Accept? :)")
    }}
    onAccept={()=>{
      // todo save to database
      setCookieAccept(true)
    }}
    children={
      <div style={{padding:"3em"}}>
        <Header as="h1" inverted><Icon name="info" floated="left"/>Cookies!</Header>
        <p>Accept cookies... You will see this message once a 30 days or if you delete <i>cookieAccept</i> cookie and refresh page. Declining cookies you can't use this page. Sorry.</p>
        <p>This text will be updated. Maybe...</p>
      </div>
    }
    style={{
      background:"rgba(25,25,25,0.95)",
      width:"80%",
      margin:"10%",
      boxShadow:"0 0 50px black"
    }}
    buttonStyle={{
      background:"rgb(0,180,0)"
    }}
    />

  )
}
 
export default Cookie