import React, { useEffect, useState } from 'react';

export default function WeatherWidget() {
  const [temperature, setTemperature] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Fetch weather data
    const fetchWeatherData = async () => {
      try {
        const response = await fetch('https://api.weatherapi.com/v1/current.json?key=b0da121a234d47d3bc961545232706&q=New York');
        const data = await response.json();
        setTemperature(data.current.temp_c);
        setDescription(data.current.condition.text);
      } catch (error) {
        console.log('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();

    // Update weather data every 5 minutes
    const interval = setInterval(fetchWeatherData, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p className="temperature">Temperature: {temperature} &#8451;</p>
      <p className="description">Description: {description}</p>
    </div>
  );
}

const NotepadWidget = () => {
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);

  const handleChange = (e) => {
    setNotes(e.target.value);
  };

  const handleSave = () => {
    if (notes.trim() !== '') {
      setSavedNotes([...savedNotes, notes]);
      setNotes('');
    }
  };

  return (
    <div>
      <h2>Notepad Widget</h2>
      <textarea
        value={notes}
        onChange={handleChange}
        placeholder="Write your notes here..."
      />
      <button onClick={handleSave}>Save</button>
      {savedNotes.length > 0 && (
        <div>
          <h3>Saved Notes</h3>
          <ul>
            {savedNotes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export { WeatherWidget, NotepadWidget };
