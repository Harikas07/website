const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
require('dotenv').config();

const app = express();

// Firebase Admin SDK initialization
admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    }),
    databaseURL: process.env.FIREBASE_DB_URL
});

const db = admin.database();

// Express config
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Dynamic typing roles
const typingRoles = [
    "Data Scientist",
    "Machine Learning Engineer",
    "Data Analyst",
    "AI Enthusiast"
];
const objective = `Graduate in Information Science specializing in Machine Learning, focused on leveraging skills
in data analysis, statistical modeling, and machine learning to extract insights and recommend
data-driven solutions for organizational growth.`;

// Home page
app.get('/', (req, res) => {
    res.render('index', {
        title: typingRoles.join(' | '),
        objective
    });
});

// Handle contact form submission
app.post('/submitContact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newRef = db.ref('contacts').push();
        await newRef.set({
            name,
            email,
            message,
            timestamp: new Date().toISOString()
        });
        console.log("Contact form saved:", req.body);
        res.redirect('/?success=true');
    } catch (error) {
        console.error("Error saving to Firebase:", error);
        res.redirect('/?success=false');
    }
});

const path = require('path');

app.get('/resume', (req, res) => {
    console.log("resume request");
    const filePath = path.join(__dirname, 'public', 'attached_assets', 'Resume_Updated.pdf');
    res.download(filePath, 'Resume_Updated.pdf'); // Forces download
});




// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
