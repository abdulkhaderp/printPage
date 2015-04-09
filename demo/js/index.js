/*
File to handle click events of demo html.
*/

// Function to print the the whole page.
// ignore-print class is given for ignoreClass property.
function printAll() {
    $("#container").printPage({
        ignoreClass: "ignore-print"
    });
}
// Function to print the image.
// ignore-print class is given for ignoreClass property. 
// A text is given for appendTop property.
function printImage() {
    $("#left-section").printPage({
        appendTop: "Image",
        ignoreClass: "ignore-print"
    });
}
// Function to print the text.
// ignore-print class is given for ignoreClass property. 
function printText() {
    $("#right-section").printPage({
        ignoreClass: "ignore-print"
    });
}
//Function to print the SVG.
// ignore-print class is given for ignoreClass property. 
//A text is given as appendBottom property.
function printSVG() {
    $("#bottom").printPage({
        ignoreClass: "ignore-print",
        appendBottom: "c@2015"
    });
}