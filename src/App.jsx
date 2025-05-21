import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Form from './Pages/Form';
import Liste from './Pages/Liste';
import Game from './Pages/Game';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#059ad7",
      },
      tableBg: {
        main: "rgba(5, 154, 215, 0.2)",
      },
      tableText: {
        main: "#343C6A",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/liste" element={<Liste />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
