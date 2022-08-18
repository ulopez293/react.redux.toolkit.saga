import TablaMandamientos from "./componentes/TablaMandamientos/TablaMandamientos"
import { Provider } from 'react-redux'
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import ThemeBackground from "./ThemeBackground"
import Login from "./componentes/Login/Login"
import NavBar from "./componentes/NavBar/NavBar"
import ProtectedRoute from "./ProtectedRoute"
import Copyright from "./componentes/Copyright"

import useFetchData from "./hooks/useFetchData"

function App() {
  const [filtros] = useFetchData('catalogos/mandamientos_filtros')
  if(filtros==null) return
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeBackground>
          <BrowserRouter>
            <NavBar filtros={filtros} />
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/mandamientos" element={
                <ProtectedRoute>
                  <TablaMandamientos filtros={filtros} />
                </ProtectedRoute>
              } />
              <Route path="*" element={<><h1>404 not found</h1></>} />
            </Routes>
          </BrowserRouter>
        </ThemeBackground>
          {/* <Copyright /> */}
      </PersistGate>
    </Provider>
  )
}

export default App
