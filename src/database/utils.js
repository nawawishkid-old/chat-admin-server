exports.updateDate = function updateDate(next) {
  const now = new Date();

  this.updated_at = now;

  if (!this.created_at) {
    this.created_at = now;
  }

  next();
};