import './App.css';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {Users} from './components/Users';
import UserDetails from './components/userDetails';
import Header from './components/Header';
import Footer from './components/Footer';
import Container from '@mui/material/Container';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <React.StrictMode>
      <Router>
        <QueryClientProvider client={queryClient}>
          <Header />
          <main className='app-container'>
            <Routes>
              <Route exact path='/' element={<Users />} />
              <Route exact path='/users/:id' element={<UserDetails />} />
            </Routes>
          </main>
          <Footer />
        </QueryClientProvider>
      </Router>
    </React.StrictMode>
  );
}

export default App;