import React from 'react';
import './styles/MainSecondPart.css';



function MainSecondPart(){
   
  
  return <div className = "SecondMainPart">
            <div>
              <div className = "HeaderSecondMainPart">Check-UP</div>
                <p style = {{"paddingLeft": "68px"}}>для мужчин</p>
                <ul className = "ListSecondMain">
                  <li>Гормональный скрининг</li>
                  <li>Тестостерон</li>
                  <li>Свободный тестостерон</li>
                  <li>Глобулин, связывающий половые гормоны</li>
                </ul>
                <span className = "Price">Всего 2800₽</span>
                <span className = "Sales">3500₽</span>
                <div className="WriteOnVisit">
                  <button className = "ButtonSend">Записаться</button>
                  <button className = "ButtonSend">Подробнее</button>
                </div>
            </div>
            <img src="https://infosmi.net/wp-content/uploads/2021/05/re.jpg" alt=""/>
          </div>

      


}



export default MainSecondPart;