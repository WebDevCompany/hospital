import React from "react";
import "./styles/Footer.css";

function Footer() {
  return (
    <div className="Wrapper">
      <div className="FooterWrapper">
        <div className="FooterIntro firstChild">
          <a href="/">
            <img
              src="https://a71e49ea-2c38-4122-81b3-048c6f042beb.id.repl.co/img/LOGO-white.png"
              alt="LOGO"
            />
          </a>
        </div>

        <div className="FooterIntro moveList">
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
        </div>

        <div className="FooterIntro lastChild">
          <a href="/">
            <img
              src="https://a71e49ea-2c38-4122-81b3-048c6f042beb.id.repl.co/img/instagram.svg"
              alt="instagram"
              className="changeInsta"
            />
          </a>
          <img
            src="https://a71e49ea-2c38-4122-81b3-048c6f042beb.id.repl.co/img/whatsapp%20.svg"
            alt="whatsapp"
          />
          <a href="/">
            <img
              src="https://a71e49ea-2c38-4122-81b3-048c6f042beb.id.repl.co/img/telegram%201.png"
              alt="telegram"
              className="moveTelegram"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
