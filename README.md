# Dream Donation Server

Dream Donation is a platform that allows users to create campaigns, donate to them, and track their donations. This server-side application is built using Node.js, Express, and MongoDB, with an API that enables campaign and donation management.

## 🚀 Features

- **Create Campaigns**: Users can create new donation campaigns with a title, description, minimum donation amount, image, and deadline.
- **View Campaigns**: Users can view all available campaigns or filter campaigns by user or status (running campaigns).
- **Donate to Campaigns**: Users can donate to campaigns with specified amounts and see their donation history.
- **Campaign Management**: Admins or users can update or delete their campaigns.
- **Donation History**: Users can track their donations and see the details of each campaign they’ve contributed to.

## 🛠️ Technology Stack

- **Node.js**: JavaScript runtime for building the server-side application.
- **Express.js**: Web framework for Node.js to handle routing and API endpoints.
- **MongoDB**: NoSQL database for storing campaign and donation data.
- **MongoDB Atlas**: Cloud-hosted MongoDB service for easy database setup and management.
- **CORS**: Middleware for enabling cross-origin resource sharing (CORS).
- **dotenv**: For loading environment variables from a `.env` file.

## 💡 Setup Instructions

Follow these steps to set up the project on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/dream-donation-server.git
cd dream-donation-server
