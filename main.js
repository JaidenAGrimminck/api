const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.json({
        message: 'Hello, World! This is my API server!',
        routes: [
            {
                location: '/',
                description: 'Returns this page. Describes the available routes, and their purposes...',
                method: 'GET'
            },
            {
                location: '/add_request',
                description: 'Increments or subtracts (depending on the body boolean) the number of requests made to the server. Headers must include "Content-Type: application/json" and the body must be a JSON object with a key "add" that is a boolean. Returns the new value after the operation.',
                method: 'POST',
                body: {
                    add: 'boolean'
                }
            },
            {
                location: '/get_requests',
                description: 'Returns the number of requests made to the server',
                method: 'GET'
            },
            {
                location: '/about_me',
                description: 'Returns a message about the developer',
                method: 'GET'
            }
        ]
    });
});

app.post('/add_request', (req, res) => {
    if (req.body === undefined) {
        res.status(400).json({
            error: 'No data sent!'
        });

        return;
    }

    if (Object.keys(req.body).length === 0) {
        res.status(400).json({
            error: 'No data sent!'
        });
        return;
    }


    if (!Object.keys(req.body).includes('add')) {
        res.status(400).send({
            error: 'No "add" key in request body!'
        });
        return;
    }

    //get the data from the request
    const { add } = req.body;

    const datafile = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

    if (add) {
        datafile.requests += 1;
    } else {
        datafile.requests -= 1;
    }

    fs.writeFileSync(__dirname + '/data.json', JSON.stringify(datafile));

    res.json(datafile);
})

app.get('/get_requests', (req, res) => {
    const datafile = JSON.parse(fs.readFileSync(__dirname + '/data.json', 'utf-8'));

    res.json(datafile);
});

app.get('/about_me', (req, res) => {
    res.json({
        name: 'Jaiden',
        slack_id: 'U078DHJG6BX',
        github: "https://github.com/JaidenAGrimminck"
    });
})

app.listen(3234, () => {
    console.log("Server is running on port 3234");
});