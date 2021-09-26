# Australian Post Code Checker

This project is a simple Australian post code checker consisting of a react typescript front end and a simple proxy server backend.

## Setting up the App

In the frontend and backend directory, run

### `yarn`

## Running the App

In the frontend directory, run (to start the frontend on localhost 3000)

### `yarn start`

In the backend directory, run (to start the backend on localhost 5000)

### `yarn start`

## Testing the App

To test the main business logic of the app, in the frontend directory, run

### `yarn test` then `a`

## Key Assumptions 

  * Post code are unique.
  * Users must exactly match suburb name for check to pass (not case sensitive).


## Design Decisions

I chose to create a backend server to allow proxy the requests sent to the `digitalapi.auspost.com.au` Api as calling it directly would result in a CORS error and using NO-CORS mode is not a viable work around as the api-key would be dropped in NO-CORS mode. this also helps us to hide our digitalapi.auspost.com.au API key as we can add in on the proxy and don't have to send it to the client.
