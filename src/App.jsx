import React from 'react'
import ApiPage from './Component/ApiPage'
import Consume from './Component/Consume'
import Weather from './Component/Weather'
import WeatherApi from './Component/WeatherApi'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Content from './Component/Content'

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Content/>
      <Routes>
        <Route path="/" element={<Consume/>}/>
        <Route path="/weatherApi" element={<WeatherApi/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App
