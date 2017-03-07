
if(document.getElementById("showJson")){
	document.getElementById("showJson").addEventListener("click", showJson);
}



function showJson(){
	var request = new XMLHttpRequest();
	request.open("GET", "students.json", true);
	request.send();

	request.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			var data = JSON.parse(this.responseText);
			var students = new Students(data);
			students.clearList();
		}
	}
}


function Students(data){
	this.data = data;

	this.ul = document.getElementById("list");


	this.clearList = function(callback){
		var lis = this.ul.children;
		for(var i =0; i<lis.length; i++){
			lis.removeChild(lis[i]);
		}
		callback(this.createList());
	};


	this.createList = function(){
		if(this.data.length > 0){				
			for(var i in data){
				this.createElement("li", "Name : "+data[i].name, this.ul);
				this.createElement("li", "Age : "+data[i].age, this.ul);
				this.createElement("li", "Grade : "+data[i].grade + " %", this.ul);
			}
		}

	};

	this.createElement = function (element, text, parent){
		var element = document.createElement(element);
		var content = document.createTextNode(text);
		element.appendChild(content);
		element.setAttribute("class", "list");
		parent.appendChild(element);
	};
}
