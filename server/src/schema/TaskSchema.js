import mongoose from 'mongoose';

const TimerSchema = new mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',  
    required: true,
  },
  timerName: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  position:{
    type: String,
    required: true
    
  },

  promotionDescription: {
    type: String, 
    required: true,
  },
  color: {
    type: String, 
    default: 'red',
  },
  size: {
    type: String,
    enum: ['small', 'medium', 'large'],
    default: 'medium', 
  },
  selectOptions: [{
    type: String, 
    enum: ['colorPulse', 'notificationBanner'],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Timer = mongoose.model('Timer', TimerSchema);
export default Timer;
