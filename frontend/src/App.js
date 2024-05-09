import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import RegistrationForm from './components/RegistrationForm';
import DisplayInfoPage from './components/DisplayInfoPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster />
        <Routes>
          <Route exact path="/" element={<RegistrationForm/>} />
          <Route path="/display-info" element={<DisplayInfoPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
