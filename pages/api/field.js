import MapField from "../../models/MapField"
import User from "../../models/User"
import Character from "../../models/Character"
import jwt from "jsonwebtoken"
import connectDB from "../../utils/connectDB"

connectDB()

export default async function ApiField(req, res) {
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
  console.log(user.role)
  if (user.role!=="root") {
    res.status(401).send("Not authorized.")
  } else {
    const { imageSrc } = req.query
    const fields = await MapField.find({ imageSrc })
    res.status(200).json(fields)
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
  } else {
    const { flip, imageSrc, rotation } = req.body
    const newField = await new MapField({
      imageSrc,
      rotation,
      flip
    }).save()
    res.status(200).json(newField)
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
  } else {
    const { direction, value, field, newField } = req.body
    const revDirection = direction === "top" ? "bottom"
      : direction === "bottom" ? "top"
      : direction === "left" ? "right"
      : "left"
    if(value) {
      const found = await MapField.findOne({ _id: field, [direction]: newField })
      if(!found) {
        await MapField.findOneAndUpdate(
          { _id: field },
          { $push: { [direction]: newField }}
        )
        await MapField.findOneAndUpdate(
          { _id: newField },
          { $push: { [revDirection]: field }}
        )
      }
    } else {
      await MapField.findOneAndUpdate(
        { _id: field },
        { $pull: { [direction]: newField }}
      )
      await MapField.findOneAndUpdate(
        { _id: newField },
        { $pull: { [revDirection]: field }}
      )
    }
    const f1 = await MapField.findOne({ _id: field })
    const f2 = await MapField.findOne({ _id: newField })
    res.status(200).json({ f1, f2 })
  }
}

const handleDeleteRequest = async (req, res)=> {
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
  } else {
    const { _id } = req.query
    // delete from DB
    await MapField.findOneAndDelete({ _id })
    // delete from left, top, right, bottom
    await MapField.updateMany(
      { },
      { $pull: { left: _id, top: _id, right: _id, bottom: _id } }
    )
    res.status(200).end()
  }
}