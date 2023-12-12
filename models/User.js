const mongoose = require('mongoose')

const userSchmea = mongoose.Schema({
    username : {
        type: String,
        require:[true , 'User must have username'] ,
        unique : true
    },
    password : {
        type: String,
        require:[true , 'User must have username'] ,
    },
})

module.exports = mongoose.model("User",userSchmea)
