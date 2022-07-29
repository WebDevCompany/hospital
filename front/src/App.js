import * as React from "react";
import "./styles/App.css";
import Header from "./Header";
import Main from "./Main";
import MainSecondPart from "./MainSecondPart";
import Pagination from "./Pagination";
import Footer from "./Footer";
import { useState } from "react";
import Modal from "./Modal";

function App() {
  let [modal, setModal] = useState(false);

  return (
    <main>
      <Modal modal={modal} setModal={setModal} />
      <Header modal={modal} setModal={setModal} />
      <Main />
      <MainSecondPart />
      <Pagination />
      <Footer />
    </main>
  );
}

export default App;
