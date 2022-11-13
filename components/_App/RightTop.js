import React from "react"
import Router from "next/router"
import { List } from "semantic-ui-react"
import styles from "../../styles/AldenorUI/AldenorDropdown.module.css"
import cookies from "js-cookie"
import AldenorButton from "./AldenorUIComponents/AldenorButton"

const NULL_PANEL_BG = {
  a1: 1,
  a2: 1,
  a3: 1,
  b3: 1,
  c3: 1,
  a4: 1,
  b4: 1,
  c4: 1
}

const RightTop = () => {
  const [open, setOpen] = React.useState({ devs: false, menu: false})
  const [panelBg, setPanelBg] = React.useState(NULL_PANEL_BG)
  const [buttonBg, setButtonBg] = React.useState(NULL_PANEL_BG)

  React.useEffect(()=>{
    const cookieSet = cookies.get("menu")
    if(cookieSet === undefined) {
      const panel = {
        a1: Math.floor(Math.random()*3+1),
        a2: Math.floor(Math.random()*3+1),
        a3: Math.floor(Math.random()*3+1),
        b3: Math.floor(Math.random()*3+1),
        c3: Math.floor(Math.random()*3+1),
        a4: Math.floor(Math.random()*3+1),
        b4: Math.floor(Math.random()*3+1),
        c4: Math.floor(Math.random()*3+1)
      }
      const button = {
        a1: Math.floor(Math.random()*4+1),
        a2: Math.floor(Math.random()*4+1),
        a3: Math.floor(Math.random()*4+1),
        b3: Math.floor(Math.random()*4+1),
        c3: Math.floor(Math.random()*4+1),
        a4: Math.floor(Math.random()*4+1),
        b4: Math.floor(Math.random()*4+1),
        c4: Math.floor(Math.random()*4+1)
      }
      const tenMinutes = new Date(new Date().getTime() + 10 * 60 * 1000)
      cookies.set("menu",JSON.stringify({ panel, button }), { expires: tenMinutes })
      setPanelBg(panel)
      setButtonBg(button)
    } else {
      const parsedSet = JSON.parse(cookieSet)
      setPanelBg(parsedSet.panel)
      setButtonBg(parsedSet.button)
    }
  },[])

  const toggle = menu => {
    setOpen(prev=> ({ ... prev, [menu]: !prev[menu]}))  
  }
  const close = menu => {
    setOpen(prev=> ({ ... prev, [menu]: false}))  
  }
  const openMenu = menu => {
    setOpen(prev=> ({ ... prev, [menu]: true}))  
  }
  return (
    <>
      <List horizontal className={styles.dropdown}>
        <List.Item className={`${styles[`panel${panelBg.a1}`]} ${styles.item}`}>
          <div className={styles.dropdownItem}><AldenorButton onClick={()=>Router.push("/shop")} button={buttonBg.a1}>Shop</AldenorButton></div>
        </List.Item>
        <List.Item className={`${styles[`panel${panelBg.a2}`]} ${styles.item}`}>
          <div className={styles.dropdownItem}><AldenorButton onClick={()=>Router.push("/")} button={buttonBg.a2}>Social</AldenorButton></div>
        </List.Item>
        <List.Item
          onMouseLeave={()=>close("devs")}
          className={`${styles[`panel${panelBg.a3}`]} ${styles.item}`}
          onMouseOver={()=>openMenu("devs")}
          >
            <div className={styles.dropdownItem}><AldenorButton button={buttonBg.a3}>Devs</AldenorButton></div>
          <List className={open.devs ? styles.visible : styles.hidden}>
            <List.Item className={styles[`panel${panelBg.b3}`]}><div className={styles.dropdownItem}><AldenorButton button={buttonBg.b3}style={{fontSize:"14px",paddingBottom:"8px"}}>Game settings</AldenorButton></div></List.Item>
            <List.Item className={styles[`panel${panelBg.c3}`]}><div className={styles.dropdownItem}><AldenorButton button={buttonBg.c3} style={{fontSize:"12px",paddingBottom:"12px"}}>Staff management</AldenorButton></div></List.Item>
          </List>
        </List.Item>
        <List.Item 
          onMouseLeave={()=>close("menu")}
          className={`${styles[`panel${panelBg.a4}`]} ${styles.item}`}
          onMouseOver={()=>openMenu("menu")}
          >
          <div className={styles.dropdownItem}><AldenorButton button={buttonBg.a4}>Menu</AldenorButton></div>
          <List className={open.menu ? styles.visible : styles.hidden}>
            <List.Item className={styles[`panel${panelBg.b4}`]}><div className={styles.dropdownItem}><AldenorButton button={buttonBg.b4}>Settings</AldenorButton></div></List.Item>
            <List.Item className={styles[`panel${panelBg.c4}`]}><div className={styles.dropdownItem}><AldenorButton button={buttonBg.c4}>Logout</AldenorButton></div></List.Item>
          </List>
        </List.Item>
      </List>
    </>)
}
 
export default RightTop