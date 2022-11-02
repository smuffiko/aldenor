import React from "react"
import Router from "next/router"
import AldenorDropdown from "./AldenorUIComponents/AldenorDropdown"
import AldenorDropdownItem from "./AldenorUIComponents/AldenorDropdownItem"
import AldenorItem from "./AldenorUIComponents/AldenorItem"
import { List } from "semantic-ui-react"
import styles from "../../styles/AldenorUI/AldenorDropdown.module.css"

const RightTop = () => {
  const onClick = src => {
    Router.push(src)
  }
  return (
    <>
      <List horizontal className={styles.dropdown}>
        <List.Item className={styles.item}>
          <AldenorItem onClick={()=>onClick("/shop")}>Shop</AldenorItem>
        </List.Item>
        <List.Item className={styles.item}>
          <AldenorItem onClick={()=>onClick("/")}>
            Social
          </AldenorItem>
        </List.Item>
        <List.Item className={styles.item}>
          <AldenorDropdown title="Devs">
            <AldenorDropdownItem onClick={()=>onClick("/")} style={{fontSize:"14px",paddingBottom:"8px"}}>
              Game settings
            </AldenorDropdownItem>
            <AldenorDropdownItem onClick={()=>onClick("/")} style={{fontSize:"12px",paddingBottom:"12px"}}>
              Staff management
            </AldenorDropdownItem>
          </AldenorDropdown>
        </List.Item>
        <List.Item className={styles.item}>
          <AldenorDropdown title="Main">
            <AldenorDropdownItem onClick={()=>onClick("/")}>
              Settings
            </AldenorDropdownItem>
            <AldenorDropdownItem onClick={()=>onClick("/")}>
              Logout
            </AldenorDropdownItem>
          </AldenorDropdown>
        </List.Item>
      </List>
    </>)
}
 
export default RightTop