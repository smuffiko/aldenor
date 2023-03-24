import React from "react"

const LeftBottom = () => {
  const [open, setOpen] = React.useState(false)
  const [toggle, setToggle] = React.useState(false)

  const toggleChat = () => {
    setOpen(prev=>!prev)
  }

  return (
    <>
      <div className={`chat ${toggle ? "toggle" : open ? "chat-open":"chat-closed"}`} onClick={toggleChat}>
        <span style={{margin:"100px"}}>Chat</span>
      </div>
    </>
    )
}
 
export default LeftBottom