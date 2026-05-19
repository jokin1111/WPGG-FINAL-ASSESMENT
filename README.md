# WPGG - Well Played for Good Game

WPGG is a web application designed to help League of Legends players find teammates, create matchmaking posts, manage their player profile, and connect with other users through a friend request system.

The project has been developed as part of the **Advanced Web Development final assessment**.

## Live Demo

- **Frontend:** https://joaquin.masterendaw.es
- **REST API:** https://api.joaquin.masterendaw.es/api
- **API test endpoint:** https://api.joaquin.masterendaw.es/api/test

## Project Architecture

The application is divided into two separate projects:

- **RestAPI:** Laravel backend that exposes a REST API.
- **WebClientApplication:** React frontend that consumes the REST API.

This separation allows the backend and frontend to work independently, following a client-server architecture.

```text
wpgg/
├── RestAPI/                 # Laravel REST API
├── WebClientApplication/    # React frontend client
├── RestAPI-SQL.sql          # Database export
└── README.md
```
## Technologies Used

### Backend

- PHP
- Laravel
- Laravel Sanctum
- MySQL / MariaDB
- Composer
- RESTful API architecture

### Frontend

- React
- Vite
- React Router
- Axios
- CSS

### Deployment

- Hostinger
- SSH
- phpMyAdmin
- MySQL database

## Main Features

### Authentication

The application includes a complete authentication flow:

- User registration
- User login
- Token-based authentication
- Protected frontend routes
- Logout functionality

Authentication is handled by Laravel Sanctum in the backend and consumed by the React client.

### Player Profiles

Each user has a player profile containing League of Legends-related information, such as:

- Summoner name
- Riot region
- Preferred role
- Secondary role
- Rank tier
- Availability
- Biography
- Public profile status

Users can update their profile from the frontend.

### Posts

Users can create matchmaking posts to find other players.

The posts system supports:

- Viewing all posts
- Creating posts
- Editing own posts
- Deleting own posts
- Filtering posts by search text, role, rank, region, and status

### Find Players

The Find Players page displays recommended players from the database.

Users can search and filter players by:

- Name
- Summoner name
- Role
- Rank
- Region
- Relationship status

Users can also send friend requests directly from this page.

### Friends and Requests

The social section allows users to manage their connections.

Users can:

- Send friend requests
- View received requests
- View sent requests
- Accept or reject received requests
- Cancel sent requests
- View accepted friends
- Remove friends

The Friends page combines accepted friends, received requests, and sent requests in a single interface.

### Dashboard

The dashboard provides a central overview of the user's account, including:

- Player profile summary
- Quick actions
- Number of posts
- Number of friends
- Pending friend requests
- Recommended players
- Recent posts

## Database Overview

The application uses a relational MySQL database. The main tables are:

- `users`
- `player_profiles`
- `posts`
- `friend_requests`
- `friends`
- `personal_access_tokens`

Laravel also includes additional supporting tables such as:

- `migrations`
- `cache`
- `jobs`
- `sessions`
- `password_reset_tokens`

The database export is included in the project as:

```text
RestAPI-SQL.sql
```

## Database Relationships

### Users and Player Profiles

Each user has one player profile.

```text
users 1 ── 1 player_profiles
```

The `users` table stores authentication-related information, while the `player_profiles` table stores League of Legends player information such as summoner name, region, role, rank, availability, and biography.

### Users and Posts

Each user can create many posts.

```text
users 1 ── N posts
```

The `posts` table stores matchmaking posts created by users.

### Users and Friend Requests

Users can send and receive many friend requests.

```text
users 1 ── N friend_requests
```

The `friend_requests` table stores the sender, receiver, and status of each request.

### Users and Friends

Accepted friendships are stored in the `friends` table.

```text
users 1 ── N friends
```

Each friendship is stored bidirectionally. For example:

```text
user_id = 1, friend_id = 2
user_id = 2, friend_id = 1
```

This makes it easier to retrieve each user's friend list.

## REST API Endpoints

The backend exposes a RESTful API using JSON responses. Protected endpoints require a Bearer token generated during login or registration.

### Authentication

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/test` | Test if the API is running | No |
| `POST` | `/api/register` | Register a new user | No |
| `POST` | `/api/login` | Login and receive an access token | No |
| `GET` | `/api/me` | Get the authenticated user | Yes |
| `POST` | `/api/logout` | Logout and invalidate the current token | Yes |

### Player Profile

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/profile` | Get the authenticated user's player profile | Yes |
| `PUT` | `/api/profile` | Update the authenticated user's player profile | Yes |

### Posts

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/posts` | Get all posts | No |
| `GET` | `/api/posts/{id}` | Get a single post | No |
| `GET` | `/api/my-posts` | Get posts created by the authenticated user | Yes |
| `POST` | `/api/posts` | Create a new post | Yes |
| `PUT` | `/api/posts/{id}` | Update a post owned by the authenticated user | Yes |
| `DELETE` | `/api/posts/{id}` | Delete a post owned by the authenticated user | Yes |

### Players

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/players` | Get players with profile and friendship status | Yes |

### Friend Requests

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/friend-requests` | Get pending sent and received friend requests | Yes |
| `POST` | `/api/friend-requests` | Send a friend request | Yes |
| `PATCH` | `/api/friend-requests/{id}/accept` | Accept a received friend request | Yes |
| `PATCH` | `/api/friend-requests/{id}/reject` | Reject a received friend request | Yes |
| `DELETE` | `/api/friend-requests/{id}` | Cancel a sent friend request | Yes |

### Friends

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/friends` | Get the authenticated user's friends | Yes |
| `DELETE` | `/api/friends/{id}` | Remove a friend | Yes |

### Example Authenticated Request

Authenticated requests use the following header:

```http
Authorization: Bearer YOUR_TOKEN_HERE
Accept: application/json
```

Example:

```http
GET /api/me
Authorization: Bearer 1|exampletoken
Accept: application/json
```

## Local Installation

This section explains how to run the project locally.

### Requirements

Before running the project, make sure you have installed:

- PHP 8.4
- Composer
- Node.js
- npm
- Docker
- Laravel Sail
- MySQL client or MySQL Workbench

---

## Backend Setup

Navigate to the Laravel API folder:

```bash
cd restAPI
```

Install PHP dependencies:

```bash
composer install
```

Copy the environment file:

```bash
cp .env.example .env
```

Generate the Laravel application key:

```bash
php artisan key:generate
```

Configure the database in `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=wpgg_api
DB_USERNAME=sail
DB_PASSWORD=password
```

Start Laravel Sail:

```bash
./vendor/bin/sail up -d
```

Run the migrations:

```bash
./vendor/bin/sail artisan migrate
```

Alternatively, import the provided SQL file:

```text
RestAPI-SQL.sql
```

The local API should be available at:

```text
http://localhost/api
```

The API test endpoint is:

```text
http://localhost/api/test
```

---

## Frontend Setup

Navigate to the React client folder:

```bash
cd WebClientApplication
```

Install Node dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The local frontend should be available at:

```text
http://localhost:5173
```

or another port shown by Vite.

---

## Frontend API Configuration

The Axios client is located at:

```text
WebClientApplication/src/api/axios.js
```

For local development, use:

```javascript
baseURL: 'http://localhost/api'
```

For production, use:

```javascript
baseURL: 'https://api.joaquin.masterendaw.es/api'
```

## Production Deployment

The project is deployed using Hostinger.

### Frontend Deployment

The React frontend is deployed at:

```text
https://joaquin.masterendaw.es
```

For production, the React project was built locally using:

```bash
npm run build
```

The generated `dist/` files were uploaded to the Hostinger public directory for the main domain:

```text
/home/u336643015/domains/joaquin.masterendaw.es/public_html
```

### REST API Deployment

The Laravel API is deployed at:

```text
https://api.joaquin.masterendaw.es/api
```

The Laravel application files were uploaded to a private directory on the server:

```text
/home/u336643015/restAPI
```

The public files from Laravel's `public/` directory were placed inside the API subdomain public folder:

```text
/home/u336643015/domains/joaquin.masterendaw.es/public_html/api
```

The API subdomain points to:

```text
https://api.joaquin.masterendaw.es
```

Laravel's public `index.php` file was updated so it loads the private Laravel application from:

```text
/home/u336643015/restAPI
```

### Database Deployment

A MySQL database was created in Hostinger:

```text
u336643015_wpgg
```

The database was populated by importing:

```text
RestAPI-SQL.sql
```

using phpMyAdmin.

### Production URLs

| Application | URL |
|---|---|
| Frontend | `https://joaquin.masterendaw.es` |
| REST API | `https://api.joaquin.masterendaw.es/api` |
| API test endpoint | `https://api.joaquin.masterendaw.es/api/test` |

---

## Test Credentials

The application supports registration through the frontend, so new users can be created from:

```text
https://joaquin.masterendaw.es/register
```

Example test users can also be provided for marking purposes:

```text
User 1:
Email: joaquin@test.com
Password: password123

User 2:
Email: miriam@test.com
Password: password123
```

> Note: Do not use real personal passwords in the submitted documentation.

---

## Validation and Security

The application includes backend validation for the main operations.

### Authentication Validation

The API validates:

- Required name during registration
- Valid email format
- Unique email addresses
- Minimum password length
- Password confirmation
- Correct login credentials

### Profile Validation

The profile update endpoint validates:

- Summoner name
- Riot region
- Preferred role
- Secondary role
- Rank tier
- Availability text
- Biography
- Public profile status

### Post Validation

The posts API validates:

- Title
- Description
- Queue type
- Preferred role
- Rank tier
- Region
- Microphone requirement
- Post status

Users can only edit or delete posts they own.

### Friend Request Validation

The friend request system prevents:

- Sending a friend request to yourself
- Sending duplicate pending requests
- Sending requests to users who are already friends
- Accepting or rejecting requests that do not belong to the authenticated user

### Authentication Security

Protected API routes use Laravel Sanctum token authentication.

The React frontend stores the token in local storage and sends it with API requests using the following header:

```http
Authorization: Bearer TOKEN
```

## Known Limitations

This project was developed for an academic assessment and has some limitations:

- The application does not include real-time chat.
- The application does not integrate with the Riot Games API.
- Search and filtering are currently handled on the client side.
- The UI is functional but could be improved further with a more advanced design system.
- Automated tests are limited or not included.
- The project is designed for demonstration and assessment purposes rather than full production use.

---

## Future Improvements

Possible future improvements include:

- Real-time messaging between friends
- Riot Games API integration
- Server-side pagination
- Server-side filtering and searching
- Notifications for friend requests
- User avatars
- Password reset flow
- Improved responsive design
- Automated feature tests
- Admin dashboard
- Better accessibility support

---

## AI Use Statement

AI assistance was used during the development of this project to support planning, debugging, refactoring, documentation, and deployment guidance.

AI was used to help with:

- Structuring the Laravel REST API
- Designing database relationships
- Debugging Laravel, Docker, MySQL, and React issues
- Creating and improving React components
- Improving the frontend layout and CSS structure
- Writing documentation drafts
- Planning deployment steps for Hostinger

All AI-generated suggestions were reviewed, tested, and adapted manually by the developer.

---

## Author

Developed by Joaquin Antequera Alba as part of the Advanced Web Development final assessment.
