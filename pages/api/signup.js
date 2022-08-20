import connectDB from "../../utils/connectDB"
import User from "../../models/User"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

connectDB()

export default async function ApiSignup(req, res) {
  switch(req.method) {
    case "POST":
      await handlePostRequest(req, res)
      break
    case "PUT": 
      await handlePutRequest(req, res)
      break
    default:
      res.status(405).send(`Method ${req.method} not allowed!`)
  }
}

const handlePostRequest = async(req, res) => {
  const { login, password, password2, email } = req.body
  let message = new Array()
  
  /* validate login */
  // length
  if(login.length < 5 || login.length > 30)
    message.push(`Login name must be between 5 and 30 chars long.`)
  // characters
  if(!login.match(/^[a-zA-Z0-9]+$/))
    message.push(`Login can contain only english alphabet characters and numbers.`)
  // does login exists
  if(await User.findOne({ login }))
    message.push(`This login already exists.`)
  
  /* validate email */
  // does email exists
  if(await User.findOne({ email }))
    message.push(`This email already exists.`)
  
  /* validate password */
  // if passwords are not same
  if(password !== password2)
    message.push(`Passwords are not same.`)
  // length
  if(password.length < 6)
    message.push(`Password needs to be at least 6 chars long.`)
  
  /* signing up not successfull */
  if(message.length !== 0)
    return res.status(422).send(message.join(" "))
  
  /* signing up successfull */
  // hash password
  const hash = await bcrypt.hash(password, 13)
  // create user
  const newUser = await new User({
    login: login.toLowerCase(),
    email: email.toLowerCase(),
    password: hash
  }).save()
  // email hash for confirm account
  const emailHash = await bcrypt.hash(newUser.email + newUser.updatedAt, 5)
  // get data and send to client
  const { _id } = newUser
  const data = {
    login: login.toLowerCase(),
    email: email.toLowerCase(),
    _id,
    emailHash
  }
  return res.status(201).json(data)
}

const handlePutRequest = async(req, res) => {
  const { confirm, _id } = req.body
  const user = await User.findOne({_id})
  const match = await bcrypt.compare(user.email + user.updatedAt, confirm)
  if(match) {
    if(user.role === "unUser") {
      await User.findOneAndUpdate({_id}, { $set: { role: "user" } })
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
      return res.status(200).json(token)
    } else return res.status(400).send("User email already confirmed") // todo text change
  } else {
    return res.status(401).send("Wrong URL data") // todo? change text
  }
}