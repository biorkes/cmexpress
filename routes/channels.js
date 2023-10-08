const express = require('express')
const router = express.Router()

const Channel = require('../models/channel');


// GET
router.get('/', async (req, res) => {
    try{
        const channels = await Channel.find()
        res.json(channels)
    } catch(err) {
        res.status(500).json({message:err.message})
    } 
})

//GET ONE
router.get('/:id', getChannel, (req, res) => {
    res.send(res.channel)
})

//CREATE
router.post('/', async (req,res) => {
    const channel = new Channel({
        name: req.body.name,
        channelHash: req.body.channelHash,
        scripts: {
            header:req.body.scripts?.header,
            body:req.body.scripts?.body,
            footer:req.body.scripts?.footer
        }
    })

    try{
        const newChannel = await channel.save()
        res.status(201).json(newChannel)
    } catch(err){
        res.status(400).json({message:err.message})
    }
})

//UPDATE
router.patch('/:id', getChannel, async (req,res) => {
    console.log(req.body)
    if(req.body.name !== null){
        res.channel.name = req.body.name
    }
    if(req.body.hasOwnProperty('channelHash')){
        res.channel.channelHash = req.body.channelHash
    }
    
    try{
        const updatedChannel = await res.channel.save()
        res.json(updatedChannel)
    } catch (err) {
        res.status(400).json({message:err.message})
    }
})

//DELETE
router.delete('/:id', getChannel, async (req,res) => {
    try{
        await res.channel.deleteOne()
        res.json({message:"Deleted Channel"})
    } catch (err) {
        res.status(500).json({message:err.message})
    }
})

async function getChannel(req,res,next){
    let channel
    try{
        channel = await Channel.findById(req.params.id)
        if(channel == null){
            return res.status(404).json({message:'Not found'});
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }

    res.channel = channel
    next()
}

module.exports = router;