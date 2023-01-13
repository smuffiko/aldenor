import React from "react"
import styles from "../../styles/GameManag.Fields.module.css"
import baseUrl from "../../utils/baseUrl"
import cookies from "js-cookie"
import { Image } from "semantic-ui-react"

const GeneratedFields = () => {
  const [fields, setFields] = React.useState(null)
  const [selected, setSelected] = React.useState("img\\Map\\border.png")

  React.useEffect(()=>{
    getFields()
  },[])

  const getFields = async () => {
    const url = `${baseUrl}/api/fields?generatingMap=true`
    const charToken = cookies.get("charId")
    await fetch(url,{
      method: "GET",
      headers: {
        "Content-type": "application-json",
        "Authorization": charToken
      }
    }).then(async response => {
      if(!response.ok) {
        const er = await response.text()
        throw new Error(er)
      }
      return await response.json()
    }).then(data => {
      setFields(data)
      console.log(data)
    }).catch(error=>console.log(error.message)) // todo? idk
  }

  return (
    <>
      <div className={styles.generatedFields}>
        <div>
          <Image src="img\\Map\\border.png" className={`${styles.generatedField} ${selected==="img\\Map\\border.png" ? styles.selected : ""}`} />
        </div>
        <div>
          Forests
            { 
              fields?.forests.map((f,i)=>(
                <Image src={f.imageSrc} className={`${styles[`rotate${f.rotation}${f.flip ? "flip" : ""}`]} ${styles.generatedField} ${selected===f.imageSrc ? styles.selected : ""}`} key={i}/>
              ))
            }
        </div>
        <div>
          Plains
          {
            fields?.plains.map((f,i)=>(
              <Image src={f.imageSrc} className={`${styles[`rotate${f.rotation}${f.flip ? "flip" : ""}`]} ${styles.generatedField} ${selected===f.imageSrc ? styles.selected : ""}`} key={i}/>
            ))
          }
        </div>
        <div>
          Shores
          {
            fields?.shores.map((f,i)=>(
              <Image src={f.imageSrc} className={`${styles[`rotate${f.rotation}${f.flip ? "flip" : ""}`]} ${styles[`rotate${f.rotation}${f.flip ? "flip" : ""}`]} ${styles.generatedField} ${selected===f.imageSrc ? styles.selected : ""}`} key={i}/>
            ))
          }
        </div>
        <div>
          Water
          {
            fields?.water.map((f,i)=>(
              <Image src={f.imageSrc} className={`${styles[`rotate${f.rotation}${f.flip ? "flip" : ""}`]} ${styles.generatedField} ${selected===f.imageSrc ? styles.selected : ""}`} key={i}/>
            ))
          }
        </div>
      </div>
    </>
  )
}
 
export default GeneratedFields