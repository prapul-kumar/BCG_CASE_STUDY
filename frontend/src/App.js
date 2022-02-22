import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Graph from "./views/Graph";
import TableView from "./components/Table";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<TableView />} exact></Route>
        <Route path="/analytics" element={<Graph />} exact></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
