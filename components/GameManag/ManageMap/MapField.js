import React from "react"
import { Image } from "semantic-ui-react"
import cookies from "js-cookie"

const MapField = ({ fieldsRef, map, x, y }) => {
  const [field, setField] = React.useState(map.coords.filter(f=>f.coords.x === x && f.coords.y === y))

  const handleClick = async ()=> {
      const newFieldId = cookies.get("selected")
      if(newFieldId != "move") {
      const layer = cookies.get("layer")
      const foundField = field.find(f=>f.layer == layer)
      if(newFieldId === "cl1") { 
        setField(field.filter(f => f.layer != layer))  // clear just that layer
        map.coords = map.coords.filter(f=> f.coords.x != x || f.coords.y != y || f.layer != layer )
      } else if(newFieldId === "cl+"){ // clear layers same or higher than current layer
        setField(field.filter(f => f.layer < layer))
        map.coords = map.coords.filter(f=> f.coords.x != x || f.coords.y != y || f.layer < layer )
      } else if(newFieldId === "clall") { // clear all
        setField([])
        map.coords = map.coords.filter(f=> f.coords.x != x || f.coords.y != y)
      } else { 
        const newField = fieldsRef.current.find((i)=>i._id === newFieldId)
        newField.layer = layer
        if(Boolean(foundField) && foundField.length!==0) {  // change fields
          setField(field.map(f => f.layer == layer ? newField : f)) 
          map.coords = map.coords.map(f=>
            f.coords.x==x && f.coords.y==y && f.layer==layer ? { ...f, field: newFieldId } : f
          )
        } else {  // add new field
          setField([...field, newField])
          map.coords.push({
            field: newField._id,
            mapId: map.map._id,
            coords: {x,y},
            layer
          })
        }
      }
    }
  }

  return (
    <>
      <div className="map-col" key={Math.random()} onClick={()=>handleClick()} >
        {field?.map((f,i)=>{
          return <Image key={i} style={{zIndex: f.layer }} className={`map-field rotate-${f.rotation}${f.flip ? "-flip" : ""}`} src={f.imageSrc}></Image>
        })
        }
      </div>
    </>
  )
}
 
export default MapField