import express from "express";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose'

mongoose
  .connect(
    "mongodb+srv://mernblog:mern@mernblog.lt9r4.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB OK"))
  .catch(err => console.log('DB error', err));

const app = express()

app.use(express.json())
app.get('/', (req, res) => {
	res.send('Hello World')
})

app.post('/auth/login', (req, res) => {
	console.log(req.body)

	if (req.body.email === 'test@test.com') {
		const token = jwt.sign(
      {
        email: req.body.email,
        fullName: "Timor Rust",
      },
      "secret123"
    );
	}
	

	res.json({
		success: true,
		token,
	})
})

app.listen(4444, (err) => {
	if (err) {
		console.log(err)
	}
	console.log('Server Ok')
})