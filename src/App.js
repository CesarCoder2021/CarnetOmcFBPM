import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route,Routes} from 'react-router-dom';
import Inicio from './components/Inicio';
import Buscar from './components/Buscar';

const App=() => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Inicio /> } />
          <Route path='/buscar' element={ <Buscar /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
