# printPage
PrintPage is a plugin for printing specific areas of a webpage.

#### Version: 
1.0

#### Author: 
abdulkhaderp (Abdul Khader)

## How to use:

Include jQuery ,

	<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.3.min.js" />

Include plugin ,

	<script type="text/javascript" src="printPage.js" />
	
Print element,

	$("#elementID").printPage();
	
Optional configurations,

	$("#elementID").printPage({
      	      applyStyles:true,
              ignoreId: "no-print",
              ignoreClass:"no-print",
              styleSheet: "path/style.css",
              appendTop: "HeaderText",
              appendBottom: "FooterText"
	});
	
Optional configurations-In detail,

####applyStyles

 - Default: `true`  
 - Expected: true or false  
 - Function: Whether to copy the applied styles on the element

####ignoreId

 - Default:  null  
 - Expected: id selector of an element  
 - Function: Do not print the element with this id
 - Example : no-print

####ignoreClass

 - Default:  null  
 - Expected: class selector of an element  
 - Function: Do not print the element(s) with this selector
 - Example : no-print
 
####styleSheet

 - Default: null  
 - Expected: link to a stylesheet  
 - Function: To include an external stylesheet to apply the styles.
 - Example : "path/style.css"
 
####appendTop

 - Default: null  
 - Expected: String (Header text)  
 - Function: To include a header text.
 - Example : "Example Header" 
 
####appendBottom

 - Default: null  
 - Expected: String (Footer text)  
 - Function: To include a footer text.
 - Example : "Example footer copy@2015"
 
 
 

