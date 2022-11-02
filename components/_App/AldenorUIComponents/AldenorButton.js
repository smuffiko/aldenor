import styles from "../../../styles/AldenorUI/AldenorButton.module.css"

const AldenorButton = ({ children, onClick, style }) => {
  return (
    <>
      <div className={styles[`button${Math.floor(Math.random()*4+1)}`]}><button type="button" onClick={()=>onClick()} style={style}>{children}</button></div>
    </>
  )
}
 
export default AldenorButton