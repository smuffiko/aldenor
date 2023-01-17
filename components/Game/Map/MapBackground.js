import styles from "../../../styles/Game.MapBackground.module.css"
import Map from "./Map"

const MapBackground = ({ character }) => {
  return (
    <>
      <div className={styles.mapBackground}>
        <Map character={character} />
      </div>
    </>
  )
}
 
export default MapBackground