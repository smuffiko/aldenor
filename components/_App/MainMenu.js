import AldenorDropdown from "./AldenorUIComponents/AldenorDropdown"
import AldenorDropdownItem from "./AldenorUIComponents/AldenorDropdownItem"

const MainMenu = () => {
  return (
    <>
      <AldenorDropdown title="Main">
        <AldenorDropdownItem>
          Settings
        </AldenorDropdownItem>
        <AldenorDropdownItem>
          Logout
        </AldenorDropdownItem>
      </AldenorDropdown>
    </>
  )
}
 
export default MainMenu