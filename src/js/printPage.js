/**
 * @classdesc This is a plugin to print a specific area in a web page.
 *
 * @class PrintPage
 *
 * @example
 *
 * $("#element").printPage();
 *
 * @author abdulkhaderp (Abdul khader P)
 * @version 1.0
 *
 * @license The MIT License (MIT)
 *
 * Copyright (c) 2015 abdulkhaderp
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module depending on jQuery.
        define(['jquery'], factory);
    } else {
        // No AMD. Register plugin with global jQuery object.
        factory(jQuery);
    }
}(function($) {
    $.fn.printPage = function(options) {
        id = this.attr('id');
        var _settings = $.extend({
            applyStyles: true,
            ignoreClass: '',
            ignoreId: '',
            appendTop: '',
            appendBottom: '',
            styleSheet: ''
        }, options);

        // Check if the iFrame exists, if not, create iFrame, set it hidden.			
        var iframe = document.querySelector('iframe#printPage-iframe');
        if (!iframe) {
            var iframe = document.createElement('iframe');
            iframe.id = "printPage-iframe";
            iframe.style.display = "none";
        }
        document.body.appendChild(iframe);
        iframe.contentWindow.document.body.innerHTML = "";

        // Get the specific element to print.
        var src = document.getElementById(id);

        // Get the node list of the element to print.
        var oldNodeList = src.querySelectorAll("*");

        // Create a copy of the element to print.
        var newPage = src.cloneNode(true);


        // Get the node list of the created copy.
        var newNodeList = newPage.querySelectorAll("*");

        /* 
         if applyStyles is set true , then
         traverse through the node list of the original element, fetch the computed styles of each node.
         Apply the style to the corresponding node in the created copy.
         Hide the element(s) (any) passed with ignoreId and ignoreClass arguments. 	
         */
        if (_settings.applyStyles) {
            for (var i = 0; i <= (oldNodeList.length - 1); i++)
            {
                var classes = $(newNodeList[i]).attr("class");
                var id = $(newNodeList[i]).attr("id");
                if (classes !== undefined && _settings.ignoreClass.length && classes.indexOf(_settings.ignoreClass) > -1)
                {
                    newNodeList[i].style.display = "none";
                }
                else if (id !== undefined && _settings.ignoreId.length && id === _settings.ignoreId)
                {
                    newNodeList[i].style.display = "none";
                }
                else
                {
                    newNodeList[i].style.cssText = getComputedStyle(oldNodeList [i]).cssText;
                }
            }

        }
        /*
         applyStyles is false. Traverse through the node list to hide the elements passed with
         ignoreId and ignoreClass arguments.
         */
        else {
            for (var i = 0; i <= (oldNodeList.length - 1); i++)
            {
                var classes = $(newNodeList[i]).attr("class");
                var id = $(newNodeList[i]).attr("id");
                if (classes !== undefined && _settings.ignoreClass.length && classes.indexOf(_settings.ignoreClass) > -1)
                {
                    newNodeList[i].style.display = "none";
                }
                else if (id !== undefined && _settings.ignoreId.length && id === _settings.ignoreId)
                {
                    newNodeList[i].style.display = "none";
                }
            }
        }

        newPage.style.cssText = getComputedStyle(src).cssText;

        // Append the new created copy to the iFrame
        iframe.contentWindow.document.body.appendChild(newPage);

        // Check for appendBottom argument.If exist,create a div for the text and append the div as footer.
        if ((_settings.appendBottom).length > 0) {
            var footer = "<div style='position:absolute;top:95%;width:100%;height:15px;text-align:center;'>" + _settings.appendBottom + "</div>";
            $(iframe.contentWindow.document.body).append(footer);
        }

        // Check for appendTop argument.If exist,create a div for the text and append the div as header.
        if ((_settings.appendTop).length > 0) {
            var header = "<div style='position:absolute;top:0;width:100%;height:15px;text-align:center;'>" + _settings.appendTop + "</div>";
            $(iframe.contentWindow.document.body).append(header);
            newPage.style.position = "relative";
            newPage.style.top = "30px";
        }

        // Check for styleSheet argument. If any styleSheet is to be referenced , create a <link> tag and append to head.
        if (_settings.styleSheet.length > 0) {
            $(iframe.contentWindow.document.head).empty();
            $(iframe.contentWindow.document.head).append('<link rel="stylesheet" href=' + _settings.styleSheet + '>');
        }
        /* Print the contents of the iFrame.
           To handle asynchronous execution,100ms delay is applied for the print call. 
        */
        setTimeout(function() {
            iframe.contentWindow.print();
        }, 100);
    };
}, this));
