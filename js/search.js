function foundAndShowPersons() {
	var ZURLParameters = getZURLParameters();
	var searchText = ZURLParameters["search-text"];
	
	if(searchText == null || searchText.trim() == "") {
		var foundedPersons= [];
	} else {
		var foundedPersons = searchPersons(searchText);
	}

	if(foundedPersons.length) {
		$("#alert-success").show();
	} else {
		$("#alert-warning").show();
	}

	showFoundedPersons(foundedPersons);
}

function showFoundedPersons(foundedPersons) {
	var $tamplate = $("#template-founded-person")
	for(var i = 0; i < foundedPersons.length; i++) {
		var person = foundedPersons[i];
		var $personPanel = $tamplate.clone();
		$personPanel.removeAttr("id");
		var firstNameLastName = person.firstName + " " + person.lastName;
		$personPanel.find(".firstName-lastName").text(firstNameLastName);
		$personPanel.find(".dOb").text(person.dateOfBirth);
		$personPanel.find(".function").text(person.function);
		$personPanel.find(".experience").text(person.experience);
		$personPanel.show();
		$("#founded-persons").append($personPanel);
	}
}

function searchPersons(searchText) {
	var foundedPersons = [];
	for (var i = 0; i < staff.length; i++) {
		var person = staff[i];
		var dataOfPerson = person.firstName + " " + person.lastName + " "
				+ person.firstName;
		if(dataOfPerson.indexOf(searchText) !== -1) {
			foundedPersons.push(person);
		}
	}
	return foundedPersons;
}

$(document).ready(function() {
	foundAndShowPersons();
});