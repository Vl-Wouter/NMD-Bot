import mongoose from 'mongoose';

const { Schema } = mongoose;

const PersonSchema = new Schema({
    name: { type: String, required: true, max: 128 },
    image: { type: String, required: true },
    description: { type: String, required: true },
    descriptionNL: { type: String, required: true },
  });
  
  export default mongoose.model('Person', PersonSchema);
