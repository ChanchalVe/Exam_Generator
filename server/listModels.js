import axios from "axios";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

axios.get(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`)
  .then(res => console.log(res.data))
  .catch(err => console.error(err.response?.data || err.message));
