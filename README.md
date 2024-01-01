# Express Notes App

A simple Express.js application for managing notes. The app provides CRUD operations for notes and exposes various endpoints to create, update, delete, retrieve, and list notes.

## Installation

### Using Docker

1. Clone the repository:

    ```bash
    git clone https://github.com/axrav/_notes-task.git
    cd _notes-task
    ```

2. Update environment variables:

    - Copy `sample.env` to `.env`:

        ```bash
        cp sample.env .env
        ```

    - Open `.env` and update the values according to your configuration.

3. Ensure Docker and Docker Compose are installed.

4. Run the following command to start the application:

    ```bash
    docker-compose up
    ```

### Localhost Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/axrav/_notes-task.git
    cd _notes-task
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure environment variables:

    - Copy `sample.env` to `.env`:

        ```bash
        cp sample.env .env
        ```

    - Open `.env` and update the values according to your configuration.

4. Run the following command to start the application in production mode:

    ```bash
    npm run prod
    ```

## Usage

All the routes are protected by Basic auth which can be specified via env

### API Endpoints

- **GET /notes/getNotes**
    - Description: Retrieve a list of all notes.
  
- **GET /notes/getNote/:id**
    - Description: Retrieve a specific note by ID.

- **POST /notes/createNote**
    - Description: Create a new note.
    - Request Body: `{ "title": "Note Title", "content": "Note Content" }`

- **PUT /notes/update/:id**
    - Description: Update a specific note by ID.
    - Request Body: `{ "title": "Updated Title", "content": "Updated Content" }`

- **DELETE /notes/delete/:id**
    - Description: Delete a specific note by ID.


### Responses
**1. GET /notes/getNotes**

- **Success Response (200 OK):**
  ```json
  [
    {
      "id": "1",
      "title": "Note 1",
      "content": "Content of Note 1"
    },
    {
      "id": "2",
      "title": "Note 2",
      "content": "Content of Note 2"
    }
  ]
  ```

- **Error Response (500 Internal Server Error):**
  ```json
  {
    "error": "Internal Server Error",
  }
  ```

**2. GET /getNote/:id**

- **Success Response (200 OK):**
  ```json
  {
    "id": "1",
    "title": "Note 1",
    "content": "Content of Note 1"
  }
  ```

- **Error Response (404 Not Found):**
  ```json
  {
    "error": "Not Found",
  }
  ```

**3. POST /notes/createNote**

- **Success Response (201 Created):**
  ```json
  {
    "id": "3",
    "title": "New Note",
    "content": "Content of the new note"
  }
  ```

- **Error Response (400 Bad Request):**
  ```json
  {
    "error": "Bad Request",
    "message": "Invalid request body. Please provide 'title' and 'content'."
  }
  ```

**4. PUT /notes/update/:id**

- **Success Response (200 OK):**
  ```json
  {
    "id": "3",
    "title": "Updated Note",
    "content": "Updated content of the note"
  }
  ```

- **Error Response (404 Not Found):**
  ```json
  {
    "error": "Not Found",
  }
  ```

**5. DELETE /notes/delete/:id**

- **Success Response (204 No Content):**
  ```json
  {}
  ```

- **Error Response (404 Not Found):**
  ```json
  {
    "error": "Not Found",
    "message": "Note with ID 3 not found."
  }
  ```

### Testing

Ensure environment variables are set correctly, and run the following command for testing:

```bash
npm test
