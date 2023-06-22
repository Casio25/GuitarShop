import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import Catalog from "./Pages/Catalog/Catalog";
import OrderPage from "./Pages/OrderPage/OrderPage";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import { offers } from "./components/FakeData";
import {DataFetcher} from "./store/FilteredDataStore"
console.log(offers)

function App() {
  return (
    <div className="App">
      <DataFetcher/>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path='/orderpage' element={<OrderPage/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
