const express = require('express');
const {
  createBid,
  getGigBids,
  hireBid
} = require('../controllers/bidController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, createBid);
router.get('/:gigId', auth, getGigBids);
router.patch('/:bidId/hire', auth, hireBid);

module.exports = router;