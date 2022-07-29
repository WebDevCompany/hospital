import * as React from "react";
import "./styles/Header.css";

function Header({ modal, setModal }) {
  return (
    <>
      <div className="Wrapper">
        <div className="HeaderWrapper">
          {/* Intro start */}
          <div className="HeaderIntro">
            <a href="/">
              <img
                src="https://a71e49ea-2c38-4122-81b3-048c6f042beb.id.repl.co/img/LOGO.svg"
                alt="LOGO"
                className="moveLogo"
              />
            </a>
          </div>

          <div className="HeaderIntro">
            <span className="Vector">
              <a href="/">
                <img
                  src="https://a71e49ea-2c38-4122-81b3-048c6f042beb.id.repl.co/img/Vector.svg"
                  alt="Vector"
                />
              </a>
            </span>
            <p>
              <span>Ростов-на-Дону</span>
              <br />
              <span>ул. Ленина, 2Б</span>
            </p>
          </div>

          <div className="HeaderIntro">
            <img
              src="https://a71e49ea-2c38-4122-81b3-048c6f042beb.id.repl.co/img/whatsapp%20.svg"
              alt="whatsapp"
            />{" "}
            +7(863) 000 00 00
          </div>

          <div className="HeaderIntro">
            <button className="ButtonSend" onClick={() => setModal(true)}>
              Записаться на прием
            </button>
          </div>

          {/* Intro end */}
          {/* Navigation start */}
        </div>
        <div className="HeaderNav">
          {/*            Начало списка                  */}
          <ul className="HeaderList HeaderWrapper">
            <li style={{ marginLeft: "20px" }}>
              <a href="/" className="headerLink">
                О клинике
              </a>
            </li>

            <li style={{ marginLeft: "20px" }}>
              <a href="/" className="headerLink">
                Услуги
              </a>
            </li>

            <li style={{ marginLeft: "20px" }}>
              <a href="/" className="headerLink">
                Специалисты
              </a>
            </li>

            <li style={{ marginLeft: "20px" }}>
              <a href="/" className="headerLink">
                Цены
              </a>
            </li>

            <li style={{ marginLeft: "20px" }}>
              <a href="/" className="headerLink">
                Контакты
              </a>
            </li>
          </ul>
          {/*            Конец списка                  */}
        </div>
      </div>
    </>
  );
}

export default Header;
