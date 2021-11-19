$(document).ready(function () {
    var table = $("#example").DataTable({
        buttons: ["copy", "csv", "print", "excel", "pdf", "colvis"],
        dom: "<'row'<'col-md-3'l><'col-md-5'B><'col-md-4'f>>" + "<'row'<'col-md-12'tr>>" + "<'row'<'col-md-5'i><'col-md-7'p>>",
        // lengthMenu: [
        //     [5, 10, 25, 50, 100, -1],
        //     [5, 10, 25, 50, 100, "All"],
        // ],
    });

    table.buttons().container().appendTo("#example_wrapper .col-md-5:eq(0)");
});
