const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const path = require('path');
const connectDB = require('./config/db.js');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo'); // Import connect-mongo

// Ensure dotenv is configured before anything else
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));


// Session and Flash Middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'javacoder_secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || "mongodb+srv://mohdirfan70097:M5Qh9P6RwIkJ2sup@cluster0.jvnobnt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", // Use the Mongo URI for session store
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day expiration
}));

app.use(flash());

// Static files and EJS setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Global flash message middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Routes
app.use('/', require('./routes/indexRoutes'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/dashboard', require('./routes/dashboardRoutes'));
app.use("/" , require("./routes/courseRoutes.js"));
app.use("/" ,require("./routes/lectureRoutes.js"));
app.use("/" ,require("./routes/StudentRoutes.js"));
app.use("/" ,require("./routes/TransferRoute.js"));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
