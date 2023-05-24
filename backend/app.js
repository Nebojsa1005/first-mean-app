const bodyParser = require('body-parser');
const express = require('express');

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    next()
})

app.post('/api/posts', (req, res, next) => {
    const post  = req.body
    console.log(post)
    res.status(201).json({
        message: 'Post added successfully'
    })
})

app.get('/api/posts', (req, res) => {
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