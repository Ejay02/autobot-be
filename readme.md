# Autobot

This project is a backend service that automatically creates Autobots, their posts, and comments, and emits display real-time data to the FE.

## Features

- **Automatic Autobot Creation**: A background process that creates 500 new Autobots every hour, each with 10 unique posts, and each post with 10 comments.
- **Real-Time Updates**: Displays the current count of Autobots created.
- **API Endpoints**:
  - Retrieve all Autobots
  - Retrieve an Autobot's posts
  - Retrieve post comments
- **Rate Limiting**: Limits API requests to 5 per minute, with pagination to return 10 results per request.

## Getting Started

### Prerequisites

- Node.js
- MySQL

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Ejay02/autobot-be.git
   cd autobot-be
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up MySQL database**:

   Create a MySQL database. You can use the provided migration files to set up the necessary tables.

4. **Configure Environment Variables**:

   Create a `.env` file in the root directory and add your database configuration:

   ```
   DB_HOST=
   DB_USER=
   DB_PASSWORD=
   DB_NAME=
   ```

5. **Run Migrations**:

   Generate and run migrations to set up your database schema:

   ```bash
   npm run migrate
   ```

### Running the Application

1. **Start the Server**:

   ```bash
   npm start
   ```
  

### API Endpoints

- **GET /api/autobots**: Retrieve a list of all Autobots.
- **GET /api/autobots/:id/posts**: Retrieve all posts for a specific Autobot.
- **GET /api/posts/:postId/comments**: Retrieve comments for a specific post.


### Rate Limiting

The API is rate-limited to 5 requests per minute per IP address. Each request can return a maximum of 10 results.

### Background Process

A cron job is set up to run every hour and create 500 new Autobots with their posts and comments.

### Testing

- **Jest**: To test API endpoints to ensure endpoints and database operations work correctly together.

### Documentation

```bash
https://documenter.getpostman.com/view/36020954/2sAXjDfG1g

```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

This project is a test project for SmartInsight

## Acknowledgments

- [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com) for mock data.

```

Feel free to modify or add any additional sections as needed!
```

# SIDE NOTE

The {JSON} Placeholder has only 10 data stored for /users, since the task was for 500 unique hourly, I appended a random string to generate unique bots and titles.
