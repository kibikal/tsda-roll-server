const express = require("express");
const mongoose = require("mongoose");
const moment = require("moment");

const router = express.Router();
const registrantTemplateCopy = require("../models/registerModels");
const newIdTemplateCopy = require("../models/memberIdModels");

const registeredStaff = mongoose.model("registeredStaff");

console.log(moment("2023-03-25T00:00:00.000Z").format("LL"));

// function idToThreeSf(id) {
//   let zeroes = new Array(3 + 1).join("0");
//   return (zeroes + id).slice(-3);
// }

router.post("/register", (req, res) => {
  newIdTemplateCopy.findOneAndUpdate(
    { id: "autoval" },
    { $inc: { seq: 1 } },
    { new: true },
    (err, counterData) => {
      let seqId;
      if (counterData == null) {
        const newID = new newIdTemplateCopy({ id: "autoval", seq: 1 });
        newID.save();
        seqId = 1;
      } else {
        seqId = counterData.seq;
      }
      const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const options = { year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString("en-US", options);
      };

      const registeredPerson = new registrantTemplateCopy({
        serialNumber: seqId,
        fullName: req.body.fullName,
        staffID: req.body.staffID,
        job: req.body.job,
        dateOfBirth: formatDate(req.body.dateOfBirth),
        ssnit: req.body.ssnit,
        ghCard: req.body.ghCard,
        unit: req.body.unit,
        department: req.body.department,
        tel: req.body.tel,
        leaveStart: formatDate(req.body.leaveStart),
        leaveEnd: formatDate(req.body.leaveEnd),
        region: req.body.region,
        comment: req.body.comment,
        bank: req.body.bank,
        accountNumber: req.body.accountNumber,
        payrollStatus: req.body.payrollStatus,
        post: req.body.post,
        leaveType: req.body.leaveType
      });

      console.log(req.body.comment);

      registeredPerson
        .save()
        .then((data) => {
          res.json(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  );
});

router.get("/registered", async (req, res) => {
  try {
    const staff = await registeredStaff.find({});
    res.send(staff);
  } catch (err) {
    console.log(err);
  }
});

router.get("/", (req, res) => res.send("Testing!"));

module.exports = router;
