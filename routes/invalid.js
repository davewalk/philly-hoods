exports.respond = function (req, res) {
  res.send(400, {error: 'Not a valid coordinate pair'});
};