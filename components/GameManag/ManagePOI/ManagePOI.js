import React from "react"
import baseUrl from "../../../utils/baseUrl"
import CreateNewPoi from "./CreateNewPoi"
import PoiList from "./PoiList"
import cookies from "js-cookie"

const ManagePOI = () => {
  const [poiList, setPoiList] = React.useState([])

  React.useEffect(()=>{
    getPoiList()
  },[])

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
      <CreateNewPoi getPoiList={getPoiList} />
      <PoiList poiList={poiList} />
    </>
  )
}
 
export default ManagePOI