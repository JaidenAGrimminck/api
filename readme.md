# My API!

The API is located at https://api.jaiden.hackclub.app/. It is a simple API that has a few routes that can be used to get information about the server and the developer. The API is written in JS using Node.js and express.js.

Layout:

| Route         | Method | Description                                                                                                                                                                                                                                                                | Body             |
|---------------|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------|
| /             | GET    | This is the base page, just giving a small message and a description of the routes and their purposes in a JSON object.                                                                                                                                                    |                  |
| /add_request  | POST   | Increments or subtracts (depending on the body boolean) the number of requests made to the server. Headers must include "Content-Type: application/json" and the body must be a JSON object with a key "add" that is a boolean. Returns the new value after the operation. | `{add: boolean}` |
| /get_requests | GET    | Returns the number of requests made to the server in a JSON object.                                                                                                                                                                                                        |                  |
| /about_me     | GET    | Returns a message about the developer in a JSON object.                                                                                                                                                                                                                    |                  |