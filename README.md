xwHelper
========

Crossword Helper

This helper is not intended to be useful as a crossword solver. this helper does not handle clues and clues numbers relation.

This application is useful if you want to replicate a crossword from paper or digital image (jpg, png, any image or photo).

The default grid is 15x15 (standard for quick crossword and cryptic crossword). This default dimension can be changed from code.

For the development it was reviewed the codebase of [Crossword by Jesse Weisbeck](https://github.com/jweisbeck/Crossword). The useful code for this basic helper are the related to **building the grid** (html table TDs and INPUTs) and **navigation** (key event delegation). [Notes about jweisbeck/Crossword codebase](https://drive.google.com/open?id=0B0-Idrj2DWaAQ2VKVS1wWEZmY2c&authuser=0): Objects, functions, etc.

[Live Demo](http://codepen.io/fcedillo/full/pvyLqa/)

Move through board using arrow keys (left, right, up and down).

TIP: Use capital characters (caps lock)

To insert number references on a square just type the number.

Use SPACEBAR to make a square checked (black), SPACEBAR again to make it white.
Use also SPACEBAR to delete number references to clues, e.g. when you mistake when typing.
