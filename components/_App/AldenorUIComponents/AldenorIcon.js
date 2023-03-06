const AldenorIcon = ({ name, size = "nm", color = "black" }) => {
  return (
    <i className={`icon icon-${name}-${size}-${color}`} />
  )
}
 
export default AldenorIcon