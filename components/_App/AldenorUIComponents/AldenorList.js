const AldenorList = ({children, vertical, horizontal, visibility}) => {
  return (
    <>
      <div className={`${vertical ? "vertical" : horizontal ? "horizontal" : ""} ${visibility!==undefined? visibility : ""}`} >{children}</div>
    </>
  )
}
 
export default AldenorList