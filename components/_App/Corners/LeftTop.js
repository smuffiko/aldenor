import styles from "../../../styles/AldenorUI/AldenorUI.module.css"
import cookies from "js-cookie"
import { Icon } from "semantic-ui-react"

const LeftTop = ({ user }) => {
  const charToken = cookies.get("charId")
  console.log("user: ", user, charToken)
  return (
    <>
      <div className={styles.leftTopMenu}>
        <div className={styles.charInv}>
          <div className={styles.char}>Char</div>
          <div className={styles.inv}><Icon name="suitcase" size="large"/></div>
        </div>
        <div className={styles.bars}>
          <div className={styles.hp}>HP 100/100</div>
          <div className={styles.energy}>Energy 100/100</div>
          <div className={styles.exp}>EXP 100/100</div>
        </div>
      </div>
    </>
  )
}
 
export default LeftTop