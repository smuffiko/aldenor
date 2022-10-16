import React from "react"
import styles from "../../styles/GameManag.Fields.module.css"
import { Button, Form, Image } from "semantic-ui-react"
import baseUrl from "../../utils/baseUrl"
import cookie from "js-cookie"

const FieldUpdating = ({ field, setFieldUpdating }) => {
  const [preview, setPreview] = React.useState(field)
  const [dbFields, setDbFields] = React.useState([])
  const [checked, setChecked] = React.useState({
    left: false,
    top: false,
    right: false,
    bottom: false
  })
  const [loading, setLoading] = React.useState(false)

  React.useEffect(()=>{
    getDbFields()
  },[])
  const getDbFields = async() => {
    const url = `${baseUrl}/api/fields`
    const token = cookie.get("token")
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
    }).then(data => {
      setDbFields(data.fields)
    }).catch(error => {
      console.log(error.message) // todo
    })
  }
  
  const handleChange = ( event, { value } ) => { // changing checked left/top/right/bottom if anyone choose different image from select
    event.preventDefault()
    const newPreview = JSON.parse(value)
    setPreview(newPreview)  
    dbFields.find(dbField=>(
      dbField.left.find(f=>{f===newPreview._id ? setChecked(prev=>({...prev, left: true})) : setChecked(prev=>({...prev, left: false}))}) ||
      dbField.top.find(fa=>{fa===newPreview._id ? setChecked(prev=>({...prev, top: true})) : setChecked(prev=>({...prev, top: false}))}) ||
      dbField.right.find(fb=>{fb===newPreview._id ? setChecked(prev=>({...prev, right: true})) : setChecked(prev=>({...prev, right: false}))}) ||
      dbField.bottom.find(fc=>{fc===newPreview._id ? setChecked(prev=>({...prev, bottom: true})) : setChecked(prev=>({...prev, bottom: false}))})
    ))
  }

  const handleChecked = async (direction, value) => { // changing checkbox
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
    }).then(data => {
      setChecked(prevState=> ({ ...prevState, [direction]: value })) // change checkbox value
      setDbFields(prevState=> data.f1._id === prevState._id ? data.f1 : prevState)
      setDbFields(prevState=> data.f2._id === prevState._id ? data.f2 : prevState)
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
                imageSrc: preview.imageSrc,
                rotation: preview.rotation,
                flip: preview.flip,
                _id: preview._id
              })} 
              onChange={handleChange}
              options={dbFields.map(f=>({
                key: `${f._id}`,
                value: JSON.stringify({ imageSrc: f.imageSrc, rotation: f.rotation, flip: f.flip, _id: f._id }),
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