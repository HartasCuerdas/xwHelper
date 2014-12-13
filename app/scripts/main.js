var alphaOnly = function(event) {
  var key = event.keyCode;
  if (key >= 48 && key <= 57) {
    var el = $(event.target);
    var p = el.parent();
    var span = p.find('span');
    var currentText = span.text();
    var number = key-48;
    var newText = number.toString()
    span.html(currentText + newText);
  };
  return ((key >= 65 && key <= 90) || key == 8);
};

$('#puzzle-wrapper').crossword();