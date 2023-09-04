import React,{useState} from "react";



const Weather=()=>{
    const [input, setInput]=useState("");
    const [weatherData, setWeatherData]=useState("");
    const [error, setError]=useState('');

    function fetchData(){
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=97841debd95d08295da0d78ccc28ba17&units=metric`)
        .then(res=>res.json())
        .then(res=>setWeatherData(res))
        .catch(error=>{console.log(error);
            setError(error);
        })
    }


    function handleKeyPress(e){
        if(e.key === 'Enter'){
            fetchData();
            setInput('');
        }
    }




    return (
        <div>
            <input type="text" value={input} onKeyDown={handleKeyPress} onChange={(e)=>setInput(e.target.value) } placeholder="Enter a City"/>
            {error && <p>{error}</p>}
            {
                !error && weatherData && 
                <div className="weather">
                    <h1 className="city">
                        {weatherData.name}
                    </h1>
                    <h1 className="temp">
                        {weatherData.main.temp}
                    </h1>
                    <p className="status">
                        {weatherData.weather[0].main}
                    </p>
                    <div className="weather-img">
                            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} className="img"/>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Weather;