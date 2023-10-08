const mongoose = require('mongoose');

const scripts = new mongoose.Schema({
    body: {
      type: String,
      default: ""
    },
    header: {
      type: String,
      default: ""
    },
    footer: {
      type: String,
      default: ""
    },
});

const channelsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    channelHash: {
        type: String,
        unique: true,
        required: true
    },
    scripts: scripts,
    createdDate: { 
        type: Date,default: Date.now 
    },
    
}, {timestamps: true})

module.exports = mongoose.model('Channel', channelsSchema)
