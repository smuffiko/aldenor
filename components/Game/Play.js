import Router from "next/router"

const Play = ({ character }) => {
  return (
    <>
      You are playing with character: {character.name}
    </>)
}
 
export default Play