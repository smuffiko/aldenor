import React from "react"
import { Image } from "semantic-ui-react"
import AldenorCharacterPreview from "../../_App/AldenorUIComponents/AldenorCharacterPreview"

const MapField = ({ map, x, y, character }) => {
  const [field, setField] = React.useState(map.coords.filter(f=>f.coords.x === x && f.coords.y === y))

  const handleClick = ()=>{
    console.log("clicked",field)
  }

  return (
    <>
      <div className="map-col" key={Math.random()} onClick={()=>handleClick()} >
        {field?.map((f,i)=>{
          return <Image key={i} style={{zIndex: f.layer, pointerEvents:"none"}} className={`map-field rotate-${f.rotation}${f.flip ? "-flip" : ""}`} src={f.imageSrc}></Image>
        })
        }
        {character.coords.current.map==map.map._id && character.coords.current.x === x && character.coords.current.y === y &&
          <AldenorCharacterPreview 
            style={{pointerEvents:"none"}}
            basic={`/img/Characters/${character.race}/${character.skin}/Export_${character.gender ? "female" : "male"}/${character.gender ? "female" : "male"}_1.png`}
            hair={`/img/Characters/${character.race}/${character.gender ? "Female" : "Male"}_Hair_${character.hair+1}/${character.gender ? "Female" : "Male"}_Hair_${character.hair+1}_1.png`}
          />
        }
      </div>
    </>
  )
}
 
export default MapField