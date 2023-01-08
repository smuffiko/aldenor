import React from "react"
import Router, { useRouter } from "next/router"
import { List } from "semantic-ui-react"
import styles from "../../../styles/AldenorUI/AldenorUI.module.css"
import cookies from "js-cookie"
import AldenorButton from "../AldenorUIComponents/AldenorButton"
import { unsetCharToken } from "../../../utils/character"

const NULL_PANEL_BG = {
  back: 1,
  shop: 1,
  tools: 1,
  adminTools: 1,
  gameManag: 1,
  staffManag: 1,
  gameMenu: 1,
  guild: 1,
  party: 1,
  achievments: 1,
  camp: 1,
  others: 1,
  ticket: 1,
  characters: 1
}

const RightTop = ({ user, character }) => {
  const [open, setOpen] = React.useState({ devs: false, game: false, others: false})
  const [panelBg, setPanelBg] = React.useState(NULL_PANEL_BG)
  const [buttonBg, setButtonBg] = React.useState(NULL_PANEL_BG)
  const router = useRouter()
  
  const logoutChar = () => {
    unsetCharToken()
    Router.push("/characters")
  }

  React.useEffect(()=>{
    const cookieSet = cookies.get("menu")
    if(cookieSet === undefined) {
      const panel = {
        back: Math.floor(Math.random()*3+1),
        shop: Math.floor(Math.random()*3+1),
        tools: Math.floor(Math.random()*3+1),
        adminTools: Math.floor(Math.random()*3+1),
        gameManag: Math.floor(Math.random()*3+1),
        staffManag: Math.floor(Math.random()*3+1),
        gameMenu: Math.floor(Math.random()*3+1),
        guild: Math.floor(Math.random()*3+1),
        party: Math.floor(Math.random()*3+1),
        achievments: Math.floor(Math.random()*3+1),
        camp: Math.floor(Math.random()*3+1),
        others: Math.floor(Math.random()*3+1),
        ticket: Math.floor(Math.random()*3+1),
        characters: Math.floor(Math.random()*3+1)
      }
      const button = {
        back: Math.floor(Math.random()*4+1),
        shop: Math.floor(Math.random()*4+1),
        tools: Math.floor(Math.random()*4+1),
        adminTools: Math.floor(Math.random()*4+1),
        gameManag: Math.floor(Math.random()*4+1),
        staffManag: Math.floor(Math.random()*4+1),
        gameMenu: Math.floor(Math.random()*4+1),
        guild: Math.floor(Math.random()*4+1),
        party: Math.floor(Math.random()*4+1),
        achievments: Math.floor(Math.random()*4+1),
        camp: Math.floor(Math.random()*4+1),
        others: Math.floor(Math.random()*4+1),
        ticket: Math.floor(Math.random()*4+1),
        characters: Math.floor(Math.random()*4+1)
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

  const close = menu => {
    setOpen(prev=> ({ ... prev, [menu]: false}))  
  }
  const openMenu = menu => {
    setOpen(prev=> ({ ... prev, [menu]: true}))  
  }
  return (
    <>
      <List horizontal className={styles.rightTopMenu}>
        { router.pathname !== "/game" && (
          <List.Item className={`${styles[`panel${panelBg.back}`]} ${styles.menuItem}`}>
            <div
              className={styles.rightTopListItem}
              onClick={()=>Router.push("/game")}
            >
              <AldenorButton button={buttonBg.back}>Back</AldenorButton>
            </div>
          </List.Item>
        )}
        <List.Item className={`${styles[`panel${panelBg.shop}`]} ${styles.menuItem}`}>
          <div
            className={styles.rightTopListItem}
            onClick={()=>Router.push("/gameShop")}
          >
            <AldenorButton button={buttonBg.shop}>Shop</AldenorButton>
          </div>
        </List.Item>
        {(character.role === "admin" || character.role === "root") && (
          <List.Item
            onMouseLeave={()=>close("devs")}
            className={`${styles[`panel${panelBg.tools}`]} ${styles.menuItem}`}
            onMouseOver={()=>openMenu("devs")}
            >
              <div
                className={styles.rightTopListItem}
              >
                <AldenorButton button={buttonBg.tools}>Tools</AldenorButton>
              </div>
            <List className={open.devs ? styles.visible : styles.hidden}>
              {character.role === "admin" && (
                <List.Item className={styles[`panel${panelBg.adminTools}`]}>
                  <div
                    className={styles.rightTopListItem}
                    onClick={()=>Router.push("/adminTools")}
                  >
                    <AldenorButton button={buttonBg.adminTools}>Admin Tools</AldenorButton>
                  </div>
                </List.Item>
              )}
              {character.role === "root" && (
                <>
                  <List.Item className={styles[`panel${panelBg.gameManag}`]}>
                    <div
                      className={styles.rightTopListItem}
                      onClick={()=>Router.push("/gameManag")}
                    >
                      <AldenorButton button={buttonBg.gameManag}>Game Manag</AldenorButton>
                    </div>
                  </List.Item>
                  <List.Item className={styles[`panel${panelBg.staffManag}`]}>
                    <div
                      className={styles.rightTopListItem}
                      onClick={()=>Router.push("/staffManag")}
                    >
                      <AldenorButton button={buttonBg.staffManag}>Staff Manag</AldenorButton>
                    </div>
                  </List.Item>
                </>
              )}
            </List>
          </List.Item>
        )}
        <List.Item 
          onMouseLeave={()=>close("game")}
          className={`${styles[`panel${panelBg.gameMenu}`]} ${styles.menuItem}`}
          onMouseOver={()=>openMenu("game")}
          >
          <div className={styles.rightTopListItem}><AldenorButton button={buttonBg.gameMenu}>Game nef</AldenorButton></div>
          <List className={open.game ? styles.visible : styles.hidden}>
            <List.Item className={styles[`panel${panelBg.guild}`]}>
              <div
                className={styles.rightTopListItem}
              >
                <AldenorButton button={buttonBg.guild}>Guild</AldenorButton>
              </div>
            </List.Item>
            <List.Item className={styles[`panel${panelBg.party}`]}>
              <div
                className={styles.rightTopListItem}
              >
                <AldenorButton button={buttonBg.party}>Party</AldenorButton>
              </div>
            </List.Item>
            <List.Item className={styles[`panel${panelBg.achievments}`]}>
              <div
                className={styles.rightTopListItem}
              >
                <AldenorButton button={buttonBg.achievments}>Achievments</AldenorButton>
              </div>
            </List.Item>
            <List.Item className={styles[`panel${panelBg.camp}`]}>
              <div
                className={styles.rightTopListItem}
              >
                <AldenorButton button={buttonBg.camp}>Camp</AldenorButton>
              </div>
            </List.Item>
          </List>
        </List.Item>
        <List.Item 
          onMouseLeave={()=>close("others")}
          className={`${styles[`panel${panelBg.others}`]} ${styles.menuItem}`}
          onMouseOver={()=>openMenu("others")}
          >
          <div
            className={styles.rightTopListItem}
          >
            <AldenorButton button={buttonBg.others}>Others</AldenorButton>
          </div>
          <List className={open.others ? styles.visible : styles.hidden}>
            <List.Item className={styles[`panel${panelBg.ticket}`]}>
              <div
                className={styles.rightTopListItem}
                onClick={()=>Router.push("/ticket")}
              >
                <AldenorButton button={buttonBg.ticket}>Ticket</AldenorButton>
              </div>
            </List.Item>
            <List.Item className={styles[`panel${panelBg.characters}`]}>
              <div
                className={styles.rightTopListItem}
                onClick={()=>logoutChar()}
              >
                <AldenorButton button={buttonBg.characters}>Characters</AldenorButton>
              </div>
            </List.Item>
          </List>
        </List.Item>
      </List>
    </>)
}
 
export default RightTop