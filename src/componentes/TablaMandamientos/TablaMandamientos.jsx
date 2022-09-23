import * as React from 'react'

import './TablaMandamientos.css'

import { useSelector, useDispatch } from 'react-redux'
import { sagaActions } from '../../sagaActions'

import Fila from "./Fila"
import Detalle from "../Detalle/Detalle"
import TablaMandamientosVista from "./TablaMandamientosVista"

import useFetchData from "../../hooks/useFetchData.jsx"
import api from "../../api/api"
import apiCall from '../../api/apiCall'

function TablaMandamientos({ filtros }) {

    const checks = useSelector((state) => state.check.checks)
    const checkAll = useSelector((state) => state.checkAll.checks)
    const dispatch = useDispatch()

    const detalle = useSelector((state) => state.detalle.detalle)

    const [ultimaRutaAPI, setUltimaRutaAPI] = React.useState('mandamientos')
    const [cantidadPaginas, setCantidadPaginas] = React.useState(0)
    const [numeroRegistros, setNumeroRegistros] = React.useState(0)
    const [filasVacias, setFilasVacias] = React.useState(0)
    const [pagina, setPagina] = React.useState(0)
    const [numeroDeFilasPorPagina, setNumeroDeFilasPorPagina] = React.useState(5)
    const [triggerPage, setTriggerPage] = React.useState(false)
    const [mandamientos, setMandamientos] = useFetchData("mandamientos")

    const [itFilter, setItFilter] = React.useState(false)
    const [dataFilter, setDataFilter] = React.useState('')

    const [consumeRedux, setConsumeRedux] = React.useState(false)

    let user = useSelector((state) => state.login.user)

    React.useEffect(() => {
        if (user == undefined) {
            dispatch({ type: sagaActions.CHANGE_LOGIN_STATE_SAGA, payload: false })
        }

        if (mandamientos != null) asignarDatosSetMandamientos(mandamientos)
        resetTable()
    }, [])

    const initialParameters = () => {
        if (mandamientos == null) return
        if (consumeRedux) {
            setCantidadPaginas(1)
            setNumeroRegistros(mandamientos.data.length)
            setFilasVacias(pagina > 0 ? Math.max(0, (1 + pagina) * numeroDeFilasPorPagina - mandamientos.data.length) : 0)
        } else {
            setCantidadPaginas(mandamientos.last_page)
            setNumeroRegistros(mandamientos.total)
            setFilasVacias(pagina > 0 ? Math.max(0, (1 + pagina) * numeroDeFilasPorPagina - mandamientos.data.length) : 0)
        }
    }

    React.useEffect(() => {
        const onReloadChangeReact = () => {
            if (mandamientos == null) return
            initialParameters()
            if (consumeRedux) {
                triggerRestore()
                triggerFirstPage()
                setTimeout(() => asignarDatosSetMandamientos({ data: checks }), 400)
                console.log("onreload code changes")
            }
        }
        onReloadChangeReact()
    }, [])

    React.useEffect(() => {
        if (mandamientos == null) return
        if (consumeRedux) {
            triggerRestore()
            triggerFirstPage()
            setTimeout(() => asignarDatosSetMandamientos({ data: checks }), 1)
        }
    }, [consumeRedux])

    React.useEffect(() => {
        initialParameters()
    }, [mandamientos])

    if (mandamientos == null) return

    const handleChangePage = (event, newPage) => setPagina(newPage)

    const handleChangeRowsPerPage = (event) => {
        setNumeroDeFilasPorPagina(parseInt(event.target.value, 10))
        setPagina(0)
        console.log("mostrar solo cantidad paginas", event.target.value)
    }

    const desplegarFilas = () => {
        return (
            // numeroDeFilasPorPagina > 0
            // ? mandamientos.data.slice(pagina * numeroDeFilasPorPagina, pagina * numeroDeFilasPorPagina + numeroDeFilasPorPagina)
            // : mandamientos.data
            mandamientos.data
        ).map((row) => (
            <Fila key={row.id} row={row} consumeRedux={consumeRedux} setMandamientos={asignarDatosSetMandamientos} />
        ))
    }

    const cambiarPaginaCallback = async (numberPage) => {
        if (itFilter) {
            triggerRestore()
            triggerFirstPage()
            const rutaFilter = `${dataFilter}`
            const filtroRegion = (user?.dato_fiscal?.id_region != null) ? `&id_region=${user?.dato_fiscal?.id_region}` : ''
            let datos = await api(`mandamientos?page=${numberPage}${rutaFilter}${filtroRegion}`, "GET")
            setUltimaRutaAPI(`mandamientos?page=${numberPage}${rutaFilter}${filtroRegion}`)
            asignarDatosSetMandamientos(datos)
        } else {
            triggerRestore()
            triggerFirstPage()
            const filtroRegion = (user?.dato_fiscal?.id_region != null) ? `&id_region=${user?.dato_fiscal?.id_region}` : ''
            let datos = await api(`mandamientos?page=${numberPage}${filtroRegion}`, "GET")
            setUltimaRutaAPI(`mandamientos?page=${numberPage}${filtroRegion}`)
            asignarDatosSetMandamientos(datos)
        }
    }

    const cambiarPagina = async (e) => {
        if (isNaN(e)) {
            cambiarPaginaCallback(e.currentTarget.textContent)
            return
        }
        cambiarPaginaCallback(e)
    }

    async function resetTable() {
        triggerRestore()
        triggerFirstPage()
        const filtroRegion = (user?.dato_fiscal?.id_region != null) ? `?id_region=${user?.dato_fiscal?.id_region}` : ''
        let datos = await api(`mandamientos${filtroRegion}`, "GET")
        setUltimaRutaAPI(`mandamientos${filtroRegion}`)
        asignarDatosSetMandamientos(datos)
        setItFilter(false)
    }

    function triggerFirstPage() { setTriggerPage(true) }
    function triggerRestore() { setTriggerPage(false) }

    function asignarDatosSetMandamientos(datos) {
        if (user == undefined) {
            dispatch({ type: sagaActions.CHANGE_LOGIN_STATE_SAGA, payload: false })
        }
        if (user?.dato_fiscal?.id_region == null) {
            setMandamientos(datos)
            return
        }

        let nombreRegion = (filtros.catRegiones.find(element => element.id == user?.dato_fiscal?.id_region)).nombre
        let auxDatos = datos
        let arrayFilter = datos.data.filter(item => item.region == nombreRegion)
        auxDatos.data = arrayFilter
        setMandamientos(auxDatos)
    }

    const actualizarTablaPorFiltro = async (ruta, itResetTable) => {
        if (itResetTable) {
            triggerRestore()
            triggerFirstPage()
            resetTable()
        } else {
            triggerRestore()
            triggerFirstPage()
            const filtroRegion = (user?.dato_fiscal?.id_region != null) ? `&id_region=${user?.dato_fiscal?.id_region}` : ''
            
            setUltimaRutaAPI(`mandamientos?page=1${ruta}${filtroRegion}`)
            asignarDatosSetMandamientos(await api(`mandamientos?page=1${ruta}${filtroRegion}`, "GET"))
            setItFilter(true)
            setDataFilter(ruta)
        }
    }

    const removeAllChecks = () => {
        dispatch({ type: sagaActions.REMOVE_ALL_CHECKS_ALLS_SAGA, payload: ultimaRutaAPI })
        dispatch({ type: sagaActions.REMOVE_ALL_CHECKS_SAGA })
        if (consumeRedux) asignarDatosSetMandamientos({ data: [] })
    }

    const addAllChecksOfThePage = () => {
        dispatch({ type: sagaActions.ADD_CHECKS_ALLS_SAGA, payload: ultimaRutaAPI })
        mandamientos.data.map(mandamiento => dispatch({ type: sagaActions.ADD_CHECKS_SAGA, payload: mandamiento }))
    }

    const showCarrito = () => {
        if (checks.length == 0) return
        setConsumeRedux(true)
    }

    const volverCarrito = () => {
        resetTable()
        setConsumeRedux(false)
    }

    const enviarBus = async () => {
        let uuids = mandamientos.data.map(item => item.id)
        let body = { uuids: uuids }
        let response = await apiCall('POST', 'bus_mandato/send', 'host', body)
        try {
            if ('message' in response) {
                alert(response.message)
                resetTable()
                setConsumeRedux(false)
                removeAllChecks()
            }
        } catch (error) {
            alert("Error al enviar registros")
            console.log(response)
            console.log(error)
        }
    }

    const handleCheckALL = (e) => {
        if (e.target.checked) {
            addAllChecksOfThePage()
        } else {
            removeAllChecks()
        }
    }

    if (detalle.activo) return <Detalle />
    return <TablaMandamientosVista
                checkAll={checkAll}
                numeroRegistros={numeroRegistros}
                filasVacias={filasVacias}
                triggerPage={triggerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                desplegarFilas={desplegarFilas}
                cambiarPagina={cambiarPagina}
                cambiarPaginaCallback={cambiarPaginaCallback}
                actualizarTablaPorFiltro={actualizarTablaPorFiltro}
                showCarrito={showCarrito}
                volverCarrito={volverCarrito}
                enviarBus={enviarBus}
                handleCheckALL={handleCheckALL}
                consumeRedux={consumeRedux}
                filtros={filtros}
                mandamientos={mandamientos}
                numeroDeFilasPorPagina={numeroDeFilasPorPagina}
                pagina={pagina}
                triggerFirstPage={triggerFirstPage}
                triggerRestore={triggerRestore}
                ultimaRutaAPI={ultimaRutaAPI}
                cantidadPaginas={cantidadPaginas} />
}

export default TablaMandamientos