import { Route, Routes, BrowserRouter } from "react-router-dom";
import KafkaMessageComponent from './KafkaReceiverComponent';
import KafkaSenderComponent from './KafkaSenderComponent';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
        <Routes>
          <Route path="/receiver" element={<KafkaMessageComponent />}></Route>
          <Route path="/sender" element={<KafkaSenderComponent />}></Route>
        </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
