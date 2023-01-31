const AldenorListItem = ({children, onClick, onMouseLeave, onMouseOver}) => {
  return (
    <>
      <div className="list-item" onClick={onClick} onMouseLeave={onMouseLeave} onMouseOver={onMouseOver}>{children}</div>
    </>
  )
}
 
export default AldenorListItem