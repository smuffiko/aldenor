import connectDB from "../../utils/connectDB"
import MapField from "../../models/MapField"
import Character from "../../models/Character"
import Map from "../../models/Map"
import jwt from "jsonwebtoken"

connectDB()

export default async function ApiMap(req, res) {
  switch(req.method) {
    case "GET":
      await handleGetRequest(req, res)
      break
    case "POST":
      await handlePostRequest(req, res)
      break
    default:
      res.status(405).send(`Method ${req.method} not allowed!`)
      break
  }
}

const handleGetRequest = async (req, res) => {
  const { border } = req.query
  if(border) {
    const borderDb = await MapField.findOne({ imageSrc: "img\\Map\\border.png" })
    return res.status(200).json(borderDb)
  } else return res.status(400).send("Not found") // todo
}

const handlePostRequest = async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token.")
  }
  const { charId } = jwt.verify(
    req.headers.authorization,
    process.env.JWT_SECRET
  )
  const character = await Character.findOne({ _id: charId })
  if (character) {
    if(character.role==="root") { // if we are logged with root character
      const { map, name } = req.body
      let arr = []
      for(let i=0; i< map.length; i++)
        arr.push(`coords.${i}._id`)
      const newMap = await new Map({
        name,
        coords: map
      }).save().then((t)=>
        t.populate({
          path: arr.join(" "),
          model: "MapField"
        })
      )
      res.status(200).json(newMap)
    } else { // if root is not logged
      res.status(401).send("Unauthorized.")
    }
  } else {
    res.status(404).send("Character not found.")
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
}
