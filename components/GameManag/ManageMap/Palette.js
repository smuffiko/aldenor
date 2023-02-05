import React from "react"
import baseUrl from "../../../utils/baseUrl"
import cookies from "js-cookie"
import PaletteField from "./PaletteField"
import { Dimmer, Loader, Icon } from "semantic-ui-react"
import PaletteLayer from "./PaletteLayer"

const Palette = ({}) => {
  const fieldsRef = React.useRef(null)
  const [fields, setFields] = React.useState()
  const [selected, setSelected] = React.useState()
  const [layer, setLayer] = React.useState(0)
  const [loading, setLoading] = React.useState(true)
  const handleClickSelected = React.useCallback((image) => {
    setSelected(image)
    cookies.set("selected",image, {
      sameSite: "None",
      secure: true
    })
  }, [setSelected])
  const handleClickLayer = React.useCallback((value) => {
    setLayer(value)
    cookies.set("layer",value, {
      sameSite: "None",
      secure: true
    })
  }, [setSelected])

  React.useEffect(()=>{
    const getFields = async () => {
      const url = `${baseUrl}/api/fields?generatingMap=true`
      const charToken = cookies.get("charId")
      await fetch(url,{
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": charToken
        }
      }).then(async response => {
        if(!response.ok) {
          const er = await response.text()
          throw new Error(er)
        }
        return await response.json()
      }).then(data => {
        fieldsRef.current = data
        setFields(data)
        setSelected(data.border[0]._id)
        cookies.set("selected",data.border[0]._id, {
          sameSite: "None",
          secure: true
        })
        cookies.set("layer", 0 , {
          sameSite: "None",
          secure: true
        })
      }).catch(error=>console.log(error.message))  // todo
      .finally(()=>setLoading(false))
    }
    getFields()
  },[])

  return (
    <>
      {loading && (
        <Dimmer active>
          <Loader size='huge'>Rendering palette ... </Loader>
        </Dimmer>
      )}
      { fieldsRef.current && !loading &&
        (<>
          <div className="palette">
            <PaletteLayer layer={layer} handleClick={handleClickLayer} />
            <div>
              <PaletteField field={fieldsRef.current.border[0]} selected={selected} handleClick={handleClickSelected} />
              <div className={`field ${selected==="cl1"? "selected" : ""}`} onClick={()=>handleClickSelected("cl1")}><Icon name="minus" size="large"/></div>
              <div className={`field ${selected==="cl+"? "selected" : ""}`} onClick={()=>handleClickSelected("cl+")}><Icon name="erase" size="large"/></div>
              <div className={`field ${selected==="clall"? "selected" : ""}`} onClick={()=>handleClickSelected("clall")}><Icon name="trash alternate outline" size="large"/></div>
            </div>
            <div>
              { fieldsRef.current.forests.map((f,i)=> ( <PaletteField key={i} field={f} selected={selected} handleClick={handleClickSelected} />)) }
            </div>
            <div>
              { fieldsRef.current.plains.map((f,i)=>( <PaletteField key={i} field={f} selected={selected} handleClick={handleClickSelected} />)) }
            </div>
            <div>
              { fieldsRef.current.shores.map((f,i)=>( <PaletteField key={i} field={f} selected={selected} handleClick={handleClickSelected} />)) }
            </div>
            <div>
              { fieldsRef.current.water.map((f,i)=>( <PaletteField key={i} field={f} selected={selected} handleClick={handleClickSelected} />)) }
            </div>
          </div>
        </>)
      }
    </>
  )
}
 
export default Palette