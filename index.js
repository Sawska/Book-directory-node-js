const express = require('express')
const router = require('./data')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.get('/main', (req,res) => {
    res.render('main')
})
app.use('/api', router)

const PORT = 3000

app.listen(PORT, () =>  {
    console.log(`http://localhost:${PORT}`)
})
