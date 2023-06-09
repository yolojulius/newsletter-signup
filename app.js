const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jasonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/e6f6422d4e";

    const options = {
        method: "POST",
        auth: "juliusk:07b12ecaa403aa6f17c920964caa2b16-us21"
    }

    const request = https.request(url, options, function(response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
            console.log(response.statusMessage);
        }
    });

    request.write(jasonData);
    request.end();
})

app.post("/failure", function(req, res) {
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port" + process.env.PORT);
})

// API KEY
// 07b12ecaa403aa6f17c920964caa2b16-us21

// List ID
// e6f6422d4e