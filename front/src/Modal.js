import "./styles/modal.css";
import { useState } from "react";
import preload from "./preloader_1.png";
import win from "./winner.png";

export default function Modal({ modal, setModal }) {
  const [interActive, setInterActive] = useState(
    "Для записи на прием заполните форму регистрации"
  );
  const [variantos, setVariantos] = useState("registration");
  const [user, setUser] = useState({ name: "", tel: "", email: "", pass: "" });
  const [valid, setValid] = useState({
    name: false,
    tel: false,
    email: false,
    pass: false,
  });

  const auth = () => {
    fetch("/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify({ email: user.email.trim() }),
    });
  };

  const handlerIamLogining = () => {
    setVariantos("login");
    document.querySelector(".modal__valid-pass").style.diplay = "none";
    document.querySelector(".modal__valid-name").style.display = "none";
  };

  const handlerOut = () => {
    setModal(false);
    setUser({ name: "", tel: "", email: "", pass: "" });
    setValid({ name: false, tel: false, email: false, pass: false });
    setInterActive("Для записи на прием заполните форму регистрации");
    setVariantos("registration");
  };

  const handlerUser = (value, field) => {
    setUser({ ...user, [field]: value });
    setValid({ ...valid, [field]: true });
  };

  const handlerLogin = () => {
    setVariantos("load");
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify({ name: user.name.trim(), pass: user.pass.trim() }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.isGood === "ok") {
          console.log(res.result);
          setInterActive("Мы рады снова вас видеть");
          setVariantos("winner");
          setValid({ name: false, tel: false, email: false, pass: false });
        } else {
          setInterActive("Вы ввели неправильный пароль, ОЙ!");
          setVariantos("login");
          setValid({ name: false, tel: false, email: false, pass: false });
        }
      })
      .catch(() => setInterActive("что то не так ААААААААААААААААА!!!!!"));
  };

  const handlerSubmit = () => {
    if (
      valid.name &&
      valid.tel &&
      valid.email &&
      valid.pass &&
      user.pass.length > 5 &&
      user.name.length > 1
    ) {
      document.querySelector(".modal__valid-pass").style.diplay = "none";
      document.querySelector(".modal__valid-name").style.display = "none";
      setVariantos("load");
      fetch("/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
        body: JSON.stringify({ name: user.name.trim() }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res === "name is occupied") {
            setInterActive("Этот логин уже занят, выберите другой");
            setVariantos("registration");
          } else if (res.isGood === "ok") {
            auth();
            setInterActive("Вам на почту отправлен код подтверждения");
            setVariantos("code");
          } else setInterActive("что то не так ААААААААААААААААА!!!!!");
        })
        .catch(() => setInterActive("что то не так ААААААААААААААААА!!!!!"));
    }
    if (user.pass.length < 6) {
      document.querySelector(".modal__valid-pass").style.display = "block";
    }
    if (user.name.length < 2) {
      document.querySelector(".modal__valid-name").style.display = "block";
    }
    if (user.pass.length > 5) {
      document.querySelector(".modal__valid-pass").style.display = "none";
    }
    if (user.name.length > 1) {
      document.querySelector(".modal__valid-name").style.display = "none";
    }
  };

  const handlerCode = (e) => {
    if (e.target.value.length > 3) {
      setVariantos("load");
      fetch("/code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
        body: JSON.stringify({
          code: e.target.value.trim(),
          name: user.name.trim(),
          tel: user.tel.trim(),
          email: user.email.trim(),
          pass: user.pass.trim(),
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.isGood === "ok") {
            setInterActive("Вы успешно зарегестрированы");
            setVariantos("winner");
            setValid({ name: false, tel: false, email: false, pass: false });
          } else {
            setInterActive("Вы ввели неправильный код, ОЙ!");
            setVariantos("code");
            setValid({ name: false, tel: false, email: false, pass: false });
          }
        })
        .catch(() => setInterActive("что то не так ААААААААААААААААА!!!!!"));
    }
  };

  let variantReg = (
    <>
      <div className="form-control">
        <input
          type="text"
          placeholder="введите имя"
          className="input input-bordered"
          value={user.name}
          onChange={(e) => handlerUser(e.target.value, "name")}
        />
        <span className="modal__valid-name">
          задайте имя на меньше одного символа
        </span>
        <span
          className="modal__err"
          style={{ display: user.name === "" ? "block" : "none" }}
        >
          *
        </span>
      </div>
      <div className="form-control">
        <input
          type="number"
          placeholder="введите номер телефона"
          className="input input-bordered"
          value={user.tel}
          onChange={(e) => handlerUser(e.target.value, "tel")}
        />
        <span
          className="modal__err"
          style={{ display: user.tel === "" ? "block" : "none" }}
        >
          *
        </span>
      </div>
      <div className="form-control">
        <input
          type="text"
          placeholder="введите email"
          className="input input-bordered"
          value={user.email}
          onChange={(e) => handlerUser(e.target.value, "email")}
        />
        <span
          className="modal__err"
          style={{ display: user.email === "" ? "block" : "none" }}
        >
          *
        </span>
      </div>
      <div className="form-control">
        <input
          type="text"
          placeholder="введите пароль"
          className="input input-bordered"
          value={user.pass}
          onChange={(e) => handlerUser(e.target.value, "pass")}
        />
        <span className="modal__valid-pass">
          задайте пароль на меньше шести символа
        </span>
        <span
          className="modal__err"
          style={{ display: user.pass === "" ? "block" : "none" }}
        >
          *
        </span>
      </div>
      <div className="card-actions justify-center">
        <button
          className="btn"
          style={{ width: "230px" }}
          onClick={handlerSubmit}
        >
          Зарегистрироваться
        </button>
      </div>
      <div className="card-actions justify-center">
        <button
          className="btn"
          style={{ width: "230px" }}
          onClick={handlerIamLogining}
        >
          Я уже зарегестрирован
        </button>
      </div>
    </>
  );

  let variantLog = (
    <>
      <div className="form-control">
        <input
          type="text"
          placeholder="введите имя"
          className="input input-bordered"
          value={user.name}
          onChange={(e) => handlerUser(e.target.value, "name")}
        />
        <span className="modal__valid-name">
          задайте имя на меньше одного символа
        </span>
        <span
          className="modal__err"
          style={{ display: user.name === "" ? "block" : "none" }}
        >
          *
        </span>
      </div>
      <div className="form-control">
        <input
          type="text"
          placeholder="введите пароль"
          className="input input-bordered"
          value={user.pass}
          onChange={(e) => handlerUser(e.target.value, "pass")}
        />
        <span
          className="modal__err"
          style={{ display: user.pass === "" ? "block" : "none" }}
        >
          *
        </span>
      </div>
      <div className="card-actions justify-center">
        <button className="btn" onClick={handlerLogin}>
          Отправить
        </button>
      </div>
    </>
  );

  let variantCode = (
    <div className="form-control items-center">
      <input
        type="text"
        placeholder="код"
        className="input w-24  input-bordered"
        onChange={handlerCode}
      />
    </div>
  );

  let variantLoad = (
    <img
      src={preload}
      style={{ width: "130px", height: "130px", margin: "auto" }}
      alt="ipreloader"
    />
  );

  let variantWin = (
    <img
      src={win}
      style={{ width: "130px", height: "130px", margin: "auto" }}
      alt="winner"
    />
  );

  let showVatiant;

  switch (variantos) {
    case "registration":
      showVatiant = variantReg;
      break;
    case "login":
      showVatiant = variantLog;
      break;
    case "code":
      showVatiant = variantCode;
      break;

    case "winner":
      showVatiant = variantWin;
      break;

    case "load":
      showVatiant = variantLoad;
      break;

    default:
      break;
  }

  let out = modal && (
    <div className="modal__field">
      <div className="card w-96 bg-success shadow-xl modal__form">
        <div className="card-body ">
          <div className="card-actions justify-end">
            <button className="btn btn-square btn-sm" onClick={handlerOut}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <p className="modal__text">{interActive}</p>
          {showVatiant}
        </div>
      </div>
    </div>
  );

  return out;
}
