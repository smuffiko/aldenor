import AldenorDropdown from "./AldenorUIComponents/AldenorDropdown"
import AldenorDropdownItem from "./AldenorUIComponents/AldenorDropdownItem"

const MainMenu = () => {
  return (
    <>
      <AldenorDropdown title="Game">
        <AldenorDropdownItem>
          Shop
        </AldenorDropdownItem>
        <AldenorDropdownItem>
          Social
        </AldenorDropdownItem>
      </AldenorDropdown>
    </>
  )
}
 
export default MainMenu