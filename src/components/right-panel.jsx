import axios from 'axios';
import { useState , useEffect } from "react";

export default function RightPanel({weatherData, city, mode, setMode}) {

    if (!weatherData) {
        return <div className="text-center"></div>;
    }

    return (
        <>
            <Mode_Switch setMode={setMode} mode={mode}/>
            <Forecast_box city={city} mode={mode}/>
            <Details weatherData={weatherData}/>
        </>
    )

}

function Mode_Switch({setMode, mode}){

    function handleSwitch(value){
        if(mode === value)
        {
            return;
        }
        setMode(value);
    }

    return(
        <div className="text-right mt-4 pr justify-content-end d-flex">
            <button className="btn m-1 colu rounded-circle btn-info" onClick={ () => handleSwitch('M')} >C</button>
            <button className="btn m-1 colu rounded-circle btn-info" onClick={ () => handleSwitch('I')}>F</button>
        </div>
    )

}

function Forecast_box({ city , mode }){

    const [forecastData, setForecastData] = useState(null);

    useEffect(() => {
        if(city){
        axios.get("https://api.weatherbit.io/v2.0/forecast/daily",{
            params:{
                    city:city,
                    units:mode,
                    key:'',         /* API key */ 
                    days:5,
                },
            })
            .then(
                (response)=>{
                    setForecastData(response.data.data);
                    
                }
            )
            .catch((error)=>{
              console.log(error);
            })
        }
    }
    ,[city , mode]);

    if(!forecastData){
        return <div className="text-center"></div>;
    }

    return(
        <div className="d-flex forcast-box">
            <Weather_card data={forecastData[0]} special={true}/>
            <Weather_card data={forecastData[1]}/>
            <Weather_card data={forecastData[2]}/>
            <Weather_card data={forecastData[3]}/>
            <Weather_card data={forecastData[4]}/>

        </div>
    )

}

function Weather_card({data, special}){


    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { weekday: 'short', day: 'numeric', month: 'short' };
        return date.toLocaleDateString(undefined, options);
    }
    
    return(
        <div className="card">
            <div className="card-body">
                <h5 className="card-title fw-light fs-5">{special ? 'Tomorrow': formatDate(data.datetime) }</h5>
                <img src={`https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png`} alt="weather icon" className=" resize-img " />
                <div className="d-flex justify-content-between">
                    <p className="text2">{`${data.temp} \u00B0C`}</p>
                    <p className="text2 text-muted">{`${data.min_temp} \u00B0C`} </p>
                </div>
            </div>
        </div>
        )
}

function Details({weatherData}){

    return(
        <div className="detail">
                <h3 className=" mx-1 text-light " >Today's Highlights</h3>
                <div className="d-flex me mb-2 ">    
                    <Detail_card name='Wind Status' value={weatherData.wind_spd} unit={'mph'} icon={<i class="fas fa-wind"></i>}/>
                    <Detail_card name='Humidity' value={weatherData.rh} unit={'%'} icon={<i class="fas fa-tint"></i>} />
                </div>
                <div className="d-flex me ">
                    <Detail_card name='Visibility' value={weatherData.vis} unit={'miles'} icon={<i class="fas fa-eye"></i>}/>
                    <Detail_card name='Air Pressure' value={weatherData.pres} unit={'mb'} icon={<i class="fas fa-tachometer-alt"></i>}/>
                </div>

        </div>
    )
}

function Detail_card({name , value , unit , icon}){
    return(
        <div className="card detail-card">
            <div className="card-header">
                <h5 className="text1">{name}</h5>
            </div>
            <div className="card-body d-flex">
                <h2 className="text1-1 icon-left" >{icon}</h2>
                <h2 className=" text-light text1-1  ">{value}</h2>
                <h3 className=" pt-3  ">&nbsp;{unit}</h3>
            </div>
        </div>
        )
}