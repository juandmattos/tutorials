import mongoose from 'mongoose'

const urlPattern = new RegExp('^https?:\\/\\/' + // protocol
'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
'(\\#[-a-z\\d_]*)?$', 'i')

const tutorialSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  videoUrl: { type: String, match: urlPattern },
  description: String,
  publishedStatus: { type: String, required: true },
  isDeleted: Boolean,
  deletedAt: Date,
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
})

const tutorialModel = mongoose.model('Tutorial', tutorialSchema)

export default tutorialModel
