import * as React from 'react';
import './styles/App.css';
import Header from "./Header";
import Main from "./Main";
import MainSecondPart from "./MainSecondPart";
import Pagination from "./Pagination";
import Footer from "./Footer";

function App() {
  return (
    <main>
      <Header/>
      <Main/>
      <MainSecondPart/>
      <Pagination/>
      <Footer/>
      
    </main>
  );
}

export default App;