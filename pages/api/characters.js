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
    case "PUT":
      await handlePutRequest(req, res)
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
  // get all characters
  const user = await User.findOne({ _id: userId }).populate({
    path: "characters.character",
    model: "Character",
    populate: [{
      path: "coords.current.map",
      model: "Map",
      select: "name"
    }]
  })
  const characters = user.characters
  if (characters)
    return res.status(200).json(characters)
  else
    return res.status(404).send("You don't have any character yet.")
}

const handlePutRequest = async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token.")
  }
  const { charId } = jwt.verify(
    req.headers.authorization,
    process.env.JWT_SECRET
  )
  const rootChar = await Character.findOne({ _id: charId })
  if(rootChar.role==="root") { // only root can move any character
    const { owner, character, oldSlot, newSlot, char, newRole } = req.body

    if(char!==undefined) {
      if(newRole!==undefined) {
        const newUser = await Character.findOneAndUpdate(
          { _id: char._id },
          { $set: { role: newRole } }
        )
      } else {
        await User.findOneAndUpdate(
          { [`characters._id`]: char._id},
          { $set : { [`characters.$.available`] : !char.available } }
        )
      }
      return res.status(200).send("Character updated")
    } else {
      
      // delete from old slot
      if(oldSlot!==null) {
        if(oldSlot===5) await User.findOneAndUpdate({ _id: owner },{ $pull: { characters: { character } } } )
        else await User.findOneAndUpdate({ _id: owner }, { $set: { [`characters.${oldSlot}.character`]: null } } )
      } else {
        await Character.findOneAndUpdate({ _id: character }, { $set: { active: true } })
      }

      // add character id to user slot
      if(newSlot!==6) await User.findOneAndUpdate({ _id: owner }, { $set: { [`characters.${newSlot}.character`]: character, [`characters.${newSlot}.available`]: true } } )
      else await User.findOneAndUpdate({ _id: owner },{ $push: { characters: { character: character, available: true } } } )
      return res.status(200).send("Character updated")
    }
  } else {
    return res.status(401).send("Not authorized.")
  }
}

const handleDeleteRequest = async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token.")
  }
  const { charId } = jwt.verify(
    req.headers.authorization,
    process.env.JWT_SECRET
  )
  const rootChar = await Character.findOne({ _id: charId })
  if(rootChar.role==="root") { // only root can delete any character
    const { owner, character, slot } = req.query
    if(slot==5) {
      await User.findOneAndUpdate(
        { _id: owner },
        { $pull: { characters: { character } } } 
      )
      await Character.findOneAndUpdate(
        { _id: character },
        { $set: { active: false } }
      )
    }
    else {
      await User.findOneAndUpdate(
        { _id: owner, "characters.character": character },
        { $set: { "characters.$.character": null } }  
      )
      await Character.findOneAndUpdate(
        { _id: character },
        { $set: { active: false } }
      )
    }
    return res.status(200).send("Character killed.")
  } else {
    return res.status(401).send("Not authorized.")
  }
}