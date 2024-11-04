import mongoose from 'mongoose';
import Movie from './Movie';

const ListSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    type: { type: String },
    genre: { type: String },
    content: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
  },
  { timestamps: true }
);

const List = mongoose.models.List || mongoose.model('List', ListSchema);

export default List;
