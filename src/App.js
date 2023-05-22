
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from './Componentes/Cookies';
import Imgmeme from './Componentes/Imgmeme';
import Footer from './Componentes/Footer';


function App() {
  return (
    <div className="App">
     <Cookies/>
     <Imgmeme />
     <Footer />
    </div>
  );
}

export default App;
