import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MatrixPage from './pages/MatrixPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matrix/:id" element={<MatrixPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
