
const express = require("express");
const app = express();

const path = require("path");
const publicPath = path.join(__dirname, "../public");


app.use(express.static(publicPath));
var port = process.env.PORT || 3000;
app.listen(port, () => {

    
console.log(`Server is up and running on port ${port}`);
})