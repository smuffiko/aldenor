import connectDB from "../../utils/connectDB"
import Character from "../../models/Character"
import jwt from "jsonwebtoken"
import MapField from "../../models/MapField"
import POI from "../../models/POI"

connectDB()

export default async function ApiPois(req, res) {
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
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token.")
  }
  const { charId } = jwt.verify(
    req.headers.authorization,
    process.env.JWT_SECRET
  )
  const user = await Character.findOne({ _id: charId })
  if (user.role!=="root") {
    res.status(401).send("Not authorized.")
  } else { // we are authorized
    const { map } = req.query
    // A = poi
    const pois = await POI.distinct("fields.field") // show all POI fields
    const fields = await MapField.find({
      mapId: map,
      layer: { $gt: 5 },
      _id: {
        "$nin": pois  // show all free POI fields at current map
      }
    })
    res.status(200).send(fields)
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
  const user = await Character.findOne({ _id: charId })
  if (user.role!=="root") {
    res.status(401).send("Not authorized.")
  } else { // we are authorized
    const { fields, name, jobs } = req.body
    const cFields = fields.map(f=>({field: {_id: f}}))
    const newPOI = await new POI({
      fields: cFields,
      name,
      jobs
    }).save()

    res.status(200).send("Poi saved")
  }
}