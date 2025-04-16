const User = require('../models/User');

// @desc    Show registration form
exports.showRegister = (req, res) => {
    res.render('auth/register');
};

// @desc    Register user
exports.registerUser = async (req, res) => {
    const { fullName, email, password, role } = req.body;

    try {
        // Check if user already exists by email
        let user = await User.findOne({ email });
        if (user) {
            req.flash('error_msg', 'Email already registered');
            return res.redirect('/auth/register');
        }

        // Ensure role is in lowercase
        const roleLowerCase = role.toLowerCase();

        // Create new user
        user = new User({ fullName, email, password, role: roleLowerCase });
        
        // Save the user in the database
        await user.save();

        // Store the user in session after registration
        req.session.user = user;  // Save user info in session

        req.flash('success_msg', 'Registration successful');
        res.redirect('/dashboard'); // Redirect to dashboard after successful registration
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Something went wrong during registration');
        res.redirect('/auth/register');
    }
};

// @desc    Show login form
exports.showLogin = (req, res) => {
    res.render('auth/login');
};

// @desc    Login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        
        // Check if user exists and password is correct
        if (!user || !(await user.matchPassword(password))) {
            req.flash('error_msg', 'Invalid email or password');
            return res.redirect('/auth/login');
        }

        // Store the user in session after successful login
        req.session.user = user;  // Save user info in session

        req.flash('success_msg', 'Logged in successfully');
        res.redirect('/dashboard'); // Redirect to dashboard after successful login
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Something went wrong during login');
        res.redirect('/auth/login');
    }
};

// @desc    Logout user
// exports.logoutUser = (req, res) => {
//     // Clear the user session on logout
//     req.session.destroy((err) => {
//         if (err) {
//             console.error(err);
//             req.flash('error_msg', 'Something went wrong during logout');
//             return res.redirect('/');
//         }

//         req.flash('success_msg', 'You are logged out');
//         res.redirect('/auth/login'); // Redirect to login after logout
//     });
// };

exports.logoutUser = (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error("Session destroy error:", err);
        return res.redirect('/');
      }
  
      console.log("User logged out, redirecting to login");
      res.redirect('/auth/login');
    });
  };
  