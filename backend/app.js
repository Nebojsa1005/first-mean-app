const express = require('express')

const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    next()
})

app.use('/api/posts', (req, res) => {
    const posts = [
        {
            id: '12341',
            title: 'First Server-side post',
            content: 'This is a post'
        },
        {
            id: '5434RASD',
            title: 'Second Server-side post',
            content: 'This is a post!'
        },
    ]
    res.status(200).json({
        message: 'Posts fetched successfully',
        posts,
    })
})

module.exports = app