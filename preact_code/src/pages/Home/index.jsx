import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';
import './style.css';

export function Home() {
  const [timerData, setTimerData] = useState(null);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/timers/get', {
          params: {
            storeId: '123',
            timerId: '67b31305c364340587c0b8f2'
          }
        });

        const data = response.data;
        setTimerData(data);

        if (!data || !data.endTime) {
          setError('Invalid timer data received');
          return;
        }

        const endTimeDate = new Date(data.endTime);
        if (isNaN(endTimeDate.getTime())) {
          setError('Invalid end time format');
          return;
        }

        const currentTime = new Date();
        const timeDiff = Math.max(0, Math.floor((endTimeDate - currentTime) / 1000));
		console.log(timeDiff)
        setTimeLeft(timeDiff);
        setIsUrgent(timeDiff <= 300);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  if (error) return <div className="error">Error: {error}</div>;
  if (!timerData || timeLeft === null) return <div className="loading">Loading...</div>;

  const { timerName, startTime, endTime, promotionDescription, selectOptions, color, size, position } = timerData;

  const days = Math.floor(timeLeft / (3600 * 24));
  const hours = Math.floor((timeLeft % (3600 * 24)) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const countdownStyle = {
    color: isUrgent ? 'red' : color || 'black',  
    fontSize: size === 'small' ? '12px' : size === 'medium' ? '16px' : '20px',  
  };

  const positionStyle = {
    position: 'absolute',
    [position.toLowerCase()]: '20px',  
  };

  return (
    <div className="timer-container" style={positionStyle}>
      <div>
        <img src="https://images.pexels.com/photos/2587370/pexels-photo-2587370.jpeg" width={200} height={200} />
      </div>
      <div>
        <h2>{timerName}</h2>
        <p>{promotionDescription}</p>
        <div className="countdown-box" style={countdownStyle}>
          <p>YOUR SPECIAL OFFER ENDS IN</p>
          <p className="countdown">
            {days > 0 && `${days} Days `}
            {hours > 0 && `${hours} Hours `}
            {minutes > 0 && `${minutes} Minutes `}
            {seconds > 0 && `${seconds} Seconds`}
          </p>
        </div>
      </div>
    </div>
  );
}
