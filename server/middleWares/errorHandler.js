export default function erroHandler(err, req, res, next) {
  if (err) {
    console.log(err.message,"from error midleware");
    return res.status(500).json({ message: err.message });
  }
  next();
}
