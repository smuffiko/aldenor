const AldenorButton = ({children, onClick, className = ""}) => {
  return (
    <>
     <button type="button" className={`aldenor-button ${className}`} onClick={onClick}>{children}</button>
    </>
  )
}
 
export default AldenorButton