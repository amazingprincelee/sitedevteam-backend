const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Define the root route
app.get('/', (req, res) => {
    res.send('Welcome to backend');
});

app.use('/api/auth', authRoutes);


// Sync models and start the server
sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server running on http://localhost:3000');
    });
});
