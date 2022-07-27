import TablaMandamientos from "./componentes/TablaMandamientos/TablaMandamientos"
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import ThemeBackground from "./ThemeBackground"
import Login from "./componentes/Login/Login"
import NavBar from "./componentes/NavBar/NavBar"
import ProtectedRoute from "./ProtectedRoute"
import Copyright from "./componentes/Copyright"

function App() {
  return (
    <Provider store={store}>
      <ThemeBackground>
        <NavBar />
        <BrowserRouter>
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
    </Provider>
  )
}

export default App
