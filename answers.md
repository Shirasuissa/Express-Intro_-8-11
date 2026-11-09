# Part 1 - answers

Read the Express documentation (https://expressjs.com/en/5x/api.html) and answer in your own words.

## 1. What is inside the request object (`req`)?

The request object (req) contains information about the incoming HTTP request, such as the request method, URL, headers, route parameters, query parameters, and body data.

## 2. What is inside the response object (`res`)?

The response object (res) is used to send a response from the server to the client. It lets us send data, set status codes, and set response headers.

## 3. What does `app.use()` do?

app.use() is used to register middleware in an Express application. Middleware can run before route handlers to process requests, check data, or perform other actions.
