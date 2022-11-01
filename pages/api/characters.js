import Character from "../../models/Character"
import User from "../../models/User"
import jwt from "jsonwebtoken"
import connectDB from "../../utils/connectDB"

connectDB()

export default async function ApiCharacters(req, res) {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res)
      break
    default:
      res.status(405).send(`Method ${req.method} not allowed!`)
      break
  }
}

const handleGetRequest = async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token.")
  }
  const { userId } = jwt.verify(
    req.headers.authorization,
    process.env.JWT_SECRET
  )
  // get all characters
  const user = await User.findOne({ _id: userId }).populate({
    path: "characters.character",
    model: "Character"
  })
  const characters = user.characters
  if (characters)
    return res.status(200).json(characters)
  else
    return res.status(404).send("You don't have any character yet.")
}