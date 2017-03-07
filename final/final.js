//Handle button events
$(document).ready(function (){

	//add text button action
	$("#addText").on("click", addItem);

	//clear all button action
	$("#clear").on("click", clearAll);

	//remove one element by delegation
	$("#list").on("click", "li", function(){		
		$("#error").css("display", "none");
		var request = confirm("Are you sure that you want to delete this element ?!!");
		if(request == true){
			$(this).remove();
		}
	});

	//use ajax to get json file
	$('#showJson').on("click", function(){
		$(this).hide();
		$("#input").hide();
		$("#addText").hide();
		$("#toDo").show();
        //start ajax request
        $.ajax({
            url: "students.json",
            //force to handle it as text
            dataType: "text",
            success: function(data) {
                var json = $.parseJSON(data);
                $.each(json, function(index, value){
                	$("#list").append('<li class="list">'+value.name+"</li>");
                	$("#list").append('<li class="list">'+value.age+"</li>");
                	$("#list").append('<li class="list">'+value.grade+"</li>");
                });
            }
        });
    });

	$("#toDo").on("click", function(){
		$(this).hide();
		$("#list").empty();
		$("#input").show();
		$("#addText").show();
		$("#showJson").show();
	});
});

//an event function to create a list and add the input text to it
function addItem(event){

	$("#error").css("display", "none");

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
	$("#error").css("display", "none");
	var request = confirm("Are you sure that you want to clear all elements ?!!");
	if(request == true){
		$("#list").empty();
	}
	$("#clear").css("display", "none");
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

		if(this.list.length <= 0){

			this.addElement();
			$("#clear").css("display", "block");

		}else if (this.checkText(this.text)) {
			this.addElement();
			$("#clear").css("display", "block");
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
		this.parent.append('<li class="list">'+this.text+'</li>');
	};


	//show an error message
	this.showError = function(msg){
		$("#error").text(msg).addClass("alert").css("display", "block");
	};

}