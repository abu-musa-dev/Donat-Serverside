# **Dreem Donation - Server**

Welcome to the server-side code for **Dreem Donation**! This backend manages donation campaigns, user data, and provides a robust API to support the frontend. It's designed to handle requests, process donations, and track user activities in a secure and efficient way.

## 🌐 **Live API URL**

You can access the live API here:  
[**Dreem Donation API**](https://api.dreemdonation.com) *(replace with actual URL once available)*.

---

## 🚀 **Features**

- **Manage Campaigns**:  
  Create, read, update, and delete donation campaigns. Admins can manage the entire lifecycle of campaigns through a simple and intuitive API.

- **User Authentication**:  
  Secure user authentication using JWT (JSON Web Tokens), ensuring that only authorized users can access certain resources and actions.

- **Donation Tracking**:  
  Users can track their donations and view detailed history of all contributions made across campaigns.

- **Volunteer Opportunities**:  
  Users can sign up for volunteer opportunities and receive notifications about campaign progress.

- **Notifications**:  
  Provides real-time updates and notifications to users regarding their campaigns and donations.

- **Admin Dashboard**:  
  Admins can manage user data, campaigns, donations, and more through a secure backend interface.

---

## 💻 **Technologies Used**

This backend project utilizes several powerful technologies to ensure smooth operation and secure data handling:

- **Backend Framework**:  
  **Node.js** with **Express.js** – The backend is built on Node.js using the Express framework, providing a scalable and efficient structure.

- **Database**:  
  **MongoDB** – A NoSQL database to store campaign, user, donation, and volunteer data. MongoDB provides flexibility and scalability to handle large amounts of data.

- **Authentication**:  
  **JWT (JSON Web Tokens)** – Secure user authentication system to protect user data and manage access.

- **Cloud Hosting**:  
  The API is hosted on **Heroku** (or any other cloud provider such as AWS, DigitalOcean, etc.) for reliable and scalable cloud hosting.

- **Middleware**:  
  Utilizes middleware for request validation, authentication checks, and error handling to provide a smooth and secure user experience.

- **API Testing**:  
  **Postman** and **Jest** for API testing to ensure endpoints function correctly and are properly secured.

---

## 🛠️ **Getting Started**

To get the server up and running locally, follow the steps below:

### 📥 **Prerequisites**

Before setting up the backend, ensure you have the following installed:

- **Node.js** (version 14.x or higher)
- **npm** (Node Package Manager)
- **MongoDB** (for local development, or use MongoDB Atlas for cloud DB)
