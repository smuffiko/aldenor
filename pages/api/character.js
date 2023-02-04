import Character from "../../models/Character"
import User from "../../models/User"
import Map from "../../models/Map"
import jwt from "jsonwebtoken"
import connectDB from "../../utils/connectDB"

connectDB()

export default async function ApiCharacter(req, res) {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res)
      break
    case "POST":
      await handlePostRequest(req, res)
      break
    case "DELETE":
      await handleDeleteRequest(req, res)
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
    // set char token
    const charToken = jwt.sign({ charId: _id }, process.env.JWT_SECRET,{ expiresIn: "1d"})
    if(character)
      return res.status(200).json({ character, charToken })
    else
      return res.status(404).send("Character not found.")
  } else { // get one character by token
    const { charToken } = req.query
    const { charId } = jwt.verify(
      charToken,
      process.env.JWT_SECRET
    )
    const character = await Character.findOne({ owner: userId, _id: charId })
    if(character)
      return res.status(200).json({ character })
    else
      return res.status(404).send("Character not found.")
  }
}

const handlePostRequest = async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token.")
  }
  // get payload and user id from token
  const { slot, skin, name, race, gender, hair } = req.body
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
  const regex = new RegExp(["^", name, "$"].join(""), "i")
  if(await Character.findOne({ name: regex }))
    return res.status(422).send("This name already exists.")

  await Map.findOne({name: "Test Island"}) // default map name todo -> change name of default map
  .then(async(defaultMap)=>{
  // create new character and save to db
    const newCharacter = await new Character({
      owner: userId,
      name,
      skin,
      race,
      gender,
      hair,
      "coords.current": {
          x: 4,
          y: 6,
          map: defaultMap._id
        }
    }).save()
    return newCharacter
  }).then(async (newCharacter)=>{
    // set character token
    // find user
    const u = await User.findOne({ _id: userId })
    return { u, newCharacter } 
  }).then(async({u, newCharacter}) =>{
    // add character id to user slot
    await User.findOneAndUpdate({ _id: userId }, { $set: { [`characters.${u.characters.length == 6 ? index - 1 : index}.character`]: newCharacter._id } } )
    return newCharacter
  }).then((newCharacter)=>{
    const charToken = jwt.sign({ charId: newCharacter._id }, process.env.JWT_SECRET,{ expiresIn: "1d"})
    return res.status(200).json({ newCharacter, charToken })
  })
}

const handleDeleteRequest = async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token.")
  }
  const { userId } = jwt.verify(
    req.headers.authorization,
    process.env.JWT_SECRET
  )
  
  const { charToken } = req.query
  const { charId } = jwt.verify(
    charToken,
    process.env.JWT_SECRET
  )

  const user = await User.findOneAndUpdate(
    { _id: userId, "characters.character": charId },
    { $set: { "characters.$.character": null } }  
  )
  const char = await Character.findOneAndUpdate(
    { _id: charId },
    { $set: { active: false } }
  )

  return res.status(201).send("Character killed successfully.")
}