
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';


import { Registration } from './models/registrationSchema.js';
const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
  }));
  import 'dotenv/config'

// Connect to MongoDB Atlas
mongoose
  .connect(
   
    process.env.MONGO_URI
  )
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// POST endpoint to handle form submission


app.post("/submit-form", async (req, res) => {
    try {
        const formData = req.body;
        const registration = new Registration(formData);
        await registration.save();
        res.send("Form submitted successfully");
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Handle validation errors as before
            const errorMessage = Object.values(error.errors).map(error => error.message).join(', ');
            res.status(400).send(errorMessage);
        } else if (error.keyPattern.email) {
            // Duplicate email error
            res.status(400).send('Email already exists');
        } else {
            console.error("Error submitting form:", error);
            res.status(500).send("Error submitting form");
        }
    }
});


// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is listening at http://localhost:${process.env.PORT}`);
});
