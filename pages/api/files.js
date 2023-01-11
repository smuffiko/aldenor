import Character from "../../models/Character"
import PublicFile from "../../models/PublicFile"
import jwt from "jsonwebtoken"
import connectDB from "../../utils/connectDB"
import readDir from "fs-readdir-recursive"

connectDB()

export default async function ApiFiles(req, res) {
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
    const { dir } = req.query
    const files = readDir(`public/${dir}`)
    const newF = files.filter(f=>f.endsWith(".png")).map(f=>`public\\${dir}\\${f}`)

    // find new images at localhost, add its src to DB
    newF.map(async file=>{
      let find = await PublicFile.findOne({ src: file })
      if(!find) await new PublicFile({ src: file }).save()
    })

    // todo -> check all images in DB, if it is not in localhost -> delete from DB recursively
    res.status(200).json({ files: newF })
  }
}