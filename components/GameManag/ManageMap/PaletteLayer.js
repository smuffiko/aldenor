import React from "react"
import { Button } from "semantic-ui-react"

const PaletteLayer = ({ layer, handleClick }) => {
  return (
    <>
      <Button.Group className="layers" >
        <Button inverted onClick={()=>handleClick(0)} value={0} className={layer==0 ? "active" : ""} >0</Button>
        <Button inverted onClick={()=>handleClick(1)} value={1} className={layer==1 ? "active" : ""} >1</Button>
        <Button inverted onClick={()=>handleClick(2)} value={2} className={layer==2 ? "active" : ""} >2</Button>
        <Button inverted onClick={()=>handleClick(3)} value={3} className={layer==3 ? "active" : ""} >3</Button>
        <Button inverted onClick={()=>handleClick(4)} value={4} className={layer==4 ? "active" : ""} >4</Button>
        <Button inverted onClick={()=>handleClick(5)} value={5} className={layer==5 ? "active" : ""} >5</Button>
      </Button.Group>
      <span style={{display:"inline-block", width: "1rem"}}></span>
      <Button.Group className="layers">
        <Button inverted onClick={()=>handleClick(6)} value={6} className={layer==6 ? "active" : ""} >6</Button>
        <Button inverted onClick={()=>handleClick(7)} value={7} className={layer==7 ? "active" : ""} >7</Button>
        <Button inverted onClick={()=>handleClick(8)} value={8} className={layer==8 ? "active" : ""} >8</Button>
      </Button.Group>
    </>
  )
}
 
export default PaletteLayer