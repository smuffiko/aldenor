import Router from "next/router"
import MapBackground from "./Map/MapBackground"

const Play = ({ character }) => {
  return (
    <>
      <MapBackground character={character} />
    </>)
}
 
export default Play