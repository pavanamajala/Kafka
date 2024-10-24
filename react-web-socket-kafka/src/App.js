import { Route, Routes, BrowserRouter } from "react-router-dom";
import KafkaMessageComponent from './KafkaReceiverComponent';
import KafkaSenderComponent from './KafkaSenderComponent';
import Home from "./Home";
import './App.css';
import Header from "./Header";
import ChatComponent from "./ChatComponent";

function App() {
  return (
    <div className="App">
      <Header/>
      <header className="App-header">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/receiver" element={<KafkaMessageComponent />}></Route>
          <Route path="/sender" element={<KafkaSenderComponent />}></Route>
          <Route path="/chat" element={<ChatComponent />}></Route>
        </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
