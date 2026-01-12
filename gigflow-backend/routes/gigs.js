const express = require('express');
const {
  createGig,
  getGigs,
  getGig,
  updateGig,
  deleteGig,
  getMyGigs
} = require('../controllers/gigController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', getGigs);
router.get('/my-gigs', auth, getMyGigs);
router.get('/:id', getGig);
router.post('/', auth, createGig);
router.put('/:id', auth, updateGig);
router.delete('/:id', auth, deleteGig);

module.exports = router;