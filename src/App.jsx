import TablaMandamientos from "./componentes/TablaMandamientos/TablaMandamientos"
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<TablaMandamientos consumeRedux={false} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
