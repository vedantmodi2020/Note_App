import "./App.css";
import NotesList from "./pages/NotesList";
import Header from "./components/Header";
import NotesPages from "./pages/NotesPages";
import { Route, Routes, HashRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container dark">
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" exact Component={NotesList} />
          </Routes>
          <Routes>
            <Route path="/note/:id" exact Component={NotesPages}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
