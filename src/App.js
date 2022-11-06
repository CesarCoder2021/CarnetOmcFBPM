import IngresoDato from "./components/IngresoDato.js";
import NavBar from "./components/NavBar.js";

const App=() => {
  return (
    <div>
      <NavBar /> 
      <h1>Sistema de verificación de habilitación</h1>
      <IngresoDato />
    </div>
  );
}

export default App;
