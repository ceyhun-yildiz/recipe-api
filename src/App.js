import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'

// styles
import './App.css';

// pages & components
import Navbar from './components/Navbar'
import Home from './pages/home/Home'
import Recipe from './pages/recipe/Recipe'
import ThemeSelector from './components/ThemeSelector'

function App() {
  const { mode } = useTheme();

  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar />
        <ThemeSelector />
        <Routes>
          <Route path="/" element={<Home />} />   
          <Route path="/recipes/:id" element={<Recipe />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
