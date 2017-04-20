function addStaffToTable() {
    var $tbodyStaff = $("#tbody-staff");
    for(var i = 0; i < staff.length; i++) {
        var person = staff[i];
        var $personRow = $('<tr><td>' + person.id + '</td>'
                           + '<td>' + person.firstName + '</td>'
                           + '<td>' + person.lastName + '</td>'
                           + '<td>' + person.dateOfBirth + '</td>'
                           + '<td>' + person.function + '</td>' 
                           + '<td>' + person.experience + '</td></tr>');
        //         console.log(person);
        $personRow.data("person-index", i);
        $personRow.click(function() {
            window.location.href = "details.html?person_index=" 
                + $(this).data("person-index");
        });
        $tbodyStaff.append($personRow);

    }
}

$(document).ready(function() {
    addStaffToTable();
});



//pagination
var table = '#mytable'
$('#maxRows').on('change', function() {
    $('.pagination').html('')
    var trnum = 0
    var maxRow = parseInt($(this).val())
    var totalRows = $(table + ' tbody tr').length
    $(table + ' tr:gt(0)').each(function() {
        trnum++
        if (trnum > maxRow) {
            $(this).hide()
        }
        if (trnum <= maxRow) {
            $(this).show()
        }
    })
    if (totalRows > maxRow) {
        var pagenum = Math.ceil(totalRows/maxRow)
        for (var i = 1;  i <= pagenum;) {
            $('.pagination').append('<li data-page="' + i + '">\<span>' + i++ + '<span class="sr-only">(currnet)</span></span>\</li>').show()
        }
    }
    $('.pagination li:first-child').addClass('active')
    $('.pagination li').on('click', function() {
        var pageNum = $(this).attr('data-page')
        var trIndex = 0;
        $('.pagination li').removeClass('active')
        $(this).addClass('active')
        $(table + ' tr:gt(0)').each(function() {
            trIndex++
            if (trIndex > (maxRow * pageNum) || trIndex <= ((maxRow * pageNum) - maxRow)) {
                $(this).hide()
            }else {
                $(this).show()
            }
        });
    });
});

//sorting table

$('th').click(function(){
    var table = $(this).parents('table').eq(0)
    var rows = table.find("tr:not(:has('th'))").toArray().sort(comparer($(this).index()))
    this.asc = !this.asc
    if (!this.asc){rows = rows.reverse()}
    for (var i = 0; i < rows.length; i++){table.append(rows[i])}
})
function comparer(index) {
    return function(a, b) {
        var valA = getCellValue(a, index), valB = getCellValue(b, index)
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB)
    }
}
function getCellValue(row, index){ return $(row).children('td').eq(index).html() }

// filter
$('table').each(function(){
    var table = $(this)
    var headers = table.find('th').length
    var filterrow = $('<tr>').insertAfter($(this).find('th:last()').parent())
    for (var i = 0; i < headers; i++){
        filterrow.append($('<th>').append($('<input>').attr({type:'text', id: i + '-filter'}).keyup(function(){
            table.find('tr').show()
            filterrow.find('input[type=text]').each(function(){
                var index = $(this).parent().index() + 1
                var filter = $(this).val() != ''
                $(this).toggleClass('filtered', filter)
                if (filter){
                    var el = 'td:nth-child('+index+')'
                    var criteria = ":contains('"+$(this).val()+"')"
                    table.find(el+':not('+criteria+')').parent().hide()
                }
            })
        })))
    }
    filterrow.append($('<th>').append($('<button>Clear Filter</button>').attr('type','submit').click(function() {
        $(this).parent().parent().find('input[type=text]').val('').toggleClass('filtered', false)
        table.find('tr').show()
    })))
})
$(function () {
    $('#3-filter').datetimepicker();
});

