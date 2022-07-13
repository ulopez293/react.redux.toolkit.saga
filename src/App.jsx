import TablaMandamientos from "./componentes/TablaMandamientos/TablaMandamientos"
import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <TablaMandamientos></TablaMandamientos>
      </div>
    </Provider>
  )
}

export default App
