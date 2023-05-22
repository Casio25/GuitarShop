import { Header } from "./components/Header/Header";
import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
  return (
    <>
    <BrowserRouter>
    <Header />
    <Routes>
      <Route  path="/catalog" />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
