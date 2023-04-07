import React from "react"
import baseUrl from "../../../utils/baseUrl"
import CreateNewPoi from "./CreateNewPoi"
import PoiList from "./PoiList"
import cookies from "js-cookie"
import UpdatePoi from "./UpdatePoi"

const ManagePOI = () => {
  const [poiList, setPoiList] = React.useState([])
  const [updatePoi, setUpdatePoi] = React.useState(false)

  React.useEffect(()=>{
    getPoiList()
  },[])

  React.useEffect(()=>{
    getPoiList()
  },[updatePoi])


  const getPoiList = async ()=>{
    const url = `${baseUrl}/api/pois`
    const token = cookies.get("charId")
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
      setPoiList(data)
    }).catch(error => {
      console.log(error.mesage) // todo
    })
  }

  return (
    <>
      { updatePoi ? (
        <>
          <UpdatePoi poi={updatePoi} setUpdatePoi={setUpdatePoi} />
        </>
      ):(
        <>
          <CreateNewPoi getPoiList={getPoiList} />
          <PoiList poiList={poiList} getPoiList={getPoiList} setUpdatePoi={setUpdatePoi}/>
        </>
      )}
    </>
  )
}
 
export default ManagePOI