import { Routes, Route, BrowserRouter } from "react-router-dom"
import './App.scss';
import Home from './pages/Home/Home';
import Movie from './pages/Movie/Movie';
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:movieId" element={<Movie />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
