import styles from "../../../styles/AldenorUI/AldenorDropdown.module.css"
import AldenorButton from "./AldenorButton"
const AldenorItem = ({ children, onClick, style }) => {
  return (
    <>
    <div className={`${styles.dropdownTitle} ${styles[`panel${Math.floor(Math.random()*3+1)}`]}`}><AldenorButton onClick={onClick} style={style}>{children}</AldenorButton></div>
    </>
  )
}
 
export default AldenorItem