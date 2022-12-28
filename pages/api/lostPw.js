import connectDB from "../../utils/connectDB"
import User from "../../models/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

connectDB()

export default async function ApiLostPw(req, res) {
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
    default:
      res.status(405).send(`Method ${req.method} not allowed!`)
      break
  }
}

const handleGetRequest = async(req, res) => {
  const { hash } = req.query
  const user = await User.findOne({emailHash : hash})
  if(user) return res.status(200).json(user)
  else return res.status(404).send("No user found") // todo?
}

const handlePostRequest = async(req, res) => {  
  const { loginOrEmail } = req.body

  // find user by login or email
  const user = await User.findOne({$or: [{login: loginOrEmail.toLowerCase()}, {email: loginOrEmail.toLowerCase()}] })
  // if no login or email exists, write this message
  if (!user) {
    return res.status(404).send("This user does not exist.")
  }
  // set at, dot positions
  const at = user.email.indexOf("@")
  const dot = user.email.lastIndexOf(".")
  // set count of stars
  const firstStars = at > 3 ? "*".repeat(at-2) : ""
  const secondStars = dot - at > 4 ? "*".repeat(dot-at-3) : ""
  // set email with stars
  const secureEmail = user.email.slice(0,2) + firstStars + user.email.slice(at,at+2) + secondStars + user.email.slice(dot-1)
  // emailHash for reset password
  const emailHash = await bcrypt.hash(user.email + user.login + user.updatedAt, 4)
  // save emailHash to DB
  await User.findOneAndUpdate({ _id: user._id }, { $set: { emailHash } } )
  // send data to client
  return res.status(200).json({ login: user.login, email: user.email, emailHash, secureEmail })
}

const handlePutRequest = async(req, res) => {
  const { emailHash, password } = req.body
  // hash password
  const pwHash = await bcrypt.hash(password, 13)
  // set new password to DB, remove email hash
  const user = await User.findOneAndUpdate({ emailHash }, { $set: { password: pwHash }, $unset: { emailHash: "" }})
  if(user) {
    // get new user token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
    return res.status(200).json({token})
  } else {
    return res.status(401).send("Wrong URL data") // todo? change text
  }
}