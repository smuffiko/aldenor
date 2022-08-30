import Character from "../../models/Character"
import User from "../../models/User"
import jwt from "jsonwebtoken"
import connectDB from "../../utils/connectDB"

connectDB()

export default async function ApiAccount(req, res) {
  switch (req.method) {
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
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token.")
  }
  const { userId } = jwt.verify(
    req.headers.authorization,
    process.env.JWT_SECRET
  )
  const { _id } = req.query
  if(_id) { // get one character by id
    const character = await Character.findOne({ owner: userId, _id })
    if(character)
      return res.status(200).json(character)
    else
      return res.status(404).send("Character not found.")
  } else { // get all characters
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
}

const handlePostRequest = async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token.")
  }
  // get payload and user id from token
  const { slot, skin, name, race } = req.body
  const index = slot-1
  const { userId } = jwt.verify(
    req.headers.authorization,
    process.env.JWT_SECRET
  )

  // verify name
  // name length
  if(name.length < 5 || name.length > 30)
    return res.status(422).send("Name must be between 5 and 30 chars long.")
  // name characters
  if(!name.match(/^[a-zA-Z0-9]+$/))
    return res.status(422).send("Name can contain only english alphabet characters and numbers.")
  // does name exists
  if(await Character.findOne({ name }))
    return res.status(422).send("This name already exists.")

  // create new character and save to db
  const newCharacter = await new Character({
    owner: userId,
    name,
    skin,
    race
  }).save()
  // add character id to user slot
  await User.findOneAndUpdate({ _id: userId }, { $set: { [`characters.${index}.character`]: newCharacter._id } } )

  return res.status(200).json(newCharacter)
}