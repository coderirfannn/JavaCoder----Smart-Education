
const express = require('express');
const router = express.Router();
// const User = require("../models/User");
// const Rating = require('../models/Rating');
// const TransferredTeacher = require('../models/TransferredTeacher');





// router.get('/teachers/transfer', async (req, res) => {
//     try {
//       const teachers = await User.find({ role: 'teacher' });
  
//       for (const teacher of teachers) {
//         const ratings = await Rating.find({ teacher: teacher._id });
  
//         const avgRating = ratings.length
//           ? ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length
//           : 0;
  
//         // If avg rating > 4 and not already transferred
//         if (avgRating > 2) {
//           const alreadyTransferred = await TransferredTeacher.findOne({ teacher: teacher._id });
  
//           if (!alreadyTransferred) {
//             await TransferredTeacher.create({
//               teacher: teacher._id,
//               averageRating: avgRating,
//               isTransferred: true
//             });
//           }
//         }
//       }
  
//       const transferredTeachers = await TransferredTeacher.find({ isTransferred: true }).populate('teacher');
  
//       // Just sending as response for now
//     //   res.send(transferredTeachers);
  
//       // To render to EJS:
//       console.log(transferredTeachers);
      
//       res.render("teachers/transfer-list", { teachers: transferredTeachers });
  
//     } catch (err) {
//       console.error("Transfer error:", err);
//       res.status(500).send("Server error");
//     }
//   });




//   router.post("/teachers/transfer/:id", async (req, res) => {
//     try {
//       const teacherId = req.params.id;
  
//       // Check if already transferred
//       const alreadyTransferred = await TransferredTeacher.findOne({ teacher: teacherId });
//       if (alreadyTransferred) {
//         req.flash('error_msg', 'Teacher already transferred.');
//         return res.redirect("/teachers/transfer");
//       }
  
//       // Get teacher's ratings
//       const ratings = await Rating.find({ teacher: teacherId });
  
//       const avgRating = ratings.length
//         ? ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length
//         : 0;
  
//       if (avgRating <= 4) {
//         req.flash('error_msg', 'Teacher does not meet transfer criteria (avg rating must be > 4).');
//         return res.redirect("/teachers/transfer");
//       }
  
//       // Save transfer entry
//       await TransferredTeacher.create({
//         teacher: teacherId,
//         averageRating: avgRating,
//         isTransferred: true
//       });
  
//       req.flash('success_msg', 'Teacher transferred successfully.');
//       res.redirect("/teachers/transfer");
//     } catch (err) {
//       console.error(err);
//       req.flash('error_msg', 'Failed to transfer teacher.');
//       res.redirect("/teachers/transfer");
//     }
//   });
//

const User = require('../models/User');
const Rating = require('../models/Rating');
const TransferredTeacher = require('../models/TransferredTeacher');

router.get('/teachers/transfer', async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher' });
    const eligibleTeachers = [];

    for (const teacher of teachers) {
      const ratings = await Rating.find({ teacher: teacher._id });

      const avgRating = ratings.length
        ? ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length
        : 0;

      const alreadyTransferred = await TransferredTeacher.findOne({ teacher: teacher._id });

      // Only push teacher if they are eligible and not transferred
      if (avgRating > 2 && !alreadyTransferred) {
        eligibleTeachers.push({
          _id: teacher._id,
          fullName: teacher.fullName,
          email: teacher.email,
          avgRating
        });
      }
    }

    res.render("teachers/transfer-list", { teachers: eligibleTeachers });

  } catch (err) {
    console.error("Transfer error:", err);
    res.status(500).send("Server error");
  }
});

router.post("/teachers/transfer/:id", async (req, res) => {
    try {
      const teacherId = req.params.id;
  
      const ratings = await Rating.find({ teacher: teacherId });
      const avgRating = ratings.length
        ? ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length
        : 0;
  
      await TransferredTeacher.create({
        teacher: teacherId,
        averageRating: avgRating,
        isTransferred: true
      });
  
      req.flash('success_msg', 'Teacher transferred successfully.');
      res.redirect("/teachers/transfer");
    } catch (err) {
      console.error(err);
      req.flash('error_msg', 'Failed to transfer teacher.');
      res.redirect("/teachers/transfer");
    }
  });
  


  router.get("/dashboard/teacher-list", async (req, res) => {
    const teachers = await User.find({ role: 'teacher' });
    res.render("teachers/teacherlist", { teachers });
    // res.send(teachers)
  });
  






// const TransferredTeacher = require('../models/TransferredTeacher'); // make sure this is imported


module.exports = router;