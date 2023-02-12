// for order any col in asc or desc order
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

//for adding search functionality on first column
$(document).ready(function() {
    // Search input keyup event handler
    $("#searchInput").keyup(function() {
      // Get the value of the search input
      var searchValue = $(this).val().toLowerCase();

      // Show all rows if search input is empty
      if (!searchValue) {
        $("#dataTable tbody tr").show();
      } else {
        // Hide all rows
        $("#dataTable tbody tr").hide();

        // Show the rows that match the search criteria
        $("#dataTable tbody tr").filter(function() {
          return $(this).find("td:first").text().toLowerCase().indexOf(searchValue) > -1;
        }).show();
      }
    });
  });