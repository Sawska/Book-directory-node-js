# Book directory 

This project is made on node.js nad Mongodb.

## Installation

Clone this repository.

```bash
$ git clone https://github.com/Sawska/Book-directory-node-js.git
```
## Requirments
- _Express_
```bash
npm install express 
```
- _Mongodb_
```bash
npm install mongodb
```
- _Body-parser_
```bash
npm install body-parser
```
## MongoDb conection
- _Create account on [MongoDb](https://www.mongodb.com/)_
- _Create a database_
- ***Press Connect*** => ***Connect your aplication*** => ***then copy connection string***
- _Connect MongoDb to your code_
```javascript
const Mongodb =require('mongodb').MongoClient
const uri = 'mongodb+srv://name:<password>@cluster0.6dvymxk.mongodb.net/?retryWrites=true&w=majority'
Mongodb.connect(uri, (err,db) => {
let dbo = db.db('mydb')

})
```
- _Create a collection_
```javascript
dbo.createCollection("books", (err,res) => {

})
```
- _Insert some data_
```javascript
 let myobj = {} // store this some book information
dbo.collection("books").insertOne(myobj, (err, res) => {
  });
```


## License
[MIT](https://choosealicense.com/licenses/mit/)
