import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Catalog } from "./Pages/Catalog/Catalog";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import "./App.css"

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Header />
    <Routes>
      <Route  path="/" element={<Catalog />}/>
    </Routes>
    <Footer />
    </BrowserRouter>
    </div>
  );
}

export default App;
