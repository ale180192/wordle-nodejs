const express = require('express')
const app = express()
const port = 3000

/* tslint:disable no-var-requires */
const sqlite3 = require('sqlite3').verbose();



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})