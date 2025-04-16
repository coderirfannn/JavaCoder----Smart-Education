const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        req.flash('error_msg', 'Please log in first');
        return res.redirect('/auth/login');
    }
    next();
};

const checkRole = (role) => {
    return (req, res, next) => {
        if (!req.session.user || req.session.user.role.toLowerCase() !== role.toLowerCase()) {
            req.flash('error_msg', `Access restricted to ${role}s only`);
            return res.redirect('/dashboard');
        }
        next();
    };
};

const isStudent = checkRole('student');
const isTeacher = checkRole('teacher');
const isAdmin = checkRole('admin');

module.exports = { isAuthenticated, isStudent, isTeacher, isAdmin };
