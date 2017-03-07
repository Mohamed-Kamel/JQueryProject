
if(document.getElementById("addText")){
	document.getElementById("addText").addEventListener("click", insertText);
}



function insertText(event){
	event.preventDefault();
	var form = document.forms["myForm"],
	text = form["input"].value;
	document.getElementById("error").style.display = "none";
	var ul = document.getElementById("list");
	text = text.trim();	

	if(text.length <= 0){

		showError("Sorry You can't enter an empty String");

	}else if(isFirst(ul.children)){

		createElement("li", text, ul);

	}else if (!isFound(ul.children, text)) {

		createElement("li", text, ul);

	}
}



function isFirst(li){
	if (li.length <= 0) {
		return true;
	}

	return false;
}

function isFound(li, text){
	for(var i = 0; i<li.length; i++){
		if(li[i].innerHTML == text){
			showError("Sorry, You can't enter a string twice");
			return true;
			break;
		}
	}
	return false;
}

function createElement(element, text, parent){
	var element = document.createElement(element);
	var content = document.createTextNode(text);
	element.appendChild(content);
	element.setAttribute("class", "list");
	element.setAttribute("id", text);
	element.addEventListener("click", removeElement);
	parent.appendChild(element);
}

function showError(msg){
	var error = document.getElementById("error");
	error.innerHTML = msg;
	error.setAttribute("class", "alert");
	error.style.display = "block";
}


function removeElement(event){
	var request = confirm("Are you sure that you want to delete this element ?!!");
	if(request == true){
		event.target.parentNode.removeChild(event.target);
	}
}
