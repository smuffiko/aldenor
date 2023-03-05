import UpdatePoi from "./UpdatePoi"

const PoiList = ({ poiList }) => {
  console.log(poiList, "poilist")
  return (  
    <>
      --- *** POI list *** ---

      Map - array of maps
       - POI name array of pois, array of coords, pois fields... CLICK update, CLICK remove POI 
      <UpdatePoi poi={1} />
    </>
  )
}
 
export default PoiList