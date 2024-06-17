export const endpoint = 'http://localhost:3000/graphql';

export const queryGetUsuarios = `
    query GetUsuarios {
        getUsuarios {
            id
            usuario
            pass
            nombre
            rut
            mail
            nrol
        }
    }`;

// { filter: { nrol } } as filter  
export const queryGetRol = `
    query GetRol($filter: RolFilter) {
        getRol(input: $filter) {
            id
            rol
            nrol
        }
    }`;


export const queryGetRoles = `
    query GetRoles {
        getRoles {
            id
            rol
            nrol
        }
    }`;

// { rut: rutValue } as variables 
export const queryGetUsuarioRut =`
    query GetUsuarioRut($rut: String!) {
        getUsuarioRut(input: {rut: $rut}) {
            id
            usuario
            nombre
            rut
            mail
            nrol
        }
    }`;


// "dataLogin": { "usuario": "", "pass": "passValue", "mail": "mailValue"} as variables
export const queryLogin = `
    query Login($dataLogin: login) {
      login(input: $dataLogin) {
        rut
        nrol
        mensaje
      }
    }`;