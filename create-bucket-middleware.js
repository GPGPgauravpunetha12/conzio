module.exports = function (req, res, next) {
  const { name } = req.body;
  if (!name) {
    res.status(400).send({ error: 'Bucket name is required' });
    return;
  }

  if (typeof name !== 'string') {
    res.status(400).send({ error: 'Bucket name must be a string' });
    return;
  }

  if (name.length > 30) {
    res.status(400).send({ error: 'Bucket name must be less than 30 characters' });
    return;
  }

  next();
};
