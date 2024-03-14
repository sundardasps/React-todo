import bcrypt from  'bcrypt'

export default function passwordHasher(password) {
  const pass = bcrypt.hash(password, 10);
  return pass;
}