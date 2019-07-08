import React from 'react';
import ReactDOM from 'react-dom';

 const ClockDisplay = (props)=>{
    return(
     
          <div className="hours-indicator clock" id='hour' >
            <div className="min-indicator clock" id="minutes">
              <div className="sec-indicator clock" id ="seconds">
                <div className = "time-text" id='time-text'>
                     <p className = 'clock-text' id="weekday">{`${props.weekday}`}</p>
                      <p className = 'clock-text' id='date'>{`${props.month} / ${props.day} / ${props.year}`}</p>
                      <p className='clock-text'>{`${props.hour} : ${props.min} : ${props.sec}`}</p> 
                </div>
              </div>
            </div>
          </div>
      
      )
  }
const rootEl = document.getElementById('root');

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      currentYear: '',
      currentDay: '',
      currentMonth: '',
      currentHour: {
              hour: '',
              percent: 0,
              deg: 0,
      },
      dayOfWeek: '',
      currentMin: {
              min: '',
              percent: 0,
              deg: 0,
      },
      currentSec: {
              sec: '',
              percent: 0,
              deg: 0,
            },
             }
  }
  componentDidMount(){
   setInterval(
        function(){
           const now = new Date();
           var dw = now.getDay();
           switch(dw){
              case 0:
                dw = "Sunday";
                break;
              case 1:
                dw = "Monday";
                break; 
              case 2:
                dw = "Tuesday";
                break;
              case 3:
                dw = "Wednesday";
                break;
              case 4:
                dw = "Thursday";
                break;
              case 5:
                dw = "Friday";
                break;
              case 6:
              dw = "Saturday";
            }
            const day = now.getDate();
            const month = now.getMonth();
            const year = now.getFullYear();
            var hour = now.getHours();
            if (hour>12){
              var twelveHour = hour-12;
            } else{ twelveHour = hour}
            var hdeg = 360*(hour/24);
            const min = now.getMinutes();
            var mdeg = 360*(min/60);
            const sec = now.getSeconds();
            var sdeg = 360*(sec/60);
            this.setState({
                            currentYear: year,
                            currentDay: day,
                            currentMonth: month,
                            currentHour: {hour: twelveHour,
                                          percent: hour/24,
                                          deg: hdeg},
                            currentMin: {min: min,
                                        percent: min/60,
                                        deg: mdeg},
                            currentSec: {
                                          sec: sec,
                                          percent: sec/60,
                                          deg: sdeg},
                            dayOfWeek: dw,
                          });
            var timeText  = document.getElementById("time-text");
            var seconds = document.getElementById("seconds");
            if (this.state.currentSec.deg >180){
                  timeText.classList.add("o180");
                  timeText.classList.remove("u180");
                  seconds.classList.add("o180");
                  seconds.classList.remove("u180");
            document.documentElement.style.setProperty('--deg-sec', `${this.state.currentSec.deg-90}deg` );
                }
                else{
                    timeText.classList.add("u180");
                    timeText.classList.remove("o180");
                    seconds.classList.add("u180");
                    seconds.classList.remove("o180");
                document.documentElement.style.setProperty('--deg-sec', `${this.state.currentSec.deg+90}deg` );    
                }
            var minutes = document.getElementById('minutes');
            if(this.state.currentMin.deg > 180){
                 minutes.classList.add("o180");
                minutes.classList.remove("u180");
              document.documentElement.style.setProperty('--deg-min', `${this.state.currentMin.deg-90}deg` );
            }else{
                    minutes.classList.add("u180");
                    minutes.classList.remove("o180");
                document.documentElement.style.setProperty('--deg-min', `${this.state.currentMin.deg+90}deg` );    
                }
            var hour = document.getElementById('hour');
             if (this.state.currentHour.deg >180){
               hour.classList.add("o180");
                hour.classList.remove("u180");
            document.documentElement.style.setProperty('--deg-hour', `${this.state.currentHour.deg-90}deg` );
            }else{
                    hour.classList.add("u180");
                    hour.classList.remove("o180");
                document.documentElement.style.setProperty('--deg-hour', `${this.state.currentHour.deg+90}deg` );    
                }
      }.bind(this), 1000);
    }
  render(){
      return(
             <div className="App">
              <ClockDisplay day={this.state.currentDay} month={this.state.currentMonth} year={this.state.currentYear} 
                    hour={this.state.currentHour.hour} hourPercent={this.state.currentHour.percent} sec={this.state.currentSec.sec} 
                    secPercent={this.state.currentSec.percent} min={this.state.currentMin.min} minPercent = {this.state.currentMin.percent}
                    weekday = {this.state.dayOfWeek}
                />

               </div>       
                    );

            }
  }


    ReactDOM.render(
        <App />, rootEl
    );




// This checks for local changes and automatically refreshes the browser (hot-reloading)
if (module.hot) {
    module.hot.accept('./components/App.jsx', () => renderApp());
}