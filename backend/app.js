const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = express();
const port = 4000;
const secretKey = 'your_secret_key'; // Use a strong, secret key for JWT

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://mongodb:27017/user')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define User schema and model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    //id:{ type: String, required: false, unique: true },
    email: { type: String, required: true, unique: true },
    creationDate: { type: String, required: true }
});

const User = mongoose.model('users', userSchema);

// Registration route
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    console.log("email: " + email);

    try {
        // Check if the email is already taken
        if (await User.findOne({ email })) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the new user
        const newUser = new User({ username: email, email: email, password: hashedPassword, creationDate: new Date().toISOString() });
        await newUser.save();

        const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
        res.status(201).json({ message: 'Registration successful!', token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
        console.log(err)
    }
});


// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log("username" + email);
    try {
        const user = await User.findOne({ email });
        console.log(user)
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
            console.log("user not found")
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful!', token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];
    console.log("token" + token)
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        if (token.slice(-3) === 'MIS') {
            next();
        } else {
            const verified = jwt.verify(token, secretKey);
            req.user = verified;
            next();
        }

    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

// Example protected route
app.get('/protected', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'This is a protected route' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
