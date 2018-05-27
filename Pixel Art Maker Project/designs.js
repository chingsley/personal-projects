
// Select size input

// When size is submitted by the user, call makeGrid()
$(document).on("click", "#submit_form", function makeGrid() {
    // Your code goes here!
   var rowNo = $('input[name="height"]').val();
   var colNo = $('input[name="width"]').val();
    $("#pixelCanvas").empty();
    for (x = 1; x <= rowNo; x++){
        var row = $("<tr></tr>");
        for (y = 1; y <= colNo; y++){
            var cell = $("<td></td>").addClass("cell");
            row.append(cell);
        }
        $('#pixelCanvas').append(row);
    }
    
});


var color = $('#colorPicker').val();
$("#colorPicker").change(function(){
    color = $(this).val();
  });

$(document).on("click", "#display_text", function(){
    $('#myP').empty();
    $('#myP').text(color);
    $('#myP').css('color', color);
    $('#pixelCanvas').css('background-color', color);
});


$( '#pixelCanvas' ).on( 'click', '.cell', function( evt ) {
    $( evt.target ).css( 'background-color', color );
});


