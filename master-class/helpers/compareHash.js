function compareHash(a, b) {
  return bcrypt.compareSync(a, b);
}
