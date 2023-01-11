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
    for(var j = 0; j < x; j++) newMap[i][j] = border
  }
  res.status(200).json(newMap)
}