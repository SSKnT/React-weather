// Desc: This file contains the left panel of the application. It contains the search bar and the weather data of the city.
import { motion } from 'framer-motion';

export default function LeftPanel({city,setCity, weatherData}) {
    

    return (
        <>
            <SearchCity setCity={setCity} />
            <CityWeather  weatherData={weatherData}/>
        </>
    );
}

function SearchCity({ setCity }) {
    const handleSearch = () => {
        const city = document.getElementById('search').value;
        setCity(city);
    };

    const handleKeyDown = (event) => {
        if(event.key === 'Enter'){
            handleSearch();
        }
    }

    return (
        <div className="pt-5 text-left mx-5">
            <input className="search-bar px-2 form-floating" type="text" placeholder="Search city" onKeyDown={handleKeyDown} id="search" />
        </div>
    );
}

function CityWeather({ weatherData }) {
   

    if (!weatherData) {
        return <div className="text-center"></div>;
    }

    const time = weatherData.ob_time.split(' ')[1];

    const data = [
        
        { content: <WeatherIcon src={`https://www.weatherbit.io/static/img/icons/${weatherData.weather.icon}.png`} />, className:"weather-img" },
        { content: <h1>{weatherData.temp}<span>&deg;C</span></h1>, className: "mb-5 temp" },
        { content: <h3>{weatherData.weather.description}</h3>, className: "mb-6 desc text-muted" },
        { content: <p>Today - {time}</p>, className: "mb-0 text-muted " },
        { content: <p><i className="fas fa-map-marker-alt"></i> {`${weatherData.city_name}`}</p>, className: "mt-0 text-muted" }
    ];

    return (
        <div className="text-center text-light">
          
            {data.map((item, index) => (
                <div key={index} className={`${item.className ? item.className : 'mb-5'}`}>
                    {item.content}
                </div>
            ))}
         
        </div>
    );
}

function WeatherIcon({ src }) {
    return (
        <img src={src} alt="weather icon" />
    );
}
 