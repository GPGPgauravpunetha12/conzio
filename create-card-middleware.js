module.exports = function (req, res, next) {
    const { name ,link} = req.body;
    if (!name) {
      res.status(400).send({ error: 'cardname and link is required' });
      return;
    }
  
    if (typeof name !== 'string'&&typeof link !== 'string') {
      res.status(400).send({ error: 'cardname and link must be a string' });
      return;
    }
  
    if (name.length > 30) {
      res.status(400).send({ error: 'Bucket name must be less than 30 characters' });
      return;
    }

    const bucketId = req.params.id;
    const cards = allCards.filter(card => card.bucketId === bucketId);
    res.json(cards);


    next();
  };
  