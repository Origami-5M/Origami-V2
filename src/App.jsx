import { Routes, Route } from 'react-router-dom';
import Play from './Play.jsx';
import MainPage from './MainPage.jsx';
import Gallery from './GalleryPage.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/play" element={<Play />} />
      <Route path="/gallery" element={<Gallery />} />
    </Routes>
  );
};

export default App;
