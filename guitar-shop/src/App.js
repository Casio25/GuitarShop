import Header from "./components/Header/Header"
import { Footer } from "./components/Footer/Footer";
import Catalog from "./Pages/Catalog/Catalog";
import OrderPage from "./Pages/OrderPage/OrderPage";
import CabinetPage from "./Pages/ProfilePage/ProfilePage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import { offers } from "./components/FakeData";
import {DataFetcher} from "./store/FilteredDataStore"


function App() {
  return (
    <div className="App">
      <DataFetcher/>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path='/orderpage' element={<OrderPage/>}/>
          <Route path="/profile" element={<CabinetPage/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
