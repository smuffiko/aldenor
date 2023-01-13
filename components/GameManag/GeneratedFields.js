import React from "react"
import styles from "../../styles/GameManag.Fields.module.css"
import baseUrl from "../../utils/baseUrl"
import cookies from "js-cookie"
import { Image } from "semantic-ui-react"

const GeneratedFields = () => {
  const [selected, setSelected] = React.useState({})
  const [fields, setFields] = React.useState(undefined)

  React.useEffect(() => {
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
        setSelected(data.border[0]._id) 
      }).catch(error=>console.log(error.message)) // todo? idk
    }
    getFields()
  }, [])

  const handleClick = React.useCallback((image) => {
    setSelected(image)
  }, [setSelected])

  return (
    <>
    <div className={styles.generatedFields}>
      <div>
        <Image
          src="img\\Map\\border.png"
          className={`${styles.generatedField} ${selected===fields?.border[0]._id ? styles.selected : ""}`}
          onClick={()=>handleClick(fields?.border[0]._id)}
        />
      </div>
      <div>
        { 
          fields?.forests.map((f,i)=>(
            <Image
              src={f.imageSrc}
              className={`${styles[`rotate${f.rotation}${f.flip ? "flip" : ""}`]} ${styles.generatedField} ${selected===f._id ? styles.selected : ""}`}
              key={i}
              onClick={()=>handleClick(f._id)}
            />
          ))
        }
      </div>
      <div>
        {
          fields?.plains.map((f,i)=>(
            <Image
              src={f.imageSrc}
              className={`${styles[`rotate${f.rotation}${f.flip ? "flip" : ""}`]} ${styles.generatedField} ${selected===f._id ? styles.selected : ""}`} 
              key={i}
              onClick={()=>handleClick(f._id)}
            />
          ))
        }
      </div>
      <div>
        {
          fields?.shores.map((f,i)=>(
            <Image 
              src={f.imageSrc} 
              className={`${styles[`rotate${f.rotation}${f.flip ? "flip" : ""}`]} ${styles.generatedField} ${selected===f._id ? styles.selected : ""}`} 
              key={i}
              onClick={()=>handleClick(f._id)}
            />
          ))
        }
      </div>
      <div>
        {
          fields?.water.map((f,i)=>(
            <Image 
              src={f.imageSrc} 
              className={`${styles[`rotate${f.rotation}${f.flip ? "flip" : ""}`]} ${styles.generatedField} ${selected===f._id ? styles.selected : ""}`} 
              key={i}
              onClick={()=>handleClick(f._id)}
            />
          ))
        }
      </div>
    </div>
    </>
  )
}
 
export default GeneratedFields