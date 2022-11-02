import React from "react"
import styles from "../../../styles/AldenorUI/AldenorDropdown.module.css"
import AldenorItem from "./AldenorItem"

const AldenorDropdown = ({ children, title, onClick, style }) => {
  const [hidden, setHidden] = React.useState(true)
  return (
    <> 
      <div onMouseLeave={()=>setHidden(true)}>
        <AldenorItem onClick={onClick ? onClick : ()=>setHidden(false)} style={style}>{title}</AldenorItem>
        <div className={hidden ? styles.hidden : styles.visible }>{children}</div>
      </div>
    </>
  )
}
export default AldenorDropdown