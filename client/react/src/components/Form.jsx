import { useState } from "react";
import "../App.css";

const TimerForm = () => {
  const [showFields, setShowFields] = useState(false);
  const [timerData, setTimerData] = useState({
    shopifyStoreId: "123",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    timerName: "",
    promotionDescription: "",
    color: "#000000",
    size: "",
    position: "",
    notificationBannerType: "",

    selectedOption: "",
  });

  const handleChange = (e) => {
    setTimerData({ ...timerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/timers/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(timerData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to create timer");
      }

      alert("Timer created successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="timer-container">
      <div className="form-container">
        {!showFields && (
          <button onClick={() => setShowFields(true)} className="add-button">
            + Add
          </button>
        )}
        <div className="input-grid">
          <div className="main">
            <input
              type="date"
              name="startDate"
              value={timerData.startDate}
              onChange={handleChange}
              className="input-field"
              required
            />
            <input
              type="time"
              name="startTime"
              value={timerData.startTime}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div className="main">
            <input
              type="date"
              name="endDate"
              value={timerData.endDate}
              onChange={handleChange}
              className="input-field"
              required
            />
            <input
              type="time"
              name="endTime"
              value={timerData.endTime}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div className="main">
          <input
              type="text"
              name="timerName"
              value={timerData.timerName}
              placeholder="Promotion Timer Name"
              onChange={handleChange}
              className="input-field"
            />

            <input
              type="text"
              name="promotionDescription"
              value={timerData.promotionDescription}
              placeholder="Promotion Description"
              onChange={handleChange}
              className="input-field"
            />
          </div>
        </div>

        {showFields && (
          <div className="extra-fields">
           
            <input
              type="color"
              name="color"
              value={timerData.color}
              onChange={handleChange}
              className="input-field"
            />
            <select name="size" value={timerData.size} onChange={handleChange} className="input-field">
              <option value="">Select Size</option>
              <option value="small">small</option>
              <option value="medium">medium</option>
              <option value="large">large</option>
            </select>
            <select name="position" value={timerData.position} onChange={handleChange} className="input-field">
              <option value="">Select Position</option>
              <option value="Top">Top</option>
              <option value="Bottom">Bottom</option>
              <option value="Left">Left</option>
              <option value="Right">Right</option>
            </select>
            <select name="urgencyNotification" value={timerData.selectedOption} onChange={handleChange} className="input-field">
              <option value="">Urgency Notification Type</option>
              <option value="notificationBanner">notificationBanner</option>
              <option value="colorPulse">colorPulse</option>
            </select>
          </div>
        )}

        <div className="lst_btn">
          <button className="save-button" onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default TimerForm;
