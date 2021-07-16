
//import exampleData from './exampleData.json'
import createMessage from '../lib/message.js'
import fetch from 'node-fetch'
import express from 'express'

const app = express()
app.use(express.json())

app.post('/', async (req, res) => {
  console.log(req.body)
  const message = createMessage(req.body)
  
  const result = await fetch('https://canary.discord.com/api/webhooks/865028436452179989/l1qvSpvCDkahIgPtf0OWXUTqnIscxaFt7h70OO39tgo37VVZEnjJChk1AfsFKfAVHcah', {
    method: 'POST',
    body: JSON.stringify(message),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!result.ok) {
    throw new Error('Invalid Discord Request');
  }
})

//const message = createMessage(exampleData)

app.listen(3000, () => {
  console.log(`Listening on port 3000.`)
})
