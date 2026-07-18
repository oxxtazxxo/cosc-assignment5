import express from "express"; // imports the express library
import { logger } from "./middleware/logger.js";
import { connectDB } from "./database.js";
import { ObjectId } from "mongodb";

const app = express(); // creates the Express application
const PORT = 3000; // tells the server to listen on port 3000
const db = await connectDB();
const resourcesCollection = db.collection("resources");

app.use(express.json()); // allows the server to parse JSON data in requests
app.use(logger);

app.get("/api/resources", async (req, res) => {
    try {
        const resources = await resourcesCollection.find().toArray();

        res.status(200).json({
            data: resources
        });
    } catch (error) {
        console.error("Error retrieving resources:", error);

        res.status(500).json({
            error: "Unable to retrieve resources."
        });
    }
});

app.post("/api/resources", async (req, res) => {

    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({
            error: "Title and description are required."
        });
    }

    try {
        const newResource = {
            title,
            description
        };

        const result = await resourcesCollection.insertOne(newResource);

        res.status(201).json({
            data: {
                _id: result.insertedId,
                ...newResource
            }
        });
    } catch (error) {
        console.error("Error creating resource:", error);

        res.status(500).json({
            error: "Unable to create resource."
        });
    }
});

app.put("/api/resources/:id", async (req, res) => {
    const { title, description } = req.body;

    const updates = {};

    if (title) {
        updates.title = title;
    }

    if (description) {
        updates.description = description;
    }

    if (Object.keys(updates).length === 0) {
        return res.status(400).json({
            error: "At least one field is required for the update."
        });
    }

    try {
        const result = await resourcesCollection.findOneAndUpdate(
            {
                _id: new ObjectId(req.params.id)
            },
            {
                $set: updates
            },
            {
                returnDocument: "after"
            }
        );

        if (!result) {
            return res.status(404).json({
                error: "Resource not found."
            });
        }

        res.status(200).json({
            data: result
        });
    } catch (error) {
        console.error("Error updating resource:", error);

        res.status(500).json({
            error: "Unable to update resource."
        });
    }
});

app.delete("/api/resources/:id", async (req, res) => {
    try {
        const result = await resourcesCollection.findOneAndDelete({
            _id: new ObjectId(req.params.id)
        });

        if (!result) {
            return res.status(404).json({
                error: "Resource not found."
            });
        }

        res.status(200).json({
            data: result
        });

    } catch (error) {
        console.error("Error deleting resource:", error);

        res.status(500).json({
            error: "Unable to delete resource."
        });
    }
});

app.get("/api/resources/:id", async (req, res) => {
    try {
        const resource = await resourcesCollection.findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!resource) {
            return res.status(404).json({
                error: "Resource not found."
            });
        }

        res.status(200).json({
            data: resource
        });

    } catch (error) {
        console.error("Error retrieving resource:", error);

        res.status(500).json({
            error: "Unable to retrieve resource."
        });
    }
});

app.get("/", (req, res) => {
  res.send("Assignment 6 server is running!"); // sends a response to the client when they access the root route
});

app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`); // logs a message when the server starts listening
});

// app.get() creates the endpoint
// res.send() sends a response to the client
// res.json() sends a JSON response to the client