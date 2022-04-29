const express = require('express')
const app = express()

const admin = require('firebase-admin')
const { regexpToText } = require('nodemon/lib/utils')
const credentials = require('./key.json')

admin.initializeApp({
    credential: admin.credential.cert(credentials)
})

app.use(express.json())

app.use(express.urlencoded({extended: true}))

// Create
app.post('/create', async (req, res) => {
    try {
        const id = req.body.email
        const userJson = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }
        const response = await db.collection('users').add(userJson)
    } catch(error) {
        res.send(error)
    }
})

// End of Create

// Read All
app.get('/read/all', async (req, res) => {
    try {
        const usersRef = db.collection('users')
        const response = await usersRef.get()
        let responseArr = []
        response.forEach(doc => {
            responseArr.push(doc.data())
        })
        res.send(responseArr)
    } catch(error) {
        res.send(error)
    }
})

// End of Read

// End of Create

// Read Single Data
app.get('/read/:id', async (req, res) => {
    try {
        const userRef = db.collection('users').doc(req.params.id)
        const response = await userRef.get()
        res.send(response.data())
    } catch(error) {
        res.send(error)
    }
})

// End of Read Single Data

// Update Single Data
app.post('/update/', async (req, res) => {
    try {
        const id = req.body.id 
        const newFirstName = 'Test'
        const email = 'test@gmail.com'
        const userRef = await db.collection('users').doc(id)
        .update({
            firstName: newFirstName,
            email: email,
            lastName: "Test"
        })
        // const response = await userRef.get()
        res.send(response)
    } catch(error) {
        res.send(error)
    }
})

// End of Update Single Data

// Delete data
app.delete('/delete/:id', async (req, res) => {
    try {
        const response = await db.collection('users').doc(req.params.id).delete()
        res.send(response)
    } catch(error) {
        res.send(error)
    }
})
// End of Delete data


const db = admin.firestore()

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is up and running on PORT: ${PORT}.`);
})