import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route,Routes} from 'react-router-dom';
import Inicio from './components/Inicio';


const App=() => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Inicio /> } />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
