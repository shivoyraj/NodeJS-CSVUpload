$(document).ready(function () {
    $("th").click(function () {
        var table = $(this).parents("table");
        var rows = table.find("tr:gt(0)").toArray().sort(comparer($(this).index()));
        this.asc = !this.asc;
        if (!this.asc) {
            rows = rows.reverse();
        }
        for (var i = 0; i < rows.length; i++) {
            table.append(rows[i]);
        }
    });

    function comparer(index) {
        return function (a, b) {
            var valA = $(a).children("td").eq(index).text();
            var valB = $(b).children("td").eq(index).text();
            return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB);
        };
    }
});