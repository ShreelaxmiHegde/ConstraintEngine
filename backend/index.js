import express from 'express';
import axios from 'axios';
import router from './route.js';
import cors from 'cors';

const app = express();
const port = 8080;

app.use(express.json());

const aiClient = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 10000
});

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))


app.use("/c", router);


// app.post("/c/:chatId", async (req, res) => {
//   const { chatId } = req.params;
//   const { message } = req.body;

//   try {
//     let response = await aiClient.post(`/c/${chatId}`, { message });
//     let data = response.data;
//     console.log(data);
//     res.json(data);
//   } catch (err) {
//     console.log(err)
//   }
// })


app.listen(port, () => {
  console.log(`App is listening on port:${port}`);
});