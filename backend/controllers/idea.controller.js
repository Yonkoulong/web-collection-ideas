//require model
const IdeaModel = require("../models/idea.model");
const ReactionModel = require("../models/reaction.model")
const DepartmentModel = require("../models/department.model");
const campaignModel = require("../models/campaign.model");
// select idea có reation nhiều nhất
const getIdeaPopular = async (req, res) => {
  try {
    let departmentId = req.body?.departmentId
    let campaign = await campaignModel.find({ departmentId: departmentId })
    let authorReaction
    if (departmentId != null) {
      let campaignArr = []
      let ideaArr = []
      campaign.forEach(element => {
        campaignArr.push(element._id)
      });
      let idea = await IdeaModel.find({ campaignId: { $in: campaignArr } })
      idea.forEach(element => {
        ideaArr.push(element._id)
      });
       authorReaction = await ReactionModel.aggregate([
        { $match: { type: 1, ideaId: { $in: ideaArr } } },
        { $group: { _id: { ideaId: '$ideaId' }, ideaCount: { $push: "$ideaId" } } },
        { $project: { _id: '$_id.ideaId', count: { $size: "$ideaCount" } } },
        { $sort: { count: -1 } },
        { $limit: 3 }

      ]);
     
    } else {
        authorReaction = await ReactionModel.aggregate([
        { $match: { type: 1} },
        { $group: { _id: { ideaId: '$ideaId' }, ideaCount: { $push: "$ideaId" } } },
        { $project: { _id: '$_id.ideaId', count: { $size: "$ideaCount" } } },
        { $sort: { count: -1 } },
        { $limit: 3 }

      ]);
    }
    response = {
      'status': 'Get idea most reaction',
      'data': authorReaction
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json(error.message)
  }

}
const getIdeas = async (req, res) => {
  try {
    let campaignId = req.body?.departmentId
    if (campaignId == null) {
      let ideas = await IdeaModel.find({})
      response = {
        'status': 'Get idea by campaign success',
        'data': ideas
      }
      res.status(200).json(response)
    }
    else {
      let ideas = await IdeaModel.find({ campaignId: campaignId })
      if (ideas) {
        response = {
          'status': 'Get idea by campaign success',
          'data': ideas
        }
        res.status(200).json(response)
      }
    }
  } catch (error) {
    res.status(500).json(err.message)
  }

}
const getIdeaFilter = async (req, res) => {
  try {
    let filter = req.body.filter
    let ideaFilter = await IdeaModel.find({ "content": { $regex: `${filter}` } })
    if (ideaFilter) {
      response = {
        'status': `Get idea filter by ${filter} success`,
        'data': ideaFilter
      }
      res.status(200).json(response)
    }
  } catch (error) {
    res.status(500).json(err.message)
  }
}
const postIdea = async (req, res) => {
  let content = req.body.content
  let authorId = req.id
  let campaignId = req.body.campaignId
  let categoryId = req.body.categoryId
  let enonymously = (req.body.enonymously === 'true') ? true : false
  let response
  IdeaModel.create({
    content: content,
    authorId: authorId,
    campaignId: campaignId,
    categoryId: categoryId,
    enonymously: enonymously
  }).then(data => {
    response = {
      'status': 'Upload new idea success',
      'data': data
    }
    res.status(200).json(response)
  })
    .catch(err => {
      res.status(500).json(err.message)
    })
}
const putIdea = async (req, res) => {
  let id = req.params.id
  let newContent = req.body.content
  let enonymously = req.body.enonymously
  let response
  IdeaModel.findByIdAndUpdate(id, {
    content: newContent,
    enonymously: enonymously
  }).then(data => {
    response = {
      'status': 'Update idea success',
      'data': data
    }
    res.status(200).json(response)
  }).catch(err => {
    res.status(500).json(err.message)
  })
}
const postView = async (req, res) => {
  try {
    let id = req.body.id
    let viewerId = req.id
    let response
    let idea = await IdeaModel.findOne({ _id: id }).populate()
    if (idea) {
      if (idea.viewer.includes(viewerId)) {
        response = {
          'status': 'Account has already view this idea',
          'code': 103
        }
        res.status(200).json(response)
      }
      else {
        let updateIdea = await IdeaModel.updateOne(
          { _id: id },
          { $push: { viewer: viewerId } }
        )
        response = {
          'status': 'Account view success',
        }
        res.status(200).json(response)
      }
    }
  } catch (error) {
    res.status(500).json(error.message)
  }
}
module.exports = [
  {
    method: "get", //define method http
    controller: getIdeas, //this is method handle when have request on server
    route: "/idea", //define API
  },
  {
    method: "get", //define method http
    controller: getIdeaFilter, //this is method handle when have request on server
    route: "/idea/filter", //define API
  },
  {
    method: "get", //define method http
    controller: getIdeaPopular, //this is method handle when have request on server
    route: "/idea/MostReaction", //define API
  },
  {
    method: "put", //define method http
    controller: putIdea, //this is method handle when have request on server
    route: "/idea/:id", //define API
  },
  {
    method: "post", //define method http
    controller: postIdea, //this is method handle when have request on server
    route: "/idea", //define API
  },
  {
    method: "post", //define method http
    controller: postView, //this is method handle when have request on server
    route: "/view", //define API
  },

]
