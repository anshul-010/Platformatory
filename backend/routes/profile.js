import express from 'express';
import ProfileSchema from '../models/ProfileSchema.js';

const router = express.Router();

router.get('/:email', async (req, res) => {
  try {
    const profile = await ProfileSchema.findOne({ email: req.params.email });
    res.send(profile || {});
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch profile' });
  }
});

router.post('/update', async (req, res) => {
  try {
    const profile = await ProfileSchema.findOneAndUpdate(
      { email: req.body.email },
      req.body,
      { upsert: true, new: true }
    );
    res.send(profile);
  } catch (error) {
    res.status(500).send({ error: 'Failed to update profile' });
  }
});

export default router;