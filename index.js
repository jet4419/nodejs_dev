import { initializeApp } from 'firebase/app';

const express = require('express')
const cors = require('cors')
const Users = require('./config.js')
const PORT = 4000

const app = express()
app.use(express.json())
app.use(cors())

app.post('/create', async(req, res) => {
    const data = req.body
    console.log('Data of user:', data) 
    // await Users.add(data)
    res.send({msg: 'User Added'})
})

app.listen(4000, () => console.log('Up & Running on '))


const firebaseConfig = {
    apiKey: "AIzaSyBR1hlggO_rWaYFcmMdsXP2G4GHgQs2EYk",
    authDomain: "restful-29d27.firebaseapp.com",
    projectId: "restful-29d27",
    storageBucket: "restful-29d27.appspot.com",
    messagingSenderId: "280447407961",
    appId: "1:280447407961:web:bee4f254e3332910be1e48",
    measurementId: "G-43EBT8DQFY"
};