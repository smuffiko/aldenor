import styles from "../../../styles/AldenorUI/AldenorUI.module.css"

const AldenorButton = ({ children, onClick, style, button }) => {
  return (
    <>
      <div className={styles[button ? `button${button}` : `button${Math.floor(Math.random()*4+1)}`]}><button type="button" onClick={()=>onClick ? onClick() : null} style={style}>{children}</button></div>
    </>
  )
}
 
export default AldenorButton