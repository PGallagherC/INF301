$(document).ready(function() {
    $('input[name="date_range_invoces"]').daterangepicker({
    opens: 'left', // Calendar opens on the left side
    autoApply: true, // Auto apply the date range selection
    locale: {
        format: 'DD/MM/YYYY', // Date format
        separator: ' al ', // Separator between start and end dates
        applyLabel: 'Aplicar', // Apply button text
        cancelLabel: 'Cancelar', // Cancel button text
        daysOfWeek: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        firstDay: 0
        }
    });
});