const AldenorBorderBox = ({children, box}) => {
  return (
    <>
      <div className={`border-box-${box}`}>{children}</div>
    </>
  )
}
 
export default AldenorBorderBox