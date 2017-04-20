function showPersonDetails() {
    var ZURLParameters = getZURLParameters();
    var personIndex = ZURLParameters.person_index;
    var person = staff[personIndex];
	var firstNameLastName = person.firstName + " " + person.lastName;
	document.title = firstNameLastName;
    $("#firstName-lastName").text(firstNameLastName);
    $("#dOb").text(person.dateOfBirth);
    $("#function").text(person.function);
    $("#experience").text(person.experience);
}


$(document).ready(function() {
	showPersonDetails();
});





