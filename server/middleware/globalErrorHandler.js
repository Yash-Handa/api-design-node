module.exports = function () {
  return (err, req, res, next) => {
    console.log(err);
    res.status(500).send(err);
  }
}
