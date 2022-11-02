import AldenorItem from "./AldenorItem"

const AldenorDropdownItem = ({ children, onClick, style }) => {
  return (
    <>
      <AldenorItem onClick={onClick} style={style}>{children}</AldenorItem>
    </>
  )
}
export default AldenorDropdownItem