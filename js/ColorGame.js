/*global $, alert, console, window, document*/
/* JSLint plusplus: true*/


$(function () {
    "use strict";

    var numOfSquares,
        colors,
        i,
        pickedColor,
        
        
        theHeader = $("header"),
        squares = $("div.squares_container div.square"),
        colorDisplay = $("header span#color_disp"),
        resetButton = $("button#reset"),
        modeButtons = $("div.mode_buttons button"),
        theMessage = $("span#message");
    
    
    (function init() {
        reset();
        playingMode();
        checkColor();
    }());
    
    
    function reset() {
        
        colors = generateRandomColors(numOfSquares);
                    
        pickedColor = pickAColor();
        
        assignColorsToSquares();
    }
    
    
    
    function playingMode() {
        for (i = 0; i < modeButtons.length; i++) {
            $(modeButtons[i]).on("click", function () {
                $(this).addClass("selected").siblings("button").removeClass("selected");
                $(theHeader).css("background-color", "#e7119f");
                $(theMessage).text("");
                $(resetButton).text("new colors");
                
                if ($(this).text() === "easy") {
                    
                    numOfSquares = 3;
                    
                } else {
                    
                    numOfSquares = 6;
                    
                    $(squares).css("display", "block");
                }
                reset();
            });
        }
    }
    
    
    function generateRandomColors(numOfSquares = 6) {
        
        var arr = [];        
        for (i = 0; i < numOfSquares; i++) {
            var r = Math.floor(Math.random() * 256),
                g = Math.floor(Math.random() * 256),
                b = Math.floor(Math.random() * 256),
                randomColor = "rgb(" + r + ", " + g + ", " + b + ")";
            arr[i] = randomColor;
        }
        return arr;
    }
    
    
    
    function pickAColor() {
        
        for (i = 0; i < colors.length; i++) { 
            var randomNumber = Math.floor(Math.random() * colors.length);
        }
        return colors[randomNumber];  
    }
    
    
    
    function assignColorsToSquares() {
        
        for (i = 0; i < squares.length; i++) {
            
            if (colors[i]) { 
                $(squares[i]).css({
                    "background-color": colors[i],
                    "opacity": 1
                });
            
            } else {
                
                $(squares[i]).css({
                    "display": "none"
                });
            }
        }
        colorDisplay.text(pickedColor);
    }    
    
    
    
    $(resetButton).on("click", function () {
        
        if ($(this).text() === "Play Again") {
            
            $(this).text("new colors");
        }
        
        reset();
        
        $(theMessage).text("");
        $(theHeader).css("background-color", "#e7119f");
        
    });
    
    
    function checkColor() {

        for (i = 0; i < squares.length; i++) {
        
                $(squares[i]).on("click", function () {
                
                    if ($(this).css("background-color") === pickedColor) {
                    
                        $(theMessage).text("Correct").css("color", "#49b77f").removeClass("danger");

                        $(theHeader).css("background-color", pickedColor);

                        $(resetButton).text("Play Again");
                        
                        $(this).siblings(".square").css({
                            "opacity": 1,
                            "background-color": pickedColor
                        });
                    
                    } else {
                        
                        $(this).css("opacity", 0);
                        
                        $(theMessage).text("Try Again!!!").addClass("danger");
                    }
                });
        }
    }
});