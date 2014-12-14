(function($){

  $.fn.crossword = function() {
    
    var tbl = ['<table id="puzzle">'];
    var rows = 15;
    var cols = 15;
    var puzzEl = this;
    var currOri = 'across';
    var currCol = 0;
    var next = 39;
    var gotMatrix = true;
    var matrix =
[
 [ 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1],
 [ 1,  0,  1,  0,  1,  0,  1,  0,  1,  0,  1,  0,  1,  0,  1],
 [ 1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],
 [ 1,  0,  1,  0,  1,  0,  1,  0,  1,  0,  1,  0,  1,  0,  1],
 [ 1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  0],
 [ 1,  0,  1,  0,  1,  0,  0,  0,  1,  0,  1,  0,  1,  0,  0],
 [ 1,  1,  1,  1,  1,  1,  1,  0,  1,  0,  0,  1,  1,  1,  1],
 [ 1,  0,  0,  0,  1,  0,  1,  0,  1,  0,  1,  0,  0,  0,  1],
 [ 1,  1,  1,  1,  0,  0,  1,  0,  1,  1,  1,  1,  1,  1,  1],
 [ 0,  0,  1,  0,  1,  0,  1,  0,  0,  0,  1,  0,  1,  0,  1],
 [ 0,  1,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1],
 [ 1,  0,  1,  0,  1,  0,  1,  0,  1,  0,  1,  0,  1,  0,  1],
 [ 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1],
 [ 1,  0,  1,  0,  1,  0,  1,  0,  1,  0,  1,  0,  1,  0,  1],
 [ 1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1]
];

    var puzInit = {

      init: function() {

        puzzEl.delegate('input', 'keyup', function(e){
            
            // need to figure out orientation up front, before we attempt to highlight an entry
            switch(e.which) {
              case 39: // right
              case 37: // left
                currOri = 'across';
                next = 39;
                break;
              case 38: // up
              case 40: // down
                currOri = 'down';
                next = 40;
                break;
              default:
                break;
            }
            
            if ( e.keyCode === 9) { // tab
              return false;
            } else if (
              e.keyCode === 32 ) { // spacebar

              var el = $(e.target);
              el.val('');
              p = el.parent();
              span = p.find('span');
              span.html('');
              el.toggleClass('checked');

            } else if (
              e.keyCode === 37 || // left
              e.keyCode === 38 || // up
              e.keyCode === 39 || // right
              e.keyCode === 40 || // down
              e.keyCode === 8 || // backspace
              e.keyCode === 46 ) { // delete
              
              if (e.keyCode === 8 || e.keyCode === 46) { // backspace or delete
                currOri === 'across' ? nav.nextPrevNav(e, 37) : nav.nextPrevNav(e, 38);
                // if 'across', next = LEFT
                // if 'down', next = UP
              } else {
                nav.nextPrevNav(e);
                // next = arrow direction
              }
              
              e.preventDefault();
              return false;
            } else {
              
              console.log('input keyup: ');
              // solvedToggle is boolean

              nav.nextPrevNav(e, next);

              //puzInit.checkAnswer(e);
              // checks current input
              // autoselect next square

            }

            e.preventDefault();
            return false;         
          });

        puzInit.buildTable();

      },

      buildTable: function() {

        var isChecked;
        
        if (gotMatrix) {

          console.log('gotMatrix');

          for (var i=1; i <= rows; ++i) {
            tbl.push("<tr>");
            for (var j=1; j <= cols; ++j) {
              isChecked = matrix[i-1][j-1];
              if ( isChecked == 0) {
                tbl.push('<td data-coords="' + i + ',' + j + '"><span></span><input class="checked" maxlength="1" val="" type="text" onkeydown="return alphaOnly(event);" /></td>');
              } else {
                tbl.push('<td data-coords="' + i + ',' + j + '"><span></span><input maxlength="1" val="" type="text" onkeydown="return alphaOnly(event);" /></td>');
              };
            }
            tbl.push("</tr>");
          };

        } else {

          console.log('No Matrix');

          for (var i=1; i <= rows; ++i) {
            tbl.push("<tr>");
            for (var j=1; j <= cols; ++j) {
              tbl.push('<td data-coords="' + i + ',' + j + '"><span></span><input maxlength="1" val="" type="text" onkeydown="return alphaOnly(event);" /></td>');
            }
            tbl.push("</tr>");
          };

        }

        tbl.push("</table>");
        puzzEl.append(tbl.join(''));

      }

    };

  var nav = {
        
    nextPrevNav: function(e, override) {

      var struck = override ? override : e.which,
        el = $(e.target),
        p = el.parent(),
        ps = el.parents(),
        selector;
      
      $('.current').removeClass('current');
      
      //selector = '.position-' + activePosition + ' input';
      
      //console.log('nextPrevNav activePosition & struck: '+ activePosition + ' '+struck);
        
      // move input focus/select to 'next' input
      switch(struck) {
        case 39: // right
          p
            .next()
            .find('input')
            .addClass('current')
            .select();
          if (currCol < cols - 1) {
            currCol = currCol + 1;
          };
          //console.log('currCol: ' + currCol);
          break;
        
        case 37: // left
          p
            .prev()
            .find('input')
            .addClass('current')
            .select();
          if (currCol > 0) {
            currCol = currCol - 1;
          };
          //console.log('currCol: ' + currCol);
          break;

        case 40: // down
          ps
            .next('tr')
            .find('input').eq(currCol)
            .addClass('current')
            .select();

          break;

        case 38: // up
          ps
            .prev('tr')
            .find('input').eq(currCol)
            .addClass('current')
            .select();

          break;

        default:
        break;
      }
                          
    }

  }

    puzInit.init();

  }

})(jQuery);