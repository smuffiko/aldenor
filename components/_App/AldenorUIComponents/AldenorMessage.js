import AldenorBorderBox from "./AldenorBorderBox"

const AldenorMessage = ({ children, box, visible, style }) => {
  return (
    <>
      {( visible===undefined || visible!=false) && (
        <div className="message" style={style}>
          <AldenorBorderBox box={box}>{children}</AldenorBorderBox>
        </div>
      )}
    </>
  )
}
 
export default AldenorMessage