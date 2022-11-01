import MapField from "../../models/MapField"
import User from "../../models/User"
import PublicFile from "../../models/PublicFile"
import jwt from "jsonwebtoken"
import connectDB from "../../utils/connectDB"

connectDB()

export default async function ApiFields(req, res) {
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
  const user = await User.findOne({ _id: userId })
  if (user.role!=="root") {
    res.status(401).send("Not authorized.")
  } else {
    const fields = await MapField.find().sort({ imageSrc: 1, flip: 1, rotation: 1 })  // find all DB fields
    const files = await PublicFile.find().sort({ src: 1 })  // find all public Files
    const filesArrayOfString = files.map(file=> file["src"])  // convert array of object to array of strings (src only)
    res.status(200).json({ fields, files: filesArrayOfString })
  }
}