import React from "react"
import ManageMap from "../components/GameManag/ManageMap/ManageMap"
import ManageFiles from "../components/GameManag/ManageFiles/ManageFiles"
import CharactersInfo from "../components/GameManag/ManageCharactersInfo/CharactersInfo"
import { Accordion, Icon } from "semantic-ui-react"
import ManagePOI from "../components/GameManag/ManagePOI/ManagePOI"

const GameManag = () => {
  const [updatingFiles, setUpdatingFiles] = React.useState(false)
  const [map, setMap] = React.useState(null)
  const [activeIndex, setActiveIndex] = React.useState(null)
  const [updating, setUpdating] = React.useState(updatingFiles || Boolean(map) )

  React.useEffect(()=>{
    setUpdating(updatingFiles || Boolean(map))
  },[updatingFiles, map])

  return (
    <>
    <div className="manage-bg">
      <Accordion>
        { (updatingFiles && updating || !updating ) && <>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={()=>setActiveIndex(0)}
          >
            <Icon name='dropdown' />Files
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <ManageFiles setUpdating={setUpdatingFiles} updating={updatingFiles} /> 
          </Accordion.Content>
        </>}
        { (Boolean(map) && updating || !updating) && <>
          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={()=>setActiveIndex(1)}
          >
            <Icon name='dropdown' />Map
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <ManageMap map={map} setMap={setMap} />
          </Accordion.Content>
        </>}
        { !updating &&  <>
          <Accordion.Title
            active={activeIndex === 2}
            index={2}
            onClick={()=>setActiveIndex(2)}
          >
            <Icon name='dropdown' />POI
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <ManagePOI />
          </Accordion.Content>
        </>}
        { !updating &&  <>
          <Accordion.Title
            active={activeIndex === 3}
            index={3}
            onClick={()=>setActiveIndex(3)}
          >
            <Icon name='dropdown' />Characters info
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 3}>
            <CharactersInfo />
          </Accordion.Content>
        </>}
      </Accordion>
    </div>
    </>
  )
}

export default GameManag