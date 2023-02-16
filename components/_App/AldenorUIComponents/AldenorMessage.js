import AldenorBorderBox from "./AldenorBorderBox"

const AldenorMessage = ({ children, box = "basic", visible = true, style, className }) => {
  return (
    <>
      {visible && (
        <div className={`message ${className}`} style={style}>
          <AldenorBorderBox box={box}>{children}</AldenorBorderBox>
        </div>
      )}
    </>
  )
}
 
export default AldenorMessage