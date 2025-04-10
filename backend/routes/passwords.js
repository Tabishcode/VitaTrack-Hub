const { randomBytes, createCipheriv, createDecipheriv } = require('crypto');
const express = require('express');
const router = express.Router();
const axios = require('axios');

const Password = require('../models/password');

router.use(express.urlencoded({ extended: true }));

let key = process.env.AES_KEY;
key = Buffer.from(key, 'base64');
let iv = process.env.AES_IV;
iv = Buffer.from(iv, 'base64');

function encryptAES(text, key, iv) {
    // console.log("Encrypting text:", text);
    const cipher = createCipheriv('aes-256-cbc', key, iv); // Correct algorithm
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// Decryption
function decryptAES(encryptedText, key, iv) {
    // console.log("Decrypting text:", encryptedText);
    const decipher = createDecipheriv('aes-256-cbc', key, iv); // Correct algorithm
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Get all passwords
router.get('/', async (req, res) => {
    if (req.isAuthenticated()) {
        let id = req.user._id;
        let passwords = await Password.find({ userId: id });
        passwords = passwords.map(password => {
            password.password = decryptAES(password.password, key, iv);
            return password;
        });
        res.json(passwords);
    }
    else {
        res.json([]);
    }
});

// Save a password
router.post('/', async (req, res) => {
    try {
        let userId = "6712b613abfb4ad85f770072";
        if (req.isAuthenticated()) {
            userId = req.user._id;
        }
        else {
            return res.status(401).json({ success: false, message: 'Unauthorized.' });
        }
        let { site, email, password } = req.body;

        if (!site || !email || !password || !userId) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        if (password.length < 5) {
            return res.status(400).json({ success: false, message: 'Password must be at least 5 characters long.' });
        }

        password = encryptAES(password, key, iv);

        const newCredential = new Password({ site, email, password, userId });

        const savedCredential = await newCredential.save();

        res.status(201).json({ success: true, result: savedCredential });
    } catch (error) {
        console.error('Error adding credential:', error);

        res.status(500).json({ success: false, message: 'An error occurred while adding the credential.', error: error.message });
    }
});

// Delete Password by id
router.delete('/', async (req, res) => {
    try {
        const { id } = req.body;
        console.log("A delete request with id: ", id);

        if (!id) {
            return res.status(400).json({ success: false, message: 'ID is required to delete a password.' });
        }

        // Delete the document by ID
        const deletedResult = await Password.findByIdAndDelete(id);

        if (!deletedResult) {
            return res.status(404).json({ success: false, message: 'Password not found.' });
        }

        res.status(200).json({ success: true, message: 'Password deleted successfully.', result: deletedResult });
    } catch (error) {
        console.error('Error deleting password:', error);
        res.status(500).json({ success: false, message: 'An error occurred while deleting the password.', error: error.message });
    }
});

module.exports = router;