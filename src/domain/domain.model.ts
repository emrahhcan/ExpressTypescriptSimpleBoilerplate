import mongoose from 'mongoose';

const DomainSchema = new mongoose.Schema({
  // Define the properties of the domain model here
  something: {
    type: String,
    default: null,
  },
});

export const Domain = mongoose.model('domain', DomainSchema);

export interface IDomain {
  // Define the properties of the domain model here for type checking
  something: string;
}
