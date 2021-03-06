
if(document.getElementById("addText")){
	document.getElementById("addText").addEventListener("click", insertText);
}

// Solution one

function insertText(event){
	event.preventDefault();
	var form = document.forms["myForm"],
	text = form["input"].value;
	document.getElementById("error").style.display = "none";
	var ul = document.getElementById("list");
	text = text.trim();	

	var checkInput = new CheckInput();
	

	if(text.length <= 0){

		checkInput.showError("Sorry You can't enter an empty String");

	}else if(checkInput.isFirst(ul.children)){

		checkInput.createElement("li", text, ul);

	}else if (!checkInput.isFound(ul.children, text)) {

		checkInput.createElement("li", text, ul);

	}
}


function CheckInput(){
	this.isFirst = function (li){
		if (li.length <= 0) {
			return true;
		}

		return false;
	},

	this.isFound = function (li, text){
		for(var i = 0; i<li.length; i++){
			if(li[i].innerHTML == text){
				this.showError("Sorry, You can't enter a string twice");
				return true;
				break;
			}
		}
		return false;
	};

	this.createElement = function (element, text, parent){
		var element = document.createElement(element);
		var content = document.createTextNode(text);
		element.appendChild(content);
		element.setAttribute("class", "list");
		element.setAttribute("id", text);
		element.addEventListener("click", this.removeElement);
		parent.appendChild(element);
	};

	this.showError = function (msg){
		var error = document.getElementById("error");
		error.innerHTML = msg;
		error.setAttribute("class", "alert");
		error.style.display = "block";
	};

	this.removeElement = function(event){
		var request = confirm("Are you sure that you want to delete this element ?!!");
		if(request == true){
			event.target.parentNode.removeChild(event.target);
		}
	};
}


/*****************************************Solution two************************************

function insertText(event){
	event.preventDefault();
	var form = document.forms["myForm"],
	text = form["input"].value;
	document.getElementById("error").style.display = "none";
	var ul = document.getElementById("list");
	text = text.trim();	

	var checkInput = Object.create(CheckInput);
	

	if(text.length <= 0){

		checkInput.showError("Sorry You can't enter an empty String");

	}else if(checkInput.isFirst(ul.children)){

		checkInput.createElement("li", text, ul);

	}else if (!checkInput.isFound(ul.children, text)) {

		checkInput.createElement("li", text, ul);

	}
}


var CheckInput = {
	isFirst: function (li){
		if (li.length <= 0) {
			return true;
		}

		return false;
	},

	isFound: function (li, text){
		for(var i = 0; i<li.length; i++){
			if(li[i].innerHTML == text){
				this.showError("Sorry, You can't enter a string twice");
				return true;
				break;
			}
		}
		return false;
	},

	createElement: function (element, text, parent){
		var element = document.createElement(element);
		var content = document.createTextNode(text);
		element.appendChild(content);
		element.setAttribute("class", "list");
		element.setAttribute("id", text);
		element.addEventListener("click", this.removeElement);
		parent.appendChild(element);

	},

	showError: function (msg){
		var error = document.getElementById("error");
		error.innerHTML = msg;
		error.setAttribute("class", "alert");
		error.style.display = "block";
	},
	
	removeElement: function(event){
		var request = confirm("Are you sure that you want to delete this element ?!!");
		if(request == true){
			event.target.parentNode.removeChild(event.target);
		}
	}
};
*/