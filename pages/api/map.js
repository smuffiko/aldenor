import connectDB from "../../utils/connectDB"
import MapField from "../../models/MapField"

connectDB()

export default async function ApiLogin(req, res) {
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
  const mapFields = MapField.find()
  let newMap = new Array( y )
  for(var i = 0; i < y; i++) {
    newMap[i] = new Array( x )
    for(var j = 0; j < x; j++) {
      newMap[i][j] = nextMapField(i,j,x,y,newMap)
    }
  }
  res.status(200).json(newMap)
}

const nextMapField = (x, y, cols, rows, map) => {
  if(x === 0 || y === 0 || y + 1 === cols || x + 1 === rows)  // borders
    return 0
  return 1  
  /*
  const left = map[x][y-1]
  const top = map[x-1][y]

  const possibleRight = mapFields[left].right
  const possibleBottom = mapFields[top].bottom

  const intersection = possibleRight.filter(e => possibleBottom.includes(e));

  const randomField = Math.floor(Math.random() * (intersection.length -1 ) + 1)


  return randomField*/
}