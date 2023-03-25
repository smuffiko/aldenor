import connectDB from "../../utils/connectDB"
import MapField from "../../models/MapField"
import Character from "../../models/Character"
import Map from "../../models/Map"
import jwt from "jsonwebtoken"
import { onlyInLeft } from "../../utils/customFunctions"

connectDB()

export default async function ApiMap(req, res) {
  switch(req.method) {
    case "GET":
      await handleGetRequest(req, res)
      break
    case "POST":
      await handlePostRequest(req, res)
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

const handleGetRequest = async (req, res) => { // todo check it later
  const { charId } = jwt.verify(
    req.headers.authorization,
    process.env.JWT_SECRET
  )
  const character = await Character.findOne({ _id: charId })
  if (character) {
    const { _id } = req.query
    const map = await Map.findOne({_id})
    const coords = await MapField.find({ mapId: _id }).populate({
      path: "field",
      model: "Field"
    })
    const newCoords = coords.map(c=>({
      coords: c.coords,
      field: c.field._id,
      mapId: c.mapId,
      layer: c.layer,
      imageSrc: c.field.imageSrc,
      flip: c.field.flip,
      rotation: c.field.rotation
    }))
    res.status(200).json({map, coords: newCoords})
  } else {
    res.status(404).send("Character not found.")
  }
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
      const { name, x, y } = req.body
      const newMap = await new Map({
        name,
        size: {
          x,
          y
        }
      }).save()
      res.status(200).json({ map: newMap, coords: []})
    } else { // if root is not logged
      res.status(401).send("Unauthorized.")
    }
  } else {
    res.status(404).send("Character not found.")
  }
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
      const isSameField = (a, b) => a.field == b.field && a.coords.x == b.coords.x && a.coords.y == b.coords.y

      const { map } = req.body
      const dbFields = await MapField.find({ mapId: map.map._id}) // find all DB fields
      const del = onlyInLeft(dbFields, map.coords, isSameField) // find all fields in DB which is not in map.coords (delete this)
      const add = onlyInLeft(map.coords, dbFields, isSameField) // find all fields which as not in DB but in map.coords (add this)
      const delId = del.map(d=> d._id)  // find IDs of fields to delete

      await MapField.deleteMany({ _id: { $in: delId }})  // delete fields
        .then(async ()=>{                                // then add fields
          await MapField.insertMany(add)   
        .then(async()=>{                                 // then find fields and send to client
          const newFields = await MapField.find({ mapId: map.map._id })
          const newMap = { ...map, coords: newFields }
          res.status(200).json(newMap)            
        })
      }).catch(e=>{
        res.status(500).send("Can't fetch data")
      })

    } else { // if root is not logged
      res.status(401).send("Unauthorized.")
    }
  } else {
    res.status(404).send("Character not found.")
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
  const character = await Character.findOne({ _id: charId })
  if (character) {
    if(character.role==="root") { // if we are logged with root character
      const { _id } = req.query
      await MapField.deleteMany({ mapId: _id })
      await Map.findOneAndDelete({ _id })
      res.status(200).send("Map successfully deleted.")
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
