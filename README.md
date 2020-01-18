# Node.js & Mongo & Docker Backend sample
This repository contains a sample service that creates a dockerized Node.js backend connected with a MongoDB database. The service has models and routes for three schemas: User, Group and Project. This could be used for a project management frontend service.

To run it, simply clone and run:
`docker-compose build && docker-compose run`

It creates an API with the following models and endpoints:

## User

### Attributes

name: String (required)

email: String (required)

address: String

phoneNumber: String

groups: Array of **Group**

### Routes
Create: **POST /user** with a User json in the request body. Responds with 201 and a message & id for success.

Read: **GET /user/{id}**. Responds with 200 and a single user.

Read: **GET /users/**. Responds with 200 and a list of users. Can be used with query string parameters groupID or projectID

Update: **PUT /user/{id}** with a User json in the request body. Responds with 200 and a message & updated user's id, name, email.

Delete: **DELETE /user/{id}**. Deletes a user, responds with 200 and a message.

## Group

### Attributes

name: String (required)

owner: userid (required)

### Routes

Create: **POST /group** with a Group json in the request body. Responds with 201 and a message & id for success.

Read: **GET /group/{id}**. Responds with 200 and a single group.

Update: **PUT /group/{id}** with a Group json in the request body. Responds with 200 and a message & updated groups id, name, owner.

Delete: **DELETE /user/{id}**. Deletes a group, responds with 200 and a message.

Create: **PUT /group/{group_id}/{user_id}**. Adds given user to given group and responds with 200, a message and user id for success.

## Project

### Attributes

name: String (required)

description: String (required)

type: String (required, enum: 'Personal', 'Group')

members: Array of **User** (required)

### Routes

Create: **POST /project** with a Project json in the request body. Responds with 201 and a message & id for success.

Read: **GET /project/{id}**. Responds with 200 and a single project.

Update: **PUT /project/{id}** with a Project json in the request body. Responds with 200 and a message & updated project details.

Delete: **DELETE /project/{id}**. Deletes a project, responds with 200 and a message.
