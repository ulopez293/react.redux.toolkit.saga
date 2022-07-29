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

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeBackground>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/mandamientos" element={
                <ProtectedRoute>
                  <TablaMandamientos />
                </ProtectedRoute>
              } />
              <Route path="*" element={<><h1>404 not found</h1></>} />
            </Routes>
          </BrowserRouter>
          {/* <Copyright sx={{
          pt: 2, pb: 2, mt: 4, mb: 0,
          backgroundColor: '#1976d2', color: 'white'
        }} /> */}
          <Copyright />
        </ThemeBackground>
      </PersistGate>
    </Provider>
  )
}

export default App
