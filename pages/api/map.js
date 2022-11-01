import connectDB from "../../utils/connectDB"
import MapField from "../../models/MapField"

connectDB()

export default async function ApiMap(req, res) {
  switch(req.method) {
    case "POST":
      await handlePostRequest(req, res)
      break
    default:
      res.status(405).send(`Method ${req.method} not allowed!`)
      break
  }
}

const handlePostRequest = async (req, res) => {
  const { x, y } = req.body 
  let newMap = new Array( y )
  const border = await MapField.findOne({ imageSrc: "img\\Map\\border.png" })
  for(var i = 0; i < y; i++) {
    newMap[i] = new Array( x )
    for(var j = 0; j < x; j++) {
      if(i === 0 || j === 0 || j+1 === x || i+1 === y ) // border
        newMap[i][j] = border
      else {
        let top = newMap[i-1][j]
        let left = newMap[i][j-1]
        let intersection = top.bottom.filter(e => left.right.includes(e) && e!=border)
        if(i+2 === y)
          intersection = intersection.filter(e => border.top.includes(e))
        if(j+2 === x)
          intersection = intersection.filter(e => border.left.includes(e))
        let randomNumber = Math.floor(Math.random()*intersection.length)
        let randomField = intersection[randomNumber]
        newMap[i][j] = intersection.length !==0 ? await MapField.findOne({ _id: randomField }) : border
      }
    }
  }
  res.status(200).json(newMap)
}