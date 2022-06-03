const express = require('express')
const router = express.Router()
const { getTasks, getTask, postTask, updateTask, deleteTask } = require('../functions/functions')

router.get('/', getTasks)
router.get('/:id', getTask)
router.post('/', postTask)
router.patch('/:id', updateTask)
router.delete('/:id', deleteTask)

module.exports = router