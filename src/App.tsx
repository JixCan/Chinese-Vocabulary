import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Dictionary } from './pages/Dictionary';
import { Practice } from './pages/Practice';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/practice" element={<Practice />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;