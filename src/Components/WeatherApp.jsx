import sunny from "../assets/images/sunny.png"
import cloudy from "../assets/images/cloudy.png"
import rainy from "../assets/images/rainy.png"
import snowy from "../assets/images/snowy.png"
import loadingGif from "../assets/images/loading.gif"
import { useEffect, useState } from "react"




const WeatherApp = () => {
    const [data, setData] = useState({})
    const [location, setLocation] = useState("")
    const [loading, setLoading] = useState(false)
    const apy_key = '3126e976d2467e34de9c958bd7e536be'

    useEffect(() => {
        const fetchDefaultWeather = async () => {
            setLoading(true)
            const defaultLocation = "Brno"
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&appid=${apy_key}`
            const res = await fetch(url)
            const defaultData = await res.json()
            setData(defaultData)
            setLoading(false)
        }
        fetchDefaultWeather()
    }, [])

    const handleInputChange = (e)=> {
        setLocation(e.target.value)
    }


    const search = async () => {
        if(location.trim() !== "") {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${apy_key}`
            const res = await fetch(url)
            const searchData = await res.json()
            console.log(searchData)
            if(searchData.cod !== 200) {
                setData({notFound: true})
            } else {
                setData(searchData)
                setLocation("");
            }   
            setLoading(false)
        }
    }

    const handleKeyDown = (e) => {
        if(e.key === "Enter") {
            search()
        }
    }

    const weatherImages = {
        Clear: sunny,
        Clouds: cloudy,
        Rain: rainy,
        Snow: snowy,
        Haze: cloudy,
        Mist: cloudy,
        Drizzle: rainy
    }

    const weatherImage = data.weather ? weatherImages[data.weather[0].main] : null;

    const backgroundImages = {
        Clear: 'linear-gradient(to top, #f3b07c, #fcd238)',
        Clouds: 'linear-gradient(to top, #57d6d4, #71eeec)',
        Rain: 'linear-gradient(to top, #5bc8fb, #80eaff)',
        Snow: 'linear-gradient(to top, #aff2ff, #fff)',
        Haze: 'linear-gradient(to top, #57d6d4, #71eeec)',
        Mist: 'linear-gradient(to top, #57d6d4, #71eeec)',
        Drizzle: 'linear-gradient(to top, #5bc8fb, #80eaff)'
    }

    const backgroundImage = data.weather ? backgroundImages[data.weather[0].main] : 'linear-gradient(to top, #f3b07c, #fcd238)'

    const currentDate = new Date()

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] 

    const dayOfWeek = daysOfWeek[currentDate.getDay()]
    const month = months[currentDate.getMonth()]
    const dayOfMonth = currentDate.getDate()

    const formattedDate = `${dayOfWeek}, ${dayOfMonth}, ${month}`

  return (
    <div className="container">
        <div className="weather-app" style={{backgroundImage:
                 backgroundImage && backgroundImage.replace ? backgroundImage.replace('to right', 'to top') : null,}}>
            <div className="search">
                <div className="search-top">
                    <i className="fa-solid fa-location-dot"></i>
                    <div className="location">{data.name}</div>
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Enter location" value={location} onChange={handleInputChange} onKeyDown={handleKeyDown}/>
                    <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
                </div>
            </div>
            {loading ? (
                <img className="loader" src={loadingGif} alt="loading" /> ) : data.notFound ? (<div className="not-found">Not Found 😒 </div>) : (
                <>
                <div className="weather">
                    <img src={weatherImage} alt="sunny" />
                    <div className="weather-type">{data.weather ? data.weather[0].main : null}</div>
                    <div className="temp">{data.main ? `${Math.floor(data.main.temp)}°` : null}</div>                
            </div>
            <div className="weather-date">
                <p>{formattedDate}</p>
            </div>    
            <div className="weather-data">
                <div className="humidity">
                    <div className="data-name">Humidity</div>
                    <i className="fa-solid fa-droplet"></i>
                    <div className="data">{data.main ? data.main.humidity : null}%</div>
                </div>
                <div className="wind">
                    <div className="data-name">Wind</div>
                    <i className="fa-solid fa-wind"></i>
                    <div className="data">{data.main ? data.wind.speed : null} km/h</div>
                </div>
            </div>
            </>
        )}
            </div>
        </div>
    
  )
}

export default WeatherApp