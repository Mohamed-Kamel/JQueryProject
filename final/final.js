//Handle button events
$(document).ready(function (){

	//add text button action
	$("#addText").on("click", addItem);

	//clear all button action
	$("#clear").on("click", clearAll);

	//remove one element by delegation
	$("#list").on("click", "li", function(){		
		$("#error").hide();
		var request = confirm("Are you sure that you want to delete this element ?!!");
		if(request == true){
			$(this).remove();
		}
	});

	//use ajax to get json file
	$('#showJson').on("click", function(){
		var list = $("#list");
		list.empty();
		$("#error").hide();
		$("#clear").hide();
		$(this).hide();
		$("#input").hide();
		$("#addText").hide();
		$("#toDo").fadeIn(200);
		var createList = "";
        // start ajax request
        $.ajax({
            url: "students.json",
            //force to handle it as text
            dataType: "text",
            success: function(data) {
                var json = $.parseJSON(data);
                $.each(json, function(index, value){
                	$("<li></li>",{
                		class : "list",
                		text  : value.name
                	}).appendTo(list);
                	
                	$("<li></li>",{
                		class : "list",
                		text  : value.age
                	}).appendTo(list);

                	$("<li></li>",{
                		class : "list",
                		text  : value.grade
                	}).appendTo(list);
               });
            },
            error: function(data){
            	alert("error" + data.error);
            }
        }); 
    });

	$("#toDo").on("click", function(){
		$("#list").empty();
		$("#error").hide();
		$("#clear").hide();
		$(this).fadeOut(200);
		$("#myForm").children().show();
		$("#showJson").fadeIn(200);
	});

});

//an event function to create a list and add the input text to it
function addItem(event){

	$("#error").hide();

	//prevent the redirection
	event.preventDefault();
	
	//get the input value
	var text = $("#input").val();

	//terminate the spaces
	text = text.trim();

	//create object from class AddText
	var addText = new AddText(text, "li", $("#list"));
	addText.insert();
}


//an event function to clear the entire list
function clearAll(){
	$("#error").hide();
	var request = confirm("Are you sure that you want to clear all elements ?!!");
	if(request == true){
		$("#list").empty();
	}
	$("#clear").hide();
}


//class to add the input to the list
function AddText(text, element, parent){
	//properties initialization 
	this.text = text;
	this.element = element;
	this.parent = parent;
	this.list = parent.children();
	
	//function to insert the input text to the list
	this.insert = function(){
		var clear = $("#clear");

		if(this.list.length <= 0){

			this.addElement();
			clear.show();

		}else if (this.checkText(this.text)) {
			
			this.addElement();
			clear.show();

		}
	};

	//check the text if there is an empty or the same string
	this.checkText = function(text){

		if(text.length < 1){
			//if the input is empty
			this.showError("Sorry, You can't enter an empty string");
			return false;

		}else{	
			check = false;
			//check if there is the same text in the list
			$(this.list).each(function(index, element){
				if(check){
					return true;
				}
				check = (element.innerHTML == text);
			});
			
			if(check){
				this.showError("Sorry, You can't enter the same string twice");
				return false;
			}
			return true;

		}
	};


	//create list item and add it to the list
	this.addElement = function(){
		$('<li></li>', {
			class: "list",
			text : this.text
		}).appendTo(this.parent);
	};


	//show an error message
	this.showError = function(msg){
		$("#error").text(msg).addClass("alert").show();
	};

}


