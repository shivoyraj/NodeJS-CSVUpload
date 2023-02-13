// for order any col in asc or desc order
$(document).ready(function () {
  // Attaching click event to each table header (th) element
  $("th").click(function () {
    var table = $(this).parents("table");
    // Finding all table rows (tr) excluding the first row (headers) and converting the result to an array
    var rows = table.find("tr:gt(0)").toArray().sort(comparer($(this).index()));
    // Toggling the asc property of the current clicked th element
    this.asc = !this.asc;
    // If the value of asc property is false then Reversing the order of the rows array
    if (!this.asc) {
      rows = rows.reverse();
    }
    // Looping through the sorted rows and Appending each row to the table
    for (var i = 0; i < rows.length; i++) {
      table.append(rows[i]);
    }
  });

  // Defining the comparer function
  function comparer(index) {
    // Returning a comparison function that will compare values in the specified column (index)
    return function (a, b) {
      // Getting the value of the first td element in the first row (a)
      var valA = $(a).children("td").eq(index).text();
      // Getting the value of the first td element in the second row (b)
      var valB = $(b).children("td").eq(index).text();
      // Comparing the values based on their type (numeric or string)
      return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB);
    };
  }
});

  //for adding search functionality on first column
  $(document).ready(function () {
    // Search input keyup event handler
    $("#searchInput").keyup(function () {
      // Get the value of the search input
      var searchValue = $(this).val().toLowerCase();

      // Show all rows if search input is empty
      if (!searchValue) {
        $("#dataTable tbody tr").show();
      } else {
        // Hide all rows
        $("#dataTable tbody tr").hide();

        // Show the rows that match the search criteria
        $("#dataTable tbody tr").filter(function () {
          return $(this).find("td:first").text().toLowerCase().indexOf(searchValue) > -1;
        }).show();
      }
    });
  });