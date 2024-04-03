const express = require('express');
const memberController = require('../controllers/member.controller')

const router = express()


router.get("/getmembers", memberController.getAll)

router.get("/getmember/:id", memberController.getMember)

router.get("/", memberController.ping)

router.post("/postmember", memberController.postMember)

router.put("/editmember/:id", memberController.editMember)

router.delete("/deletemember/:id", memberController.deleteMember)

module.exports = router;