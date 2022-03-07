import { BrowserRouter as Router } from 'react-router-dom';
import Routing from './Routing';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App () {


  return (
    <>
      <Router>
        <Routing />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
