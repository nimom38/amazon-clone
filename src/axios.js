import axios from 'axios'
require('dotenv').config()

const instance = axios.create({
  //'http://localhost:5001/challenge-cb6fb/us-central1/api', // THE API (cloud function) URL
  baseURL: process.env.BASE_URL,
})

export default instance
