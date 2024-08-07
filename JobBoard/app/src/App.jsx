import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Loginstu from './components/Loginstu';
import Loginidy from './components/Loginidy';
import Signupstu from './components/Signupstu';
import Signupidy from './components/Signupidy';
import Dashboardemp from './screens/Dashboardemp';
import Addjobpost from './screens/AddJobpost';
import ReadMore from './screens/ReadMore';
import Dashboardstu from './screens/Dashboardstu';
import "./App.css";
import Apply from './screens/Apply';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-student" element={<Loginstu />} />
        <Route path="/login-employer" element={<Loginidy />} />
        <Route path="/signup-student" element={<Signupstu />} />
        <Route path="/signup-employer" element={<Signupidy />} />
        <Route path="/employer/dashboard" element={<Dashboardemp />} />
        <Route path="/employer/dashboard/jobpost" element={<Addjobpost />} />
        <Route path="/role-description/:id" element={<ReadMore />} />
        <Route path="/student/dashboard" element={<Dashboardstu />} />
        <Route path="/student/apply/:roleName" element={<Apply />} />

      </Routes>
    </Router>
  );
}

export default App;
