import logo from './logo.svg';
import './App.css';
import Robot from './components/Robot';
import 'semantic-ui-css/semantic.min.css';

function App() {
  return (
    <div className="App">
      <Robot img={"https://robohash.org/VJ9.png?set=set1"} name={"Wall-E"} modelNumber={42} description={"They call me a killer robot, but I just want to find love"} />
    </div>
  );
}

export default App;
