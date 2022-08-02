import { rolesID } from '../../utilidades/rolesID'

const isUserValidateRol = (id_rol) => {
    if (id_rol == rolesID.ID_ROL_ADMINISTRADORES || id_rol == rolesID.ID_ROL_ENLACE) {
        return true
    }
    return false
}

export default isUserValidateRol