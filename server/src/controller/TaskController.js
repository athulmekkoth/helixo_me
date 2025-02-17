import Store from "../schema/StoreSchema.js";
import Timer from "../schema/TaskSchema.js";


export const createTimer = async (req, res) => {
  try {
    const { 
      shopifyStoreId, 
      timerName, 
      startTime,
      startDate, 
      endDate, 
      endTime, 
      promotionDescription, 
      color, 
      size, 
      position, 
      urgencyNotification = []
    } = req.body;

    if (!timerName || !promotionDescription) {
      return res.status(400).json({ message: "timerName and promotionDescription are required" });
    }

    let store = await Store.findOne({ shopifyStoreId });
    if (!store) {
      store = new Store({ shopifyStoreId, timers: [] });
      await store.save();
    }

   
    if (!startDate || !endDate) {
      return res.status(400).json({ message: "startDate and endDate are required" });
    }

   
    const formattedStartDate = new Date(`${startDate}T${startTime}:00Z`);
    const formattedEndDate = new Date(`${endDate}T${endTime}:00Z`);

    
    if (isNaN(formattedStartDate.getTime()) || isNaN(formattedEndDate.getTime())) {
      return res.status(400).json({ message: "Invalid startDate/startTime or endDate/endTime format" });
    }

    const validSizes = ["small", "medium", "large"];
    if (!validSizes.includes(size)) {
      return res.status(400).json({ message: "Invalid size value" });
    }

    const newTimer = new Timer({
      storeId: store._id,
      timerName,
      startTime: formattedStartDate,
      endTime: formattedEndDate,
      promotionDescription,
      color,
      size,
      position,
      selectOptions: urgencyNotification,
      updatedAt: new Date(),
    });

    await newTimer.save();
    store.timers.push(newTimer._id);
    await store.save();

    res.status(201).json({ message: "Timer created successfully", timer: newTimer });
  } catch (err) {
    console.error("Error creating timer:", err);
    res.status(500).json({ message: "Error creating timer", error: err.message });
  }
};


export const updateTimer = async (req, res) => {
  try {
    const { timerId } = req.params;
    const { timerName, startTime, endTime, urgencyStartTime, promotionDescription, color, size, notificationBannerType, pulseEffect, selectOptions, active } = req.body;

    const updatedTimer = await Timer.findByIdAndUpdate(
      timerId,
      { timerName, startTime, endTime, urgencyStartTime, promotionDescription, color, size, notificationBannerType, pulseEffect, selectOptions, active },
      { new: true } 
    );

    if (!updatedTimer) {
      return res.status(404).json({ message: 'Timer not found' });
    }

    res.status(200).json({ message: 'Timer updated successfully', timer: updatedTimer });
  } catch (err) {
    console.error('Error updating timer:', err);
    res.status(500).json({ message: 'Error updating timer', error: err.message });
  }
};




export const getTimerByStore = async (req, res) => {
    try {
      const { storeId, timerId } = req.query; 
console.log(storeId,timerId)
        if (!storeId || !timerId) {
            return res.status(400).json({ message: "Store ID and Timer ID are required" });
        }

       
        const store = await Store.findOne({ shopifyStoreId: storeId }).populate("timers");

        if (!store) {
            return res.status(404).json({ message: "Store not found" });
        }

      
        const timer = store.timers.find(t => t._id.toString() === timerId);

        if (!timer) {
            return res.status(404).json({ message: "Timer not found in this store" });
        }

        res.status(200).json(timer);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
