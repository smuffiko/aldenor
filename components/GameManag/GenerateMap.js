import React from "react"
import styles from "../../styles/GameManag.Fields.module.css"
import { Button, Table, Image } from "semantic-ui-react"
import baseUrl from "../../utils/baseUrl"

const GenerateMap = () => {
  const [map, setMap] = React.useState([])

  const generateNewMap = async () => {
    const url = `${baseUrl}/api/map`
    const payload = { x: 20, y: 15 }
    await fetch(url,{
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(payload)
    }).then(async response => {
      if(!response.ok) {
        const er = await response.text()
        throw new Error(er)
      }
      return await response.json()
    }).then(data => {
      setMap(data)
    }).catch(error=>console.log(error.message)) // todo
  }

  const mapMap = ()=> {
    return (
      <div className="mapTable">
        {
          map.map(field => {
            return (
              <div className="mapRow" key={Math.random()}>
                {
                  field.map(f => {
                    return (
                      <div className="mapCol" key={Math.random()}>
                        <Image className={`mapField ${styles[`rotate${f.rotation}${f.flip ? "flip" : ""}`]}`} src={f.imageSrc} />
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    )
  }

  return (
    <>
      <Button onClick={()=>generateNewMap()} content="Generate new map" type="button"/>
      {mapMap()}
    </>
  )
}
 
export default GenerateMap