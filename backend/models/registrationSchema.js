import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        match: [/^[A-Za-z]+$/, 'First name must contain only alphabetic characters'],
        trim: true, // Remove whitespace from both ends of the string
        minlength: 2, // Minimum length of 2 characters
        maxlength: 50 // Maximum length of 50 characters
    },
    lastName: {
        type: String,
        required: true,
        match: [/^[A-Za-z]+$/, 'Last name must contain only alphabetic characters'],
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true, // Convert email to lowercase
        unique: true, // Ensure email is unique
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'] // Regex pattern for email validation
    },
    country: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    state: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    city: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    dob: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                // Check if the date is at least 14 years ago
                const minDate = new Date();
                minDate.setFullYear(minDate.getFullYear() - 14);
                return value <= minDate;
            },
            message: 'Date of birth must be at least 14 years ago'
        }
    },
    age: {
        type: Number,
        required: true,
        min: 14, // Minimum age of 14
        max: 99 // Maximum age of 99
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female'] // Only allow 'Male' or 'Female' values
    }
});

export const Registration = mongoose.model("Registration", registrationSchema);
