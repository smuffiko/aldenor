import connectDB from "../../utils/connectDB"
import Character from "../../models/Character"
import Map from "../../models/Map"
import jwt from "jsonwebtoken"

connectDB()

export default async function ApiMaps(req, res) {
  switch(req.method) {
    case "GET":
      await handleGetRequest(req, res)
      break
    default:
      res.status(405).send(`Method ${req.method} not allowed!`)
      break
  }
}

const handleGetRequest = async (req, res) => { // todo check it later
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
      const maps = await Map.find(
        {},
        { name: 1 }
      ).sort({ name: 1 })
      res.status(200).json(maps)
    } else { // if root is not logged
      res.status(401).send("Unauthorized.")
    }
  } else {
    res.status(404).send("Character not found.")
  }
}