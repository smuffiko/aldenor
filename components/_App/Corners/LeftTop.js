import React from "react"
import cookies from "js-cookie"
import { Icon, Image } from "semantic-ui-react"
import FillBar from "../../Game/FillBar"
import baseUrl from "../../../utils/baseUrl"
import { unsetCharToken } from "../../../utils/character"
import AldenorIcon from "../AldenorUIComponents/AldenorIcon"

const LeftTop = ({ user }) => {
  const hpImg = [
    "/img/UI/FillBars/HpBar/FB_HP_S1.png",
    "/img/UI/FillBars/HpBar/FB_HP_S2.png",
    "/img/UI/FillBars/HpBar/FB_HP_S3.png",
    "/img/UI/FillBars/HpBar/FB_HP_M1.png",
    "/img/UI/FillBars/HpBar/FB_HP_E1.png",
    "/img/UI/FillBars/HpBar/FB_HP_E2.png",
    "/img/UI/FillBars/HpBar/FB_HP_E3.png"
  ]
  const epImg = [
    "/img/UI/FillBars/EnergyBar/FB_EP_S1.png",
    "/img/UI/FillBars/EnergyBar/FB_EP_S2.png",
    "/img/UI/FillBars/EnergyBar/FB_EP_S3.png",
    "/img/UI/FillBars/EnergyBar/FB_EP_M1.png",
    "/img/UI/FillBars/EnergyBar/FB_EP_E1.png",
    "/img/UI/FillBars/EnergyBar/FB_EP_E2.png",
    "/img/UI/FillBars/EnergyBar/FB_EP_E3.png"
  ]
  const expImg = [
    "/img/UI/FillBars/ExpBar/FB_EXP_S1.png",
    "/img/UI/FillBars/ExpBar/FB_EXP_S2.png",
    "/img/UI/FillBars/ExpBar/FB_EXP_S3.png",
    "/img/UI/FillBars/ExpBar/FB_EXP_M1.png",
    "/img/UI/FillBars/ExpBar/FB_EXP_E1.png",
    "/img/UI/FillBars/ExpBar/FB_EXP_E2.png",
    "/img/UI/FillBars/ExpBar/FB_EXP_E3.png"
  ]
  const [hp, setHp] = React.useState(null)
  const [maxHp, setMaxHp] = React.useState(null)
  const [ep, setEp] = React.useState(null)
  const [maxEp, setMaxEp] = React.useState(null)
  const [exp, setExp] = React.useState(null)
  const [maxExp, setMaxExp] = React.useState(null)
  const [character, setCharacter] = React.useState(null)

  React.useEffect(async ()=>{
    const charToken = cookies.get("charId")
    if(charToken!==undefined) {
      const url = `${baseUrl}/api/character?charToken=${charToken}`
      const token = cookies.get("token")
      await fetch(url,{
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": token
        }
      }).then(async response => {
        if(!response.ok) {
          const er = await response.text()
          throw new Error(er)
        }
        return await response.json()      
      }).then(async data => {
        setCharacter(data.character)
      }).catch(error => {
        unsetCharToken()
        Router.push("/characters")
      })
    } else {
      Router.push("/characters")
    }
  },[])

  React.useEffect(()=>{
    if(character) {
      setHp(character.stats.HP.current)
      setMaxHp(character.stats.HP.max)
      setEp(character.stats.energy.current)
      setMaxEp(character.stats.energy.max)
      setExp(character.exp)
      setMaxExp(character.maxExp)
    }
  },[character])

  return (
    <>
      {character && (
        <div className="game-corner-l-t-wrap">
          <div className="game-corner-l-t-right">
            <div className="game-corner-char">
              <div className="character-preview">
                <Image src={`/img/Characters/${character.race}/${character.gender ? "Female" : "Male"}_Hair_${character.hair+1}/${character.gender ? "Female" : "Male"}_Hair_${character.hair+1}_1.png`} className="hair"/>
                <Image floated="left" src={`/img/Characters/${character.race}/${character.skin}/Export_${character.gender ? "female" : "male"}/${character.gender ? "female" : "male"}_1.png`} className="basic-char" />    
              </div>      
            </div>
            <div className="game-corner-inv"><AldenorIcon name="pouch" color="yellow"/></div>
          </div>
        
          <div className="game-corner-l-t-left">
            <div className="game-corner-l-t-fb"><FillBar img={hpImg} current={hp} max={maxHp} /></div>
            <div className="game-corner-l-t-fb"><FillBar img={epImg} current={ep} max={maxEp} /></div>
            <div className="game-corner-l-t-fb"><FillBar img={expImg} current={exp} max={maxExp} /></div>
            <div className="game-corner-l-t-fb"><FillBar name={character.name}/></div>
          </div>
        </div>
      )}
    </>
  )
}
 
export default LeftTop