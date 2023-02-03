import mongoose from "mongoose"

const { String } = mongoose.Schema.Types

const CharactersInfoSchema = new mongoose.Schema(
  {
    race: {
      type: String,
      required: true
    },
    language: {
      type: String,
      required: true,
      default: "en"
    },
    raceInfo: {
      type: String,
      required: true,
      default: "race info"
    },
    skins: [{
      skin: {
        type: String,
        required: true
      },
      skinInfo: {
        type: String,
        required: true,
        default: "skin info"
      }
    }]
  }
)

export default mongoose.models.CharactersInfo || mongoose.model("CharactersInfo", CharactersInfoSchema)