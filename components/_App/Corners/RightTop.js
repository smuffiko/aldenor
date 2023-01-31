import React from "react"
import Router, { useRouter } from "next/router"
import { unsetCharToken } from "../../../utils/character"
import AldenorGCMenuItem from "../AldenorUIComponents/AldenorGCMenuItem"
import AldenorList from "../AldenorUIComponents/AldenorList"
import AldenorListItem from "../AldenorUIComponents/AldenorListItem"
import AldenorIcon from "../AldenorUIComponents/AldenorIcon"

const RightTop = ({ user, character }) => {
  const [open, setOpen] = React.useState({ devs: false, game: false, others: false})
  const router = useRouter()
  
  const logoutChar = () => {
    unsetCharToken()
    Router.push("/characters")
  }

  const close = menu => {
    setOpen(prev=> ({ ... prev, [menu]: false}))  
  }
  
  const openMenu = menu => {
    setOpen(prev=> ({ ... prev, [menu]: true}))  
  }

  return (
    <>
      <AldenorList horizontal={true}>

        {/* If user is at other path than /game, show back button */}
        { router.pathname !== "/game" && (
          <AldenorListItem onClick={()=>Router.push("/game")}>
            <AldenorGCMenuItem>Back</AldenorGCMenuItem>
          </AldenorListItem>
        )}

        {/* Shop button */}
        <AldenorListItem onClick={()=>Router.push("/gameShop")}>
          <AldenorGCMenuItem>Shop</AldenorGCMenuItem>
        </AldenorListItem>

        {/* Admin or root -> show Tools */}
        {(character.role === "admin" || character.role === "root") && (
          <AldenorListItem onMouseLeave={()=>close("devs")} onMouseOver={()=>openMenu("devs")} >
            <AldenorGCMenuItem>Tools</AldenorGCMenuItem>
            <AldenorList visibility={open.devs ? "visible" : "hidden"}>
              {character.role === "admin" && (
                <AldenorListItem onClick={()=>Router.push("/adminTools")}>
                  <AldenorGCMenuItem>Admin Tools</AldenorGCMenuItem>
                </AldenorListItem>
              )}
              {character.role === "root" && (
                <>
                  <AldenorListItem onClick={()=>Router.push("/gameManag")}>
                    <AldenorGCMenuItem>Game Manag</AldenorGCMenuItem>
                  </AldenorListItem>
                  <AldenorListItem onClick={()=>Router.push("/staffManag")}>
                    <AldenorGCMenuItem>Staff Manag</AldenorGCMenuItem>
                  </AldenorListItem>
                </>
              )}
            </AldenorList>
          </AldenorListItem>
        )}

        {/* Game -> paths for game //todo */}
        <AldenorListItem onMouseLeave={()=>close("game")} onMouseOver={()=>openMenu("game")} >
          <AldenorGCMenuItem>Game nef</AldenorGCMenuItem>
          <AldenorList visibility={open.game ?  "visible" : "hidden"}>
            <AldenorListItem>
              <AldenorGCMenuItem>Guild</AldenorGCMenuItem>
            </AldenorListItem>
            <AldenorListItem>
              <AldenorGCMenuItem>Party</AldenorGCMenuItem>
            </AldenorListItem>
            <AldenorListItem>
              <AldenorGCMenuItem>Achievments</AldenorGCMenuItem>
            </AldenorListItem>
            <AldenorListItem>
              <AldenorGCMenuItem>Camp</AldenorGCMenuItem>
            </AldenorListItem>
          </AldenorList>
        </AldenorListItem>

        {/* Others list -> ticket, "logout" */}
        <AldenorListItem onMouseLeave={()=>close("others")} onMouseOver={()=>openMenu("others")} >
          <AldenorGCMenuItem>Others</AldenorGCMenuItem>
          <AldenorList visibility={open.others ? "visible" : "hidden"}>
            <AldenorListItem onClick={()=>Router.push("/ticket")}>
              <AldenorGCMenuItem>Ticket</AldenorGCMenuItem>
            </AldenorListItem>
            <AldenorListItem onClick={()=>logoutChar()}>
              <AldenorGCMenuItem>Chars</AldenorGCMenuItem>
            </AldenorListItem>
          </AldenorList>
        </AldenorListItem>

      </AldenorList>
    </>
  )
}
 
export default RightTop