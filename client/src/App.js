import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  const element = useRoutes(routes)
  return (
    <div>
      <NavBar />
      {element}
    </div>
  );
}

export default App;
