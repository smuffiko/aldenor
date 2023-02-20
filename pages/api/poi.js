import connectDB from "../../utils/connectDB"

connectDB()

export default async function ApiPoi(req, res) {
  switch(req.method) {
    case "GET":
      await handleGetRequest(req, res)
      break
    default:
      res.status(405).send(`Method ${req.method} not allowed!`)
      break
  }
}

const handleGetRequest = async (req, res) => {
  
}