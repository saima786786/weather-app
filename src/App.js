import React from 'react';
import 'weather-icons/css/weather-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Temp from './Components/Temp';
import './App.css';


const API_key='2840a760dc712b440fac59b123c576c2';

class App extends React.Component{

  constructor(){
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false,
      query: 'rourkela'
    };
  }

  componentDidMount(){
    this.getWeather();
  

  this.weatherIcon = {
    Thunderstrorm:"wi-thunderstorm",
    Drizzle:"wi-select",
    Rain:"wi-storm-showers",
    Snow:"wi-snow",
    Atmosphere:"wi-fog",
    Clear:"wi-day-sunny",
    Clouds:"wi-day-fog"
  };
}
calCelsius(temp){
  let cell = Math.floor(temp-273.15);
  return cell;
}

get_WeatherIcon(icons,rangeId){
  switch (true) {
    case rangeId >= 200 && rangeId <=232:
    this.setState({icon:icons.Thunderstrorm});
    break;
    case rangeId >= 300 && rangeId <=321:
    this.setState({icon:icons.Drizzle});
    break;
    case rangeId >= 500 && rangeId <=531:
    this.setState({icon:icons.Rain});
    break;
    case rangeId >= 600 && rangeId <=622:
    this.setState({icon:icons.Snow});
    break;
    case rangeId >= 701 && rangeId <=781:
    this.setState({icon:icons.Atmosphere});
    break;
    case rangeId === 800:
    this.setState({icon:icons.Clear});
    break;
    case rangeId >= 801 && rangeId <=804:
    this.setState({icon:icons.Clouds});
    break;
    default:
    this.setState({icon:icons.Clouds});  
  }
}


getWeather = async () => {
  const api_call = await fetch(`https:api.openweathermap.org/data/2.5/weather?q=${this.state.query},in&appid=${API_key}`
  );

const response = await api_call.json();
console.log({response});

this.setState({
  city:response.name,
  country:response.sys.country,
  celsius:this.calCelsius(response.main.temp),
  temp_max:this.calCelsius(response.main.temp_max),
  temp_min:this.calCelsius(response.main.temp_min),
  description:response.weather[0].description
});

this.get_WeatherIcon(this.weatherIcon,response.weather[0].id);

};
  render() {
    console.log(this.state)
    return(
      <div className='App'>
        <div class="input-group">
          <input onChange={(e) => this.setState({query: e.target.value})} type="text" class="form-control" placeholder="Enter city name to be serched...." aria-label="Recipient's username" aria-describedby="button-addon2" />
          <button onClick={() => this.getWeather()} class="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
        </div>
        <Temp 
        city={this.state.city} 
        country={this.state.country} 
        temp_celsius={this.state.celsius}
        temp_max={this.state.temp_max}
        temp_min={this.state.temp_min}
        description={this.state.description}
        weatherIcon={this.state.icon}
        />
      </div>
    );
  }
}
export default App;
