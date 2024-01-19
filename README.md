# MongoApp - Ticket Management System
A simple ticketing app for CRUD operations using Python Fast Api, Angular and Mongo DB

## Overview

The Ticket Management System is a web application that allows users to manage tickets, performing CRUD operations in a MongoDB database. This application is designed to be user-friendly, enabling non-technical users to interact with the database without the need for writing queries.

## Key Features

1. **User Authentication:**
   - Secure login/logout functionality using JWT.
   
2. **Data Display:**
   - Ability to view data from specified collections in a readable table format.

3. **Data Manipulation:**
   - Simple forms to insert, update, and delete records.

4. **Query Execution:**
   - An interface to run predefined queries with variable parameters.

5. **Documentation:**
   - A brief documentation explaining how to set up and use the application.

## Technology Stack

- **Frontend:** HTML, CSS, JavaScript (Angular)
- **Backend:** FastAPI (Python)
- **Database:** MongoDB

## Getting Started

### Prerequisites

- Node.js and npm (for Angular)
- Python (for FastAPI)
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rasheed051997/MongoApp.git
   cd MongoApp

    # Frontend
    cd mongo-web
    npm install

    # Backend
    cd mongo-api
    pip install -r requirements.txt

2. Configure MongoDB connection:

3. Update the MongoDB connection details in backend/main.py.
Run the application:
    # Frontend
    cd mongo-web
    ng serve

    # Backend
    cd mongo-api
    uvicorn main:app --reload

4. Open the application in your browser: http://localhost:4200

Usage
1. User Authentication:
    Register a new user or use existing credentials to log in.

2. Ticket Management:
    Navigate to the Tickets section to view, create, update, or delete tickets.


# Ticket Management System

## MongoDB Configuration

Before running the application, make sure to configure your MongoDB connection. The application assumes the use of a local MongoDB instance with the following settings:

- **Host:** localhost:27017
- **Database Name:** mongo-app

If you have a different MongoDB configuration, you can update the connection details in the `mongo-api/main.py` file.

## MongoDB Collections

The application uses the following MongoDB collections:

1. **Tickets Collection (`tickets`):**
   - This collection stores information about tickets, including subject, description, email, contact name, and status.

2. **Users Collection (`users`):**
   - User authentication is handled through this collection. You can use the provided `testuser` and `testuser123` as sample username and password.

## Exporting MongoDB Collections

If you want to export MongoDB collections for backup or sharing purposes, you can use the following steps:

1. **Navigate to the MongoDB bin directory in the terminal or command prompt:**

   ```bash
   cd /path/to/mongodb/bin

1. Run the mongoexport command to export collections:

   For the tickets collection:
      mongoexport --db mongo-app --collection tickets --out tickets.json

   For the users collection:
      mongoexport --db mongo-app --collection users --out users.json

These commands will create JSON files (tickets.json and users.json) containing the exported data.

2. Zip the exported files (optional):

   zip mongo_collections_export.zip tickets.json users.json
   You can then share or archive the mongo_collections_export.zip file.

Remember to replace /path/to/mongodb/bin with the actual path to your MongoDB bin directory.