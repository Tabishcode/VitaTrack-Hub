const mongoose = require('mongoose');

// Define the schema
const CredentialSchema = new mongoose.Schema({
    site: {
        type: String,
        required: true, // Ensures this field is mandatory
    },
    email: {
        type: String,
        required: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Validates the email format
    },
    password: {
        type: String,
        required: true, // Ensures the password is mandatory
        minlength: 5,   // Sets a minimum length for the password
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
});

// Create the model
const Password = mongoose.model('Password', CredentialSchema);

module.exports = Password;
