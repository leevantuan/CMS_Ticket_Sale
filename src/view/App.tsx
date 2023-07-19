import './styles/app.scss';
import Main from '../routers';
import AddTicket from './addTicket';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/AddTicket" element={<AddTicket />} />
      </Routes>
    </div>
  );
}

export default App;
