import Field from "../../models/Field"
import Character from "../../models/Character"
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
  const { charId } = jwt.verify(
    req.headers.authorization,
    process.env.JWT_SECRET
  )
  const user = await Character.findOne({ _id: charId })
  if (user.role!=="root") {
    res.status(401).send("Not authorized.")
  } else {
    const { generatingMap, map } = req.query
    if(map) {
      const fields = await Field.find()
      res.status(200).json(fields)
    } else if(generatingMap) {
      const fields = await Field.find(
        { },
        { imageSrc: 1, rotation: 1, flip: 1 }
      ).sort({ imageSrc: 1, flip: 1, rotation: 1 })  // find all DB fields

      const forests = fields.filter(f=>f.imageSrc.startsWith("img\\Map\\Forests"))
      const plains = fields.filter(f=>f.imageSrc.startsWith("img\\Map\\Plains"))
      const shores = fields.filter(f=>f.imageSrc.startsWith("img\\Map\\Shores"))
      const water = fields.filter(f=>f.imageSrc.startsWith("img\\Map\\Water"))
      const poi = fields.filter(f=>f.imageSrc.startsWith("img\\POI"))
      const border = fields.filter(f=>f.imageSrc.startsWith("img\\Map\\border"))

      res.status(200).json({ forests, plains, shores, water, poi, border })
    } else {
      const fields = await Field.find(
        { },
        { imageSrc: 1, rotation: 1, flip: 1 }
      ).sort({ imageSrc: 1, flip: 1, rotation: 1 })  // find all DB fields
      const files = await PublicFile.find().sort({ src: 1 })  // find all public Files
      const filesArrayOfString = files.map(file=> file["src"])  // convert array of object to array of strings (src only)
      res.status(200).json({ fields, files: filesArrayOfString })
    }
  }
}