export default function erroHandler(err, req, res, next) {
  if (err) {
    console.log(err.message,"kkkkkkkk");
    return res.status(500).json({ message: err.message });
  }
  next();
}
