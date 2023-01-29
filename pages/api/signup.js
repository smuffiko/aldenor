import connectDB from "../../utils/connectDB"
import User from "../../models/User"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { isEmail } from "../../utils/email"

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
  if(await User.findOne({ login: login.toLowerCase() }))
    message.push(`This login already exists.`)
  
  /* validate email */
  // does email exists
  if(await User.findOne({ email: email.toLowerCase() }))
    message.push(`This email already exists.`)
  // is email valid
  if(!isEmail(email))
    message.push(`This email is not valid.`)
  
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
  // create default characters
  const characters = [
    {
      character: null,
      available: true
    },    
    {
      character: null,
      available: true
    },
    {
      character: null,
      available: true
    },
    {
      character: null,
      available: false
    },
    {
      character: null,
      available: false
    }
  ]
  // create user
  const newUser = await new User({
    login: login.toLowerCase(),
    email: email.toLowerCase(),
    password: hash,
    characters
  }).save()
  // email hash for confirm account
  const emailHash = await bcrypt.hash(newUser.email + newUser.updatedAt, 5)
  // save email hash to DB
  const { _id } = newUser
  await User.findOneAndUpdate({ _id }, { $set: { emailHash } } )
  // get token
  const token = jwt.sign({ userId: _id }, process.env.JWT_SECRET, { expiresIn: "7d" })
  // get data and send to client
  const data = {
    token,
    login: login.toLowerCase(),
    email: email.toLowerCase(),
    emailHash
  }
  return res.status(201).json(data)
}

const handlePutRequest = async(req, res) => {
  const { confirm } = req.body
  const user = await User.findOneAndUpdate({ emailHash: confirm }, { $set: { role: "user" }, $unset: { emailHash: "" }})
  if(user) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
    return res.status(200).json(token)
  } else {
    return res.status(401).send("Wrong URL data") // todo? change text
  }
}