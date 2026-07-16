import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ArtistsPage from "./pages/ArtistsPage";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Artists</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ArtistsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;