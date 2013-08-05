exports.respond = function (req, res) {
  res.json(400, {error: 'Not a valid coordinate pair'});
};