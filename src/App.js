import logo from './logo.svg';
import './App.css';
import Robot from './components/Robot';
import 'semantic-ui-css/semantic.min.css';

const attributes = [
  {
    name: "First",
    details: "I am first",
  },
  {
    name: "Second",
    details: "I am second",
  },
  {
    name: "Third",
    details: "I am third",
  }
]

function App() {
  return (
    <div className="App">
      <Robot img={"https://robohash.org/VJ9.png?set=set1"} name={"Wall-E"} modelNumber={42} description={"They call me a killer robot, but I just want to find love"} attributes={attributes} />
      <Robot />
    </div>
  );
}

export default App;
