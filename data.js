const { response } = require('express')
const express = require('express')
const Mongodb = require('mongodb').MongoClient
const uri = 'mongodb+srv://splay1494:FptQEfMN3l7oEyXe@cluster0.6dvymxk.mongodb.net/?retryWrites=true&w=majority'
const router = express.Router()


Mongodb.connect(uri, (err,db) => {
    let dbo = db.db('mydb')
    
    router.get('/books', (req, res) => {
        dbo.collection('books').find({}).toArray( (err,result) => {
            res.send(result)
        })
    })

    router.get('/books/:id', (req,res) => {
        dbo.collection('books').find({_id: +req.params.id}).toArray( (err,result) => {
            if(result.length === 0) return res.status(404).send('book does not exist')

            res.send(result)
        })
    })

    router.post('/:id', (req,res) => {
        console.log(req.body)
        
        dbo.collection('books').find({_id: +req.params.id}).toArray( (err,result) => {
           console.log(result)
            if(result === 0) return res.send("Book alredy exists")

            dbo.collection('books').insertOne(req.body, (e,r) => {
                res.send("book added").status(200)
            })
        })
    })


    router.put('/:id', (req,res) => {
        
        dbo.collection('books').find({ _id: +req.params.id}).toArray((err, result) => {
            
            if (result.length === 0) return res.status(404).send('book does not exist')
            const query = {_id: req.params._id}

            const newValues = {$set: req.body}

            dbo.collection('books').updateOne(query,newValues, (err,re) => {
                    res.send("book changed").status(200)
            })
        })
    })


    router.delete('/:id', (req,res) => {
        dbo.collection('books').find({ _id: +req.params.id }).toArray((err, result) => {
            if (result.length === 0) return res.status(404).send('book does not exist')
            
            dbo.collection('books').deleteOne(req.body, (e,r) => {
                res.send("book deleted").status(200)
            })

        })
    })
})

module.exports = router
