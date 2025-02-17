import mongoose from 'mongoose';

const StoreSchema = new mongoose.Schema({
  shopifyStoreId: {  
    type: String,  
    required: true,
    unique: true, 
  },
  timers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Timer',
  }],
});

const Store = mongoose.model('Store', StoreSchema);
export default Store;
