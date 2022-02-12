import "./App.css";

import { Routes, Route } from "react-router-dom";
import AllThreadsPage from "./pages/allthreadspage/allthreadspage.component";
import ThreadPage from "../src/pages/threadPage/threadPage.component";
import Register from "./components/register/register.component";
import Signin from "./components/signin/signin.component";
import ThreadCreatorPage from "./pages/threadCreatorPage/threadCreatorPage.component";
import { SaveThreadPage } from "./pages/savedThreadsPage/saveThreadsPage.components";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/threadpage/:threadid" element={<ThreadPage />} />
        <Route path="/threadpage/:threadid" element={<ThreadPage />} />

        <Route path="/threadCreatorPage" element={<ThreadCreatorPage />} />
        <Route path="/likedThreads" element={<SaveThreadPage />} />
        <Route exact path="/" element={<AllThreadsPage />} />
      </Routes>
    </div>
  );
}

export default App;
