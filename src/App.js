import { useState } from "react"

const api = { key: "7d3cae9df013e6b21f5ddf71fdf1b9cc", base: "https://api.openweathermap.org/data/2.5/" }

function App() {
    const [query, setQuery] = useState("")
    const [weather, setWeather] = useState({})

    const search = (evt) => {
        if (evt.key == "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
                .then((res) => res.json())
                .then((result) => {
                    setWeather(result)
                    setQuery("")
                    console.log(result)
                })
        }
    }

    const dateBuilder = (date) => {
        let currentDate = String(date)
        let day = currentDate.slice(3, 15)
        let pm = true
        let hour = (hr) => {
            if (hr > 12) {
                pm = true
            } else {
                pm = false
            }
            return hr > 12 ? hr - 12 : hr
        }
        let time = hour(parseFloat(currentDate.slice(16, 19))) + ":" + currentDate.slice(19, 21)
        return `${day} at ${time} ${pm ? "PM" : "AM"}` //day + " at " + time
    }

    return (
        <div className={typeof weather.main != "undefined" ? (weather.main.temp > 14 ? "app warm" : "app") : "app"}>
            <main>
                <div className='search-box'>
                    <input
                        type='text'
                        className='search-bar'
                        placeholder='Search...'
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                    ></input>
                </div>
                {typeof weather.main != "undefined" ? (
                    <>
                        <div className='location-box'>
                            <div className='location'>
                                {weather.name}, {weather.sys.country}
                            </div>
                            <div className='date'>{dateBuilder(new Date())}</div>
                        </div>
                        <div className='weather-box'>
                            <div className='temperature'>{Math.round(weather.main.temp)}°C</div>
                            <div className='weather'>{weather.weather[0].main}</div>
                        </div>
                    </>
                ) : (
                    ""
                )}
            </main>
        </div>
    )
}

export default App
