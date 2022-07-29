import { rolesID } from '../../utilidades/rolesID'

const isUserValidate = (id_rol) => {
    if (id_rol == rolesID.ID_ROL_ADMINISTRADORES || id_rol == rolesID.ID_ROL_ENLACE) {
        return true
    }
    alert("Rol de usuario no Valido")
    return false
}

export default isUserValidate