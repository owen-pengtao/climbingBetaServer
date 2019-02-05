const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routeSchema = new Schema({
  zoneId: {
    type: String,
    required: true,
  },
  totalBetas: {
    type: Number,
    required: true,
  },
  routeSetter: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
  },
});

export default mongoose.model('Route', routeSchema);
