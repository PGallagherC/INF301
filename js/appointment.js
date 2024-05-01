function showDetails(patientId) {
    // Ocultar todas las ventanas emergentes de detalles
    var detailsContainers = document.getElementsByClassName('details-container');
    for (var i = 0; i < detailsContainers.length; i++) {
        detailsContainers[i].style.display = 'none';
    }

    // Mostrar el contenedor oculto de detalles del paciente específico
    var detailsContainer = document.getElementById(patientId + 'Details');
    detailsContainer.style.display = 'block';
}

function hideDetails(patientId) {
    // Ocultar la ventana emergente de detalles del paciente específico
    var detailsContainer = document.getElementById(patientId + 'Details');
    detailsContainer.style.display = 'none';
}

// Función para exportar el reporte
document.getElementById('export-report-btn').addEventListener('click', function() {
    // Coloca aquí el código para exportar el reporte
    console.log('Exportando reporte...');
});

// Función para imprimir el reporte
document.getElementById('print-report-btn').addEventListener('click', function() {
    // Coloca aquí el código para imprimir el reporte
    console.log('Imprimiendo reporte...');
});

// Función para consultar paciente en espera
document.querySelector('.btn-primary').addEventListener('click', function() {
    // Coloca aquí el código para consultar paciente en espera
    console.log('Consultando paciente en espera...');
});