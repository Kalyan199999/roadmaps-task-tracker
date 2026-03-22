const express = require('express');

const router = express.Router()

const { 
    getAll,
    addtask,
    getBystatus,
    update,
    remove } = require('./controller')

router.get('/' , getAll)

router.post('/add' , addtask )

router.get('/:status' , getBystatus)

router.patch('/update/:id' , update )

router.delete('/delete/:id' , remove );

module.exports = router