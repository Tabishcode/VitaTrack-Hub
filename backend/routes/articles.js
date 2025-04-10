
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.use(express.urlencoded({ extended: true }));

router.get('/data', async (req, res) => {
    let response;
    // console.log("Request Received for articles");
    let today = new Date(); 
    let date = new Date(); 
    date.setDate(today.getDate() - 20);
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    let day = String(date.getDate()).padStart(2, '0');
    let formattedDate = `${year}-${month}-${day}`;
    // console.log(formattedDate);

    try {
        const query = "Health and Fitness";
        const apiKey = '3d0cad123c044ee59632e4ff38c3dd7b';
        const url = `https://newsapi.org/v2/everything?q=${query}&from=${formattedDate}&sortBy=publishedAt&apiKey=${apiKey}`
        let data = await axios.get(url);

        response = data.data.articles.slice(0, 30);
        response = response.filter(item => item.title != '[Removed]')
        res.json(response);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;