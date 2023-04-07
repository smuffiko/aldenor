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
  const { charId } = jwt.verify(
    req.headers.authorization,
    process.env.JWT_SECRET
  )
  const user = await Character.findOne({ _id: charId })
  if (user.role!=="root") {
    res.status(401).send("Not authorized.")
  } else { // we are authorized
    const { map } = req.query
    if(map) {
      const pois = await POI.distinct("fields.field") // show all POI fields
      const fields = await MapField.find({
        mapId: map,
        layer: { $gt: 5 },
        _id: {
          "$nin": pois  // show all free POI fields at current map
        }
      })
      res.status(200).send(fields)
    } else { // find all pois
      const pois = await POI.aggregate([
        {
          $lookup: {    // search all fields from MapFields and join to POIs (pass its data like coords etc)
            from: "mapfields",
            localField: "fields.field",
            foreignField: "_id",
            as: "fields"
          }
        },
        {
          $lookup: {    // get infos form map (like name mostly)
            from: "maps",
            localField: "fields.mapId",
            foreignField: "_id",
            as: "map"
          }
        },
        {
          $group: {  // group by _id, fields, name, map (+ toLower sort)
            _id: "$_id",
            fields: { "$first": "$fields" },
            name: { "$first": "$name" },
            nameToLower: { "$first": { $toLower: "$name" } },
            mapId: { "$first": { "$arrayElemAt": ["$map._id", 0] } },
            map: { "$first": { "$arrayElemAt": ["$map.name", 0] } },
            mapToLower: { "$first": { $toLower: { "$arrayElemAt": ["$map.name", 0] } } }
          }
        },
        {
          $sort: {  // sort by map, then by name
            mapToLower: 1,
            nameToLower: 1
          }
        },
        {
          $project: { // show all except toLower 
            mapToLower: 0,
            nameToLower: 0
          }
        }
      ])
      res.status(200).send(pois)
    }
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


const handlePutRequest = async (req, res) => {
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
    const { fields, name, jobs, _id } = req.body
    const poi = await POI.findOneAndUpdate({_id},{
      $set: {
        name: name,
        jobs: jobs,
        fields: fields
      }
    }, {
      returnDocument: "after"
    })
    const updatedPoi = await POI.aggregate([
      {
        $match: { _id: poi._id }
      },
      {
        $lookup: {
          from: "mapfields",
          localField: "fields.field",
          foreignField: "_id",
          as: "fields"
        }
      },
      {
        $lookup: {
          from: "maps",
          localField: "fields.mapId",
          foreignField: "_id",
          as: "map"
        }
      },
      {
        $project: {
          _id: "$_id",
          fields: "$fields",
          name: "$name",
          mapId: { "$arrayElemAt": ["$map._id", 0] },
          map: { "$arrayElemAt": ["$map.name", 0] },
        }
      }
    ])
      
    res.status(200).json({poi: updatedPoi[0] })
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
  const user = await Character.findOne({ _id: charId })
  if (user.role!=="root") {
    res.status(401).send("Not authorized.")
  } else { // we are authorized
    const { _id } = req.query
    
    await POI.deleteOne({ _id })

    res.status(200).send("Poi deleted")
  }
}