import AldenorBorderBox from "./AldenorBorderBox"

const AldenorMessage = ({ children, box, visible, style, className }) => {
  return (
    <>
      {( visible===undefined || visible!=false) && (
        <div className={`message ${className}`} style={style}>
          <AldenorBorderBox box={box}>{children}</AldenorBorderBox>
        </div>
      )}
    </>
  )
}
 
export default AldenorMessage