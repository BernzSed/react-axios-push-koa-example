import express from 'express';

const router = express.Router();

router.get('/foo', function (req, res, next) {
  global.console.log('/api/foo called');
  res.send({
    'bar': 'bar'
  });
});

export default router;
