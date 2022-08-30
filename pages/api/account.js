import User from "../../models/User"
import jwt from "jsonwebtoken"
import connectDB from "../../utils/connectDB"

connectDB()

export default async function ApiAccount(req, res) {
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
  if (user) {
    res.status(200).json(user)
  } else {
    res.status(404).send("User not found.")
  }
}