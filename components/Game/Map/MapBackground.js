import Map from "./Map"

const MapBackground = ({ character }) => {
  return (
    <>
      <div className="game-map">
        <Map character={character} />
      </div>
    </>
  )
}
 
export default MapBackground