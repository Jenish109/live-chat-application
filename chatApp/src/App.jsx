import './App.css';
import Join from './Component/Join/join';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatPage from './Component/Chat/chat';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Use 'element' instead of 'component' */}
          <Route path="/" element={<Join />} />
          {/* Example of a nested route */}
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
