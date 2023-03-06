import CharactersInfo from "../../models/CharactersInfo"
import Character from "../../models/Character"
import connectDB from "../../utils/connectDB"
import jwt from "jsonwebtoken"

connectDB()

export default async function ApiCharactersInfo(req, res) {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res)
      break
    case "POST":
      await handlePostRequest(req, res)
      break
    case "PUT":
      await handlePutRequest(req, res)
      break
    default:
      res.status(405).send(`Method ${req.method} not allowed!`)
      break
  }
}

const handleGetRequest = async (req, res) => {
  const charactersInfo = await CharactersInfo.aggregate([
    { $addFields: { 
        sortIndex: { 
          $switch: {
            branches: [
              { case: { $eq: ["$race", "Human"] }, then: 0 },
              { case: { $eq: ["$race", "Elf"] }, then: 1 },
              { case: { $eq: ["$race", "Dwarf"] }, then: 2 },
              { case: { $eq: ["$race", "Halfling"] }, then: 3 }
            ],
            default: 4
          }
        }
      }
    },
    { $sort: { sortIndex: 1 } },
    { $project: { sortIndex: 0 } }
  ])
  if(charactersInfo) 
    return res.status(200).json(charactersInfo)
  return res.status(404).send("No infos in DB")
}

const handlePostRequest = async (req, res) => {
  // todo authorization
  const charactersInfo = await CharactersInfo.find()
  if(charactersInfo.length === 0) // if DB is empty, set default values
    await CharactersInfo.insertMany([
      {
        race: "Human",
        skins: [
          {
            skin: "Desert"
          },
          {
            skin: "Mountaineer"
          },
          {
            skin: "Plains"
          }
        ]
      },
      {
        race: "Elf",
        skins: [
          {
            skin: "Forest"
          },
          {
            skin: "Mountain"
          },
          {
            skin: "Plains"
          }
        ]
      },
      {
        race: "Dwarf",
        skins: [
          {
            skin: "Dark"
          },
          {
            skin: "Deep"
          },
          {
            skin: "Rock"
          }
        ]
      },
      {
        race: "Halfling",
        skins: [
          {
            skin: "Hills"
          },
          {
            skin: "Meadows"
          },
          {
            skin: "Town"
          }
        ]
      },
    ])
  res.status(200).send("Ok") // todo
}

const handlePutRequest = async (req, res) => {
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
      const { _id, skin, info } = req.body
      if(skin) { // if we updating skin
        await CharactersInfo.findOneAndUpdate({ _id, "skins._id": skin }, { $set: { "skins.$.skinInfo": info }})
        res.status(200).send("Skin info updated")
      } else { // if we updating race
        await CharactersInfo.findOneAndUpdate({ _id }, { $set: { raceInfo: info }})
        res.status(200).send("Race info updated")
      }
    } else { // if root is not logged
      res.status(401).send("Unauthorized.")
    }
  } else {
    res.status(404).send("Character not found.")
  }
}
