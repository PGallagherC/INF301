// === importando requerimientos, solo posible si este archivo es considerado modulo ES6 (type="module") ===
// Al ser módulo implica NO exportar/tener disponible funciones globalmente por defecto, alternativas:
// - definirlas como: 'window.miFunc = miFunc;'
// - importar modulo al final del documento y anexar funciones como ejemplo: document.querySelector('button').addEventListener('click', miFunc);
import './aes.js';
import { endpoint, queryGetRol } from './utilsgraphql.js';

// === Session storage utils ===
// TODO - Mejoras: 
// - refactorizar este archivo
// - backend opcional: añadir a modelo 'usuario' backend última sesión/hash en vez de guardarla localmente
// - backend opcional: añadir modelo erroresFront/logs en modelo para dejar logs de errores
// - backend opcional: añadir a modelo 'rol' redireccionamientos dado rol/nrol al hacer login

function genExpDate(){
    const deadlineHr = 1;
    const expirationTime = new Date().getTime() + (deadlineHr * 60 * 60 * 1000); // hours in milliseconds
    return expirationTime;

}

// Al iniciar sesión
function saveCurrentSession(data) {
    // reescribe/guarda session storage encriptada, si data esta mal formateada se elimina sesión 
    try{
        // genera hash dínamico si no existe en sessionStorage y lo almacena en session storage como dh
        if (!sessionStorage.getItem("dh")) {
            const array = new Uint32Array(10);
            window.crypto.getRandomValues(array);
            const dh = array.join('');
            sessionStorage.setItem("dh", dh);
        }

        // genera/actualiza vencimiento y lo almacena en session storage como tf
        const expirationTime = genExpDate();
        const dh = sessionStorage.getItem("dh");
        const encryptedTime = CryptoJS.AES.encrypt(expirationTime.toString(), dh).toString();
        sessionStorage.setItem("tf", encryptedTime);

        // guarda sesión usuario actual (data.id, data.rut, data.nombre y data.nrol) por separado como id, rt, nm, rl
        if (data) {
            const encryptedId = CryptoJS.AES.encrypt(data.id, dh).toString();
            const encryptedRt = CryptoJS.AES.encrypt(data.rut, dh).toString();
            const encryptedRl = CryptoJS.AES.encrypt(data.nrol, dh).toString();
            const encryptedNm = CryptoJS.AES.encrypt(data.nombre, dh).toString();
            sessionStorage.setItem("id", encryptedId); // unused
            sessionStorage.setItem("rt", encryptedRt); // para otras queries
            sessionStorage.setItem("rl", encryptedRl); // para consultar rol
            sessionStorage.setItem("nm", encryptedNm); // para mostrar nombre
        }

        //redirecciona dado nrol (harcoded). TODO: ver opción de consultar redireccionamientos a backend
        switch (parseInt(data.nrol)) {
            case 0:
                // sin credenciales
                window.location.href = 'login.html';
                break;
            case 1:
                // Admin
                window.location.href = 'ver_usuarios.html';
                break;
            case 2:
                // Secretaria
                window.location.href = 'calendario.html';
                break;
            case 3:
                // Médico
                window.location.href = 'consultar-paciente.html';
                break;
            case 4:
                // Cajero
                window.location.href = 'ingreso-pago.html';
                break;
            case 5:
                // Paciente
                window.location.href = 'pedir-hora.html';
                break;
        
            default:
                break;
        }
    } catch (error){
        deleteCurrentSession();
        console.error(error) // TODO : send to backend logs if available
    }
}

const deleteCurrentSession = ()=> {
    // elimina session Storage
    sessionStorage.clear();
    console.log("sesión finalizada");
}

function restoreSession(){
    // comprobando si esta dentro del tf
    const currentTime = new Date().getTime();
    const encryptedTime = sessionStorage.getItem("tf");
    const dh = sessionStorage.getItem("dh");

    if (encryptedTime && dh) {
        const decryptedTime = CryptoJS.AES.decrypt(encryptedTime, dh).toString(CryptoJS.enc.Utf8);
        if (currentTime < parseInt(decryptedTime)) {
            // retorna datos recuperados (id, rt, nm, rl) desde session storage usando dh y actualiza tf
            const id = CryptoJS.AES.decrypt(sessionStorage.getItem("id"), dh).toString(CryptoJS.enc.Utf8);
            const rt = CryptoJS.AES.decrypt(sessionStorage.getItem("rt"), dh).toString(CryptoJS.enc.Utf8);
            const rl = CryptoJS.AES.decrypt(sessionStorage.getItem("rl"), dh).toString(CryptoJS.enc.Utf8);
            const nm = CryptoJS.AES.decrypt(sessionStorage.getItem("nm"), dh).toString(CryptoJS.enc.Utf8);
            const newExpirationTime = genExpDate();
            const encryptedNewTime = CryptoJS.AES.encrypt(newExpirationTime.toString(), dh).toString();
            sessionStorage.setItem("tf", encryptedNewTime);
            displaySessionHTML(nm, rl);
            return { id, rt, rl, nm };
        }
    }

    // sino esta fuera de tf y existe dh (para decrypt), se elimina
    if (dh) {
        deleteCurrentSession();   
    }
    return null;
}

async function displaySessionHTML(nombre, nrol){
    // obteniendo definición de nrol 
    let rol = "N/A";
    await $.ajax({
        url: endpoint,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            query: queryGetRol,
            variables: { filter: { nrol } }
        }),
        success: function(response) {
            rol = response.data.getRol.rol;
        },
        error: function(error) {
            console.error('Error fetching data', error);
        }
    })
    
    // update div id="infoSession" to display: nombre (rol)
    const sessionInfo = document.querySelector('#infoSession');
    if (sessionInfo){
        sessionInfo.textContent = nombre + " (" + rol +")";
    }

    // configurar menú dado rol (esconder o mostrar tabs)
    // TO DO ...
}

function checkSessionDebug(){
    // console log de data, debug
    const session = restoreSession();
    if (session) {
        console.log("Restored session data:", session);
    } else {
        console.log("No active session found.");
    }
}

// === llamando cada vez que se cargue el documento ===
window.addEventListener("load", restoreSession);

//  === Añadiendo a html vía id para evitar carga global ===

// Botón cerrar sesión
const logoutButton = document.querySelector('#logoutButton');
if (logoutButton){
    logoutButton.addEventListener('click', deleteCurrentSession);
}

// === 'DEBUG' - carga funciones globalmente ===
// TO DO ver como añadir saveCurrentSession a ajax de loginButton 
window.globalSessionUtils = {checkSessionDebug, saveCurrentSession};
