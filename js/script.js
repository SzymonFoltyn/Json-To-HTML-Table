
var staff = [];
$.getJSON('data/sluzba.json', function(data) {
    data.sort(function (a, b) {
        return a.id - b.id;
    });
    
    staff = data;
});


function getZURLParameters() {
    var qs = window.location.search.substring(1);
    qs = qs.split('+').join(' ');
    var params = {},
            tokens,
            re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}












