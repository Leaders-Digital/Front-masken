import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './Pages/Form';
import Liste from './Pages/Liste';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/liste" element={<Liste />} />
      </Routes>
    </Router>
  )
}

export default App
