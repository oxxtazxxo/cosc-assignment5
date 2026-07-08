# Assignment 5 - REST API Testing Summary

## Postman Testing Results

The REST API was tested using Postman to verify that each endpoint behaved correctly and returned the expected HTTP status codes.

### GET /api/resources
- Method: GET
- Result: Successfully returned all resources in the array.
- Status Code: 200 OK

### GET /api/resources/:id
- Method: GET
- Result: Successfully returned the requested resource by ID.
- Status Code: 200 OK

When an invalid ID was tested, the API returned:
- Status Code: 404 Not Found

### POST /api/resources
- Method: POST
- Result: Successfully created a new resource using JSON data from the request body.
- Status Code: 201 Created (changed from 211 created to 201, as per professors email)

### PUT /api/resources/:id
- Method: PUT
- Result: Successfully updated the title and description of an existing resource.
- Status Code: 200 OK

When an invalid ID was tested, the API returned:
- Status Code: 404 Not Found

### DELETE /api/resources/:id
- Method: DELETE
- Result: Successfully removed the requested resource from the array.
- Status Code: 200 OK

When an invalid ID was tested, the API returned:
- Status Code: 404 Not Found

## Middleware Verification

The custom logger middleware successfully logged the timestamp, HTTP request method, and requested route to the terminal for every incoming request. The `express.json()` middleware also correctly parsed incoming JSON request bodies for POST and PUT requests.