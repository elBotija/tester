module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.originalUrl === '/login') {
    let data = require('./db.json');
    let user = data.users.find(user => user.username === req.body.username && user.password === req.body.password);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: 'wrong login' });
    }
  } else if (req.method === 'GET' && req.originalUrl === '/user') {
    let user = getUserByToken(req);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: 'wrong login' });
    }
  } else if (req.method === 'GET' && req.originalUrl === '/health') {
    next();
  } else {
    let user = getUserByToken(req);
    if (user) {
      next();
    } else {
      res.status(400).json({ message: 'wrong login' });
    }
  }
};

const getUserByToken = req => {
  const token = req.headers['x-token'];
  let data = require('./db.json');
  return data.users.find(user => user.token === token);
};
