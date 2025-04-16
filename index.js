const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
require('dotenv').config(); // Load environment variables from .env file

const port = 3001;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ifx11.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const databaseName = 'myDatabase';
const campaignsCollectionName = 'campaigns';
const donationsCollectionName = 'donations';

let campaignsCollection, donationsCollection;

app.use(cors());
app.use(express.json());

// Database Connection
async function connectToDatabase() {
  try {
    // await client.connect();
    // console.log("Connected to MongoDB");
    const database = client.db(databaseName);
    campaignsCollection = database.collection(campaignsCollectionName);
    donationsCollection = database.collection(donationsCollectionName);

    // Create Campaign
    app.post('/api/campaigns', async (req, res) => {
      const { title, description, minimumDonation, image, deadline, userEmail, userName, type } = req.body;

      try {
        const campaignData = {
          title,
          description,
          minimumDonation: parseFloat(minimumDonation),
          image,
          deadline: new Date(deadline),
          userEmail,
          userName,
          type,
        };
        const result = await campaignsCollection.insertOne(campaignData);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).send("Error creating campaign: " + error.message);
      }
    });

    app.get("/", (req, res) => {
      res.send("This is donate");
    });

    // Fetch All Campaigns
    app.get('/api/campaigns', async (req, res) => {
      try {
        const campaigns = await campaignsCollection.find().toArray();
        res.json(campaigns);
      } catch (error) {
        res.status(500).send("Error fetching campaigns: " + error.message);
      }
    });

    // Fetch Campaign by ID
    app.get('/api/campaigns/:id', async (req, res) => {
      try {
        const campaign = await campaignsCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!campaign) return res.status(404).send("Campaign not found");
        res.json(campaign);
      } catch (error) {
        res.status(500).send("Error fetching campaign: " + error.message);
      }
    });

    // Fetch Running Campaigns
    app.get('/api/runningCampaigns', async (req, res) => {
      try {
        const currentDate = new Date();
        const runningCampaigns = await campaignsCollection.find({ deadline: { $gte: currentDate } }).limit(6).toArray();
        res.json(runningCampaigns);
      } catch (error) {
        res.status(500).send("Error fetching running campaigns: " + error.message);
      }
    });

    // Delete Campaign
    app.delete('/api/campaigns/:id', async (req, res) => {
      try {
        const result = await campaignsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) return res.status(404).json({ message: 'Campaign not found' });
        res.json({ message: 'Campaign deleted' });
      } catch (error) {
        res.status(500).send("Error deleting campaign: " + error.message);
      }
    });

    // Update Campaign
    app.put('/api/campaigns/:id', async (req, res) => {
      const { title, description, minimumDonation, image, deadline, userEmail, userName, type } = req.body;
      try {
        const result = await campaignsCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: { title, description, minimumDonation: parseFloat(minimumDonation), image, deadline: new Date(deadline), userEmail, userName, type } }
        );
        if (result.modifiedCount === 0) return res.status(404).json({ message: 'Campaign not found or no changes made' });
        res.json({ message: 'Campaign updated successfully' });
      } catch (error) {
        res.status(500).send("Error updating campaign: " + error.message);
      }
    });

    // User Campaigns
    app.get('/api/myCampaigns/:userEmail', async (req, res) => {
      try {
        const campaigns = await campaignsCollection.find({ userEmail: req.params.userEmail }).toArray();
        res.json(campaigns);
      } catch (error) {
        res.status(500).send("Error fetching user campaigns: " + error.message);
      }
    });

    // Donate to Campaign
    app.post("/api/donate", async (req, res) => {
      try {
        const { campaignId, amount, donationTitle, donorName, donorEmail } = req.body;

        if (!campaignId || !amount || !donorName || !donorEmail) {
          return res.status(400).json({ message: "All fields are required." });
        }

        const donation = {
          campaignId: new ObjectId(campaignId),
          amount,
          donorName,
          donationTitle,
          donorEmail,
          date: new Date(),
        };

        const result = await donationsCollection.insertOne(donation);
        res.status(201).json({ message: "Donation successful", insertedId: result.insertedId });

      } catch (error) {
        console.error("Error in donation route:", error);
        res.status(500).json({ message: "Server error", error });
      }
    });

    // User Donations
    app.get('/api/myDonations/:userEmail', async (req, res) => {
      try {
        const userEmail = req.params.userEmail.trim().toLowerCase();
        const donations = await donationsCollection.find({ donorEmail: userEmail }).toArray();
        res.json(donations);
      } catch (error) {
        res.status(500).send("Error fetching user donations: " + error.message);
      }
    });

    // Donations for Specific Campaign
    app.get('/api/campaigns/:id/donations', async (req, res) => {
      try {
        const donations = await donationsCollection.find({ campaignId: new ObjectId(req.params.id) }).toArray();
        res.json(donations);
      } catch (error) {
        res.status(500).send("Error fetching campaign donations: " + error.message);
      }
    });

  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
}

connectToDatabase().catch(console.error);

// Start the Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

