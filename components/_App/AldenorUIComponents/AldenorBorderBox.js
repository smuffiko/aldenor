const AldenorBorderBox = ({children, box, className}) => {
  return (
    <>
      <div className={`border-box-${box} ${className}`}>{children}</div>
    </>
  )
}
 
export default AldenorBorderBox