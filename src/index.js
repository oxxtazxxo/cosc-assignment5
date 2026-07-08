import express from "express"; // imports the express library

const app = express(); // creates the Express application
const PORT = 3000; // tells the server to listen on port 3000

app.use(express.json()); // allows the server to parse JSON data in requests

let resources = [ // creates a sample resource array with one object
    {
        id: 1,
        title: "Sample Resource",
        description: "This is the first REST resource."
    }
];

app.get("/api/resources", (req, res) => {
    res.status(200).json({
        data: resources
    });
});

app.get("/api/resources/:id", (req, res) => { // creates a GET endpoint for the /api/resources route
    const targetId = req.params.id; // gets the id parameter from the request
    const match = resources.find(resource => resource.id.toString() === targetId); // finds the resource with the matching id

    if (!match) { // if no matching resource is found
        return res.status(404).json({ // sends a 404 response with an error message
            error: `Resource with ID ${targetId} not found.`
        });
    }

    res.status(200).json({ // sends a 200 response with the matching resource data
        data: match
    });
});

app.get("/", (req, res) => {
  res.send("Assignment 5 server is running!"); // sends a response to the client when they access the root route
});

app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`); // logs a message when the server starts listening
});

// app.get() creates the endpoint
// res.send() sends a response to the client
// res.json() sends a JSON response to the client