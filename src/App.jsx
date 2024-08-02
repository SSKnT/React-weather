import './App.css';
import LeftPanel from './components/left-panel.jsx';
import RightPanel from './components/right-panel.jsx';
import axios from 'axios';
import { useEffect, useState } from "react";

function App() {

  const [city, setCity] = useState('');
  const [mode, setMode] = useState('M')
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
      if (city) {
          axios.get(`https://api.weatherbit.io/v2.0/current`, {
              params: {
                  city: city,
                  units: mode,
                  key: '',/* Your api_key */
                  
              },
          })
          .then((response) => {
              setWeatherData(response.data.data[0]);
          })
          .catch((error) => {
              console.log(error);
          });
      }
  }, [city , mode]);

  return (
   <div className='container-fluid min-vh-100 m-0'>
      <div className='row min-vh-100'>
        <div className=' col-4 left-panel'>
            <LeftPanel city={city} setCity={setCity} weatherData={weatherData}/>
        </div>
        <div className='col-8 right-panel'>
            <RightPanel weatherData={weatherData} city={city} mode={mode} setMode={setMode}/>
        </div>    
      </div>
   </div>
  );
}

export default App;
