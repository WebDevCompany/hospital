import React from 'react';
import './styles/Main.css';

function Main(){
  return <div className = "Wrapper">
            <div className = "MainWrapper">

              <div className = "MainTextWrapper">
                <div className="MainText">
                  Многопрофильная клиника для детей
                  и взрослых
                  <div className = "SuppleText">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                  </div>
                </div>                          
              </div>

              <div className = "MainImg">
              <img src="https://i7.photo.2gis.com/images/branch/32/4503599649890636_973d.jpg" alt="" height = "99%"/>
              </div>              
            </div>
        </div>
}


export default Main;