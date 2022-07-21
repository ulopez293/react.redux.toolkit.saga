import TablaMandamientos from "./componentes/TablaMandamientos/TablaMandamientos"
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./componentes/Login/Login"

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route index element={<Login />} />
            <Route exact path="/mandamientos" element={<TablaMandamientos />} />
            <Route path="*" element={<><h1>404 not found</h1></>} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
