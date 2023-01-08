import React from "react"
import styles from "../../styles/GameManag.Fields.module.css"
import { Button, Form, Image } from "semantic-ui-react"
import baseUrl from "../../utils/baseUrl"
import cookie from "js-cookie"

const NULL_CHECKED = {
  left: false,
  top: false,
  right: false,
  bottom: false
}

const FieldUpdating = ({ field, setFieldUpdating }) => {
  const [preview, setPreview] = React.useState(field)
  const [dbFields, setDbFields] = React.useState([])
  const [checked, setChecked] = React.useState(NULL_CHECKED)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(async ()=>{
    const dbF = await getDbFields()
    setCheckedField(field, dbF)
  },[])

  const getDbFields = async() => {
    const url = `${baseUrl}/api/fields`
    const token = cookie.get("token")
    const dbF = await fetch(url,{
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
    }).then(data => {
      setDbFields(data.fields)
      return data.fields
    }).catch(error => {
      console.log(error.message) // todo
    })
    return dbF
  }
  
  const handleChange = ( event, { value } ) => { // changing checked left/top/right/bottom if anyone choose different image from select
    event.preventDefault()
    const newPreview = JSON.parse(value)
    setPreview(newPreview) 
    setCheckedField(newPreview, false)
  }

  const setCheckedField = (newPreview, dataFields ) => {
    let fields = []
    if(dataFields) fields = dataFields
      else fields = dbFields
    setChecked(NULL_CHECKED)
    fields.find(f=>{
      if(f._id===field._id) {
        f.left.map(ff=>ff===newPreview._id ? setChecked(prev=>({...prev, left: true})) : null)
        f.top.map(ff=>ff===newPreview._id ? setChecked(prev=>({...prev, top: true})) : null)
        f.right.map(ff=>ff===newPreview._id ? setChecked(prev=>({...prev, right: true})) : null)
        f.bottom.map(ff=>ff===newPreview._id ? setChecked(prev=>({...prev, bottom: true})) : null)
      }
    })
  }

  const handleChecked = async (direction, value) => { // changing checkbox -> update field in db
    setLoading(true)
    const url = `${baseUrl}/api/field`
    const token = cookie.get("token")
    const payload = {
      direction,
      value,
      field: field._id,
      newField: preview._id
    }
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(payload)
    }).then(async response => {
      if(!response.ok) {
        const er = await response.text()
        throw new Error(er)
      }
      return await response.json()      
    }).then(async data => {
      setChecked(prevState=> ({ ...prevState, [direction]: value })) // change checkbox value
      if(field._id === preview._id) {
        const revDirection = direction === "top" ? "bottom"
          : direction === "bottom" ? "top"
          : direction === "left" ? "right"
          : "left"
        setChecked(prevState=> ({ ...prevState, [revDirection]: value })) // change checkbox value rev direction if adding self image
      }
      await getDbFields()
    }).catch(error => {
      console.log(error.message) // todo
    }).finally(()=>{
      setLoading(false)
    })
  }

  return (
    <>
      <Button
        color='olive'
        icon='arrow left'
        label={{ basic: true, color: 'grey', pointing: 'left', content: "Back" }}
        onClick={()=>setFieldUpdating(false)}
        type="button"
      />
      <div>
        <div className={styles.fieldPreview}>
          <div className={`${styles.fieldPreviewTop} ${styles[`rotate${preview.rotation}${preview.flip ? "flip" : ""}`]}`}><Image src={preview.imageSrc}/></div>
          <div className={`${styles.fieldPreviewLeft} ${styles[`rotate${preview.rotation}${preview.flip ? "flip" : ""}`]}`}><Image src={preview.imageSrc} /></div>
          <div className={`${styles.fieldPreviewMiddle} ${styles[`rotate${field.rotation}${field.flip ? "flip" : ""}`]}`}>
            <Image
              className={`${styles[`basic${field.flip?`Flipped`:``}${field.rotation}`]}`}
              src={field.imageSrc}
            />
          </div>
          <div className={`${styles.fieldPreviewRight} ${styles[`rotate${preview.rotation}${preview.flip ? "flip" : ""}`]}`}><Image src={preview.imageSrc}/></div>
          <div className={`${styles.fieldPreviewBottom} ${styles[`rotate${preview.rotation}${preview.flip ? "flip" : ""}`]}`}><Image src={preview.imageSrc}/></div>
        </div>
        <Form className={styles.form} loading={loading} >
          <div>
            <Form.Dropdown
              disabled={loading} 
              selection
              fluid
              placeholder="Select image for preview"
              value={JSON.stringify({
                _id: preview._id,
                imageSrc: preview.imageSrc,
                rotation: preview.rotation,
                flip: preview.flip
              })} 
              onChange={handleChange}
              options={dbFields.map(f=>({
                key: `${f._id}`,
                value: JSON.stringify({ _id: f._id, imageSrc: f.imageSrc, rotation: f.rotation, flip: f.flip }),
                text: `${f.imageSrc} - ${f.flip?"flipped":"basic"} ${f.rotation}°`,
                image: { src: f.imageSrc, className: `${styles[`rotate${f.rotation}${f.flip ? "flip" : ""}`]}` }
              }))}
            />
            <Form.Group>
              <Form.Checkbox className={styles.check} disabled={loading} label="Left" checked={checked.left} name="left" onChange={()=>handleChecked("left", !checked.left)} />
              <Form.Checkbox className={styles.check} disabled={loading} label="Top" checked={checked.top} name="top" onChange={()=>handleChecked("top", !checked.top)} />
              <Form.Checkbox className={styles.check} disabled={loading} label="Right" checked={checked.right} name="right" onChange={()=>handleChecked("right", !checked.right)} />
              <Form.Checkbox className={styles.check} disabled={loading} label="Bottom" checked={checked.bottom} name="bottom" onChange={()=>handleChecked("bottom", !checked.bottom)} />
            </Form.Group>
          </div>
        </Form>
      </div>
    </>
  )
}
 
export default FieldUpdating