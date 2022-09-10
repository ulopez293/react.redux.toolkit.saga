import { describe, test } from 'vitest'
import { render, screen } from '@testing-library/react'

import TablaMandamientos from './TablaMandamientos'
import { Provider } from 'react-redux'
import { store, persistor } from '../../store'
import { PersistGate } from 'redux-persist/integration/react'
import ThemeBackground from "../../ThemeBackground"

import { categoriasFiltros } from "../../mocks/categoriasFiltros"

describe("TablaMandamientos test", () => {
    test("Rederizar Correctamente TablaMandamientos", () => {
        let filtros = categoriasFiltros
        render(
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ThemeBackground>
                        <TablaMandamientos filtros={filtros} />
                    </ThemeBackground>
                </PersistGate>
            </Provider>
        )
    })
})