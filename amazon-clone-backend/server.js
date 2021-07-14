require('dotenv').config()
const express = require('express')
const cors = require('cors')
const stripe = require('stripe')(process.env.SECRET_KEY)

const PORT = process.env.PORT || 8005

// API

// - App config
const app = express()

// - Middlewares
app.use(cors({ origin: true }))
app.use(express.json())

// - API routes
app.get('/', (request, response) => response.status(200).send('hello world'))

app.post('/payments/create', async (request, response) => {
  const total = request.query.total

  console.log('Payment Request Received BOOM!!! for this amount >>> ', total)

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, //  subunits of the currency
    currency: 'usd',
  })

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  })
})

// - Listen command
app.listen(PORT, () => console.log(`listening on local host: ${PORT}`))

