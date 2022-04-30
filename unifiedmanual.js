const express = require('express')
const app = express()
const maxRequestBodySize = '1mb';

const admin = require('firebase-admin')
const { regexpToText } = require('nodemon/lib/utils')
const credentials = require('./key.json')

admin.initializeApp({
    credential: admin.credential.cert(credentials)
})

const db = admin.firestore()

app.use(express.json({limit: maxRequestBodySize}))

app.use(express.urlencoded({limit: maxRequestBodySize, extended: true}))

// start of TrainingWorkbook

// create TrainingWorkbook
app.post('/trainingworkbook/create', async (req, res) => {
    try {
        const twJson = {
            uuid: req.body.uuid,
            module: req.body.module,
            section: req.body.section,
            instructions: req.body.instructions,
            additionalInfo: req.body.additionalInfo,
            passcode: req.body.passcode,
            locked: req.body.locked,
            next: req.body.next,
            questions: req.body.questions
        }
        const response = await db.collection('twb').add(twJson)
        res.send('Data added successfully')
    } catch(error) {
        res.send(error)
    }
})

// read all TrainingWorkbook
app.get('/trainingworkbook/read/all', async (req, res) => {
    try {
        const twbRef = db.collection('twb')
        const response = await twbRef.get()
        const responseArr = []
        response.forEach(doc => {
            responseArr.push(doc.data())
        })
        res.send(responseArr)
    } catch(error) {
        res.send(error)
    }
})

// read single TrainingWorkbook Data
app.get('/trainingworkbook/read/:id', async (req, res) => {
    try {
        const twbRef = db.collection('twb').doc(req.params.id)
        const response = await twbRef.get()
        res.send(response.data())
    } catch(error) {
        res.send(error)
    }
})

// update TrainingWorkbook
app.post('/trainingworkbook/update', async (req, res) => {
    try {
        const id = req.body.id 
        const newPasscode = 'dG9wc2VjcmV0'
        const twbRef = await db.collection('twb').doc(id)
        .update({
            passcode: newPasscode,
        })
        // const response = await userRef.get()
        res.send(`Data was updated successfully`)
    } catch(error) {
        res.send(error)
    }
})

// delete TrainingWorkbook
app.delete('/trainingworkbook/delete/:id', async (req, res) => {
    try {
        const response = await db.collection('twb').doc(req.params.id).delete()
        res.send(response)
    } catch(error) {
        res.send(error)
    }
})

// create twbScore

app.post('/twbscore/create', async (req, res) => {
    try {
        const twbScoreJson = {
            userId: req.body.userId,
            userType: req.body.userType,
            twbId: req.body.twbId,
            name: req.body.name,
            timeStarted: req.body.timeStarted,
            timeEnded: req.body.timeEnded,
            score: req.body.score,
        }
        const response = await db.collection('twbscore').add(twbScoreJson)
        res.send('Data added successfully')
    } catch(error) {
        res.send(error)
    }
})

// read all twbScore
app.get('/twbscore/read/all', async (req, res) => {
    try {
        const twbRef = db.collection('twbscore')
        const response = await twbRef.get()
        const responseArr = []
        response.forEach(doc => {
            responseArr.push(doc.data())
        })
        res.send(responseArr)
    } catch(error) {
        res.send(error)
    }
})

// read single twb Score
app.get('/twbscore/read/:id', async (req, res) => {
    try {
        const twbScoreRef = db.collection('twbscore').doc(req.params.id)
        const response = await twbScoreRef.get()
        res.send(response.data())
    } catch(error) {
        res.send(error)
    }
})

// update twb Score
app.post('/twbscore/update', async (req, res) => {
    try {
        const id = req.body.id 
        const newScore = 98
        const twbRef = await db.collection('twbscore').doc(id)
        .update({
            score: newScore,
        })
        // const response = await userRef.get()
        res.send(`Data was updated successfully`)
    } catch(error) {
        res.send(error)
    }
})

// delete twb Score
app.delete('/twbScore/delete/:id', async (req, res) => {
    try {
        const response = await db.collection('twbscore').doc(req.params.id).delete()
        res.send(response)
    } catch(error) {
        res.send(error)
    }
})
// end of TrainingWorkbook


// start of Codebook

// create Codebook

app.post('/codebook/create', async (req, res) => {
    try {
        const codebookJson = {
            section: req.body.section,
            infos: req.body.infos
        }
        const response = await db.collection('codebook').add(codebookJson)
        res.send('Data added successfully')
    } catch(error) {
        res.send(error)
    }
})

// read all Codebook
app.get('/codebook/read/all', async (req, res) => {
    try {
        const twbRef = db.collection('codebook')
        const response = await twbRef.get()
        const responseArr = []
        response.forEach(doc => {
            responseArr.push(doc.data())
        })
        res.send(responseArr)
    } catch(error) {
        res.send(error)
    }
})

// read single Codebook
app.get('/codebook/read/:id', async (req, res) => {
    try {
        const codebookRef = db.collection('codebook').doc(req.params.id)
        const response = await codebookRef.get()
        res.send(response.data())
    } catch(error) {
        res.send(error)
    }
})

// update Codebook
app.post('/codebook/update', async (req, res) => {
    try {
        const id = req.body.id 
        const newSection = "Section K"
        const codebookRef = await db.collection('codebook').doc(id)
        .update({
            section: newSection,
        })
        // const response = await userRef.get()
        res.send(`Data was updated successfully`)
    } catch(error) {
        res.send(error)
    }
})

// delete Codebook
app.delete('/codebook/delete/:id', async (req, res) => {
    try {
        const response = await db.collection('codebook').doc(req.params.id).delete()
        res.send(response)
    } catch(error) {
        res.send(error)
    }
})
// end of Codebook


// start of Common Occupation

// create Common Occupation
app.post('/commonoccupation/create', async (req, res) => {
    try {
        const coJson = {
            industry: req.body.industry,
            psic: req.body.psic,
            occupation: req.body.occupation,
            psoc: req.body.psoc,
            cow: req.body.cow,
        }
        const response = await db.collection('commonOccupation').add(coJson)
        res.send('Data added successfully')
    } catch(error) {
        res.send(error)
    }
})

// read all Common Occupation
app.get('/commonoccupation/read/all', async (req, res) => {
    try {
        const coRef = db.collection('commonOccupation')
        const response = await coRef.get()
        const responseArr = []
        response.forEach(doc => {
            responseArr.push(doc.data())
        })
        res.send(responseArr)
    } catch(error) {
        res.send(error)
    }
})

// read single Common Occupation
app.get('/commonoccupation/read/:id', async (req, res) => {
    try {
        const coRef = db.collection('commonOccupation').doc(req.params.id)
        const response = await coRef.get()
        res.send(response.data())
    } catch(error) {
        res.send(error)
    }
})

// update Common Occupation
app.post('/commonoccupation/update', async (req, res) => {
    try {
        const id = req.body.id 
        const newOccupation = "fish operator"
        const codebookRef = await db.collection('commonOccupation').doc(id)
        .update({
            occupation: newOccupation,
        })
        // const response = await userRef.get()
        res.send(`Data was updated successfully`)
    } catch(error) {
        res.send(error)
    }
})

// delete Common Occupation
app.delete('/commonoccupation/delete/:id', async (req, res) => {
    try {
        const response = await db.collection('commonOccupation').doc(req.params.id).delete()
        res.send(response)
    } catch(error) {
        res.send(error)
    }
})
// end of Common Occupation


// start of Showcards

// create Showcards

app.post('/showcards/create', async (req, res) => {
    try {
        const showcardsJson = {
            item: req.body.item,
            code: req.body.code,
            label: req.body.label,
            imagePath: req.body.imagePath,
        }
        const response = await db.collection('showcards').add(showcardsJson)
        res.send('Data added successfully')
    } catch(error) {
        res.send(error)
    }
})

// read all Showcard
app.get('/showcards/read/all', async (req, res) => {
    try {
        const showcardsRef = db.collection('showcards')
        const response = await showcardsRef.get()
        const responseArr = []
        response.forEach(doc => {
            responseArr.push(doc.data())
        })
        res.send(responseArr)
    } catch(error) {
        res.send(error)
    }
})

// read single Showcards
app.get('/showcards/read/:id', async (req, res) => {
    try {
        const showcardsRef = db.collection('showcards').doc(req.params.id)
        const response = await showcardsRef.get()
        res.send(response.data())
    } catch(error) {
        res.send(error)
    }
})

// update Showcards
app.post('/showcards/update', async (req, res) => {
    try {
        const id = req.body.id 
        const newCode = "L65_P"
        const codebookRef = await db.collection('showcards').doc(id)
        .update({
            code: newCode,
        })
        // const response = await userRef.get()
        res.send(`Data was updated successfully`)
    } catch(error) {
        res.send(error)
    }
})

// delete Showcards
app.delete('/showcards/delete/:id', async (req, res) => {
    try {
        const response = await db.collection('showcards').doc(req.params.id).delete()
        res.send(response)
    } catch(error) {
        res.send(error)
    }
})
// end of Showcards


// start of Userlog

// create Userlog
app.post('/userlog/create', async (req, res) => {
    try {
        const userLogJson = {
            userId: req.body.userId,
            activity: req.body.activity,
            activityDate: req.body.activityDate,
        }
        const response = await db.collection('userLog').add(userLogJson)
        res.send('Data added successfully')
    } catch(error) {
        res.send(error)
    }
})

// read all Userlog
app.get('/userlog/read/all', async (req, res) => {
    try {
        const userlogRef = db.collection('userLog')
        const response = await userlogRef.get()
        const responseArr = []
        response.forEach(doc => {
            responseArr.push(doc.data())
        })
        res.send(responseArr)
    } catch(error) {
        res.send(error)
    }
})

// read single Userlog
app.get('/userlog/read/:id', async (req, res) => {
    try {
        const userlogRef = db.collection('userLog').doc(req.params.id)
        const response = await userlogRef.get()
        res.send(response.data())
    } catch(error) {
        res.send(error)
    }
})

// update Userlog
app.post('/userlog/update', async (req, res) => {
    try {
        const id = req.body.id 
        const newUserId = "100111"
        const codebookRef = await db.collection('userLog').doc(id)
        .update({
            userId: newUserId,
        })
        // const response = await userRef.get()
        res.send(`Data was updated successfully`)
    } catch(error) {
        res.send(error)
    }
})

// delete Userlog
app.delete('/userlog/delete/:id', async (req, res) => {
    try {
        const response = await db.collection('userLog').doc(req.params.id).delete()
        res.send(response)
    } catch(error) {
        res.send(error)
    }
})

// end of Userlog


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

// Test Create
app.post('/test/create', async (req, res) => {
    try {
        const testJson = {
            uuid: req.body.uuid,
            name: req.body.name,
            age: req.body.age,
            sex: req.body.sex
        }
        const response = await db.collection('test').add(testJson)
        res.send('Data added successfully')
    } catch (error) {
        res.send(error)
    }
})

// End Test Create

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is up and running on PORT: ${PORT}.`);
})