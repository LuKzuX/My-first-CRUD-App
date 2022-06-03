const model = require('../models/schema')
const wrapper = require('../middleware/wrapper')
const { createCustomError } = require('../errors/customError')

const getTasks = wrapper(async (req, res) => {
   const tasks = await model.find({})
   res.json({ tasks })
})

const getTask = wrapper(async (req, res, next) => {
   const task = await model.findOne({ _id: req.params.id })
   if (!task) {
      return next(createCustomError('No task with this id', 404))
   }
   res.json({ task })
})

const postTask = wrapper(async (req, res) => {
   const newTask = await model.create(req.body)
   res.json({ newTask })
})

const updateTask = wrapper(async (req, res) => {
   const updatedTask = await model.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true
   })
   if (!updatedTask) {
      return next(createCustomError('No task with this id', 404))
   }
   res.json(updatedTask)
})

const deleteTask = wrapper(async (req, res) => {
   const deletedTask = await model.findOneAndDelete({ _id: req.params.id })
   if (!deletedTask) {
      return next(createCustomError('No task with this id', 404))
   }
   res.json({ deletedTask })
})

module.exports = { getTasks, getTask, postTask, updateTask, deleteTask }