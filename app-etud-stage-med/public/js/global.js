(function ($) {
    'use strict';
    /*==================================================================
        [ Daterangepicker ]*/
    
    
    try {
    
        $('#input-start').daterangepicker({
            ranges: true,
            autoApply: true,
            applyButtonClasses: false,
            autoUpdateInput: false
        },function (start, end) {
    
            var startDay = start.format('DD/MMM/YYYY');
            var endDay = end.format('DD/MMM/YYYY');
    
            $('#input-start').val(startDay.replace(/\//g, ' '));
            $('#input-end').val(endDay.replace(/\//g, ' '));
        });
    
        $('#input-start-2').daterangepicker({
            ranges: true,
            autoApply: true,
            applyButtonClasses: false,
            autoUpdateInput: false
        },function (start, end) {
            $('#input-start-2').val(start.format('MM/DD/YYYY'));
            $('#input-end-2').val(end.format('MM/DD/YYYY'));
        });
    
    } catch(er) {console.log(er);}
    /*==================================================================
        [ Single Datepicker ]*/
    
    
    try {
        var singleDate = $('.js-single-datepicker');
    
        singleDate.each(function () {
            var that = $(this);
            var dropdownParent = '#dropdown-datepicker' + that.data('drop');
    
            that.daterangepicker({
                "singleDatePicker": true,
                "showDropdowns": true,
                "autoUpdateInput": true,
                "parentEl": dropdownParent,
                "opens": 'left',
                "locale": {
                    "format": 'DD/MM/YYYY'
                }
            });
        });
    
    } catch(er) {console.log(er);}
    /*==================================================================
        [ Special Select ]*/
    
    try {
        var body = $('body,html');
    
        var selectSpecial = $('#js-select-special');
        var info = selectSpecial.find('#info');
        var dropdownSelect = selectSpecial.parent().find('.dropdown-select');
        var listRoom = dropdownSelect.find('.list-room');
        var btnAddRoom = $('#btn-add-room');
        var totalRoom = 1;
    
        selectSpecial.on('click', function (e) {
            e.stopPropagation();
            $(this).toggleClass("open");
            dropdownSelect.toggleClass("show");
        });
    
        dropdownSelect.on('click', function (e) {
            e.stopPropagation();
        });
    
        body.on('click', function () {
            selectSpecial.removeClass("open");
            dropdownSelect.removeClass("show");
        });
    
    
        listRoom.on('click', '.plus', function () {
            var that = $(this);
            var qtyContainer = that.parent();
            var qtyInput = qtyContainer.find('input[type=number]');
            var oldValue = parseInt(qtyInput.val());
            var newVal = oldValue + 1;
            qtyInput.val(newVal);
    
            updateRoom();
        });
    
        listRoom.on('click', '.minus', function () {
            var that = $(this);
            var qtyContainer = that.parent();
            var qtyInput = qtyContainer.find('input[type=number]');
            var min = qtyInput.attr('min');
    
            var oldValue = parseInt(qtyInput.val());
            if (oldValue <= min) {
                var newVal = oldValue;
            } else {
                var newVal = oldValue - 1;
            }
            qtyInput.val(newVal);
    
            updateRoom();
        });
    
    
    
        listRoom.on('change', '.inputQty', function () {
            var that = $(this);
            if (isNumber(that.val())) {
                var qtyVal = parseInt(that.val());
                if (that.val().length === 0) {
                    qtyVal = 0;
                }
    
                if (qtyVal < 0) {
                    qtyVal = 0;
                }
                that.val(qtyVal);
    
                updateRoom();
            }
        });
    
        function isNumber(n){
            return typeof(n) != "boolean" && !isNaN(n);
        }
    
        btnAddRoom.on('click', function (e) {
            e.preventDefault();
    
            totalRoom++;
    
            listRoom.append('<li class="list-room__item">' +
                '                                        <span class="list-room__name"> Room '+ totalRoom +'</span>' +
                '                                        <ul class="list-person">' +
                '                                            <li class="list-person__item">' +
                '                                                <span class="name">' +
                '                                                    Adults' +
                '                                                </span>' +
                '                                                <div class="quantity quantity1">' +
                '                                                    <span class="minus">' +
                '                                                        -' +
                '                                                    </span>' +
                '                                                    <input type="number" min="0" value="0" class="inputQty">' +
                '                                                    <span class="plus">' +
                '                                                        +' +
                '                                                    </span>' +
                '                                                </div>' +
                '                                            </li>' +
                '                                            <li class="list-person__item">' +
                '                                                <span class="name">' +
                '                                                    Children' +
                '                                                </span>' +
                '                                                <div class="quantity quantity2">' +
                '                                                    <span class="minus">' +
                '                                                        -' +
                '                                                    </span>' +
                '                                                    <input type="number" min="0" value="0" class="inputQty">' +
                '                                                    <span class="plus">' +
                '                                                        +' +
                '                                                    </span>' +
                '                                                </div>' +
                '                                            </li>' +
                '                                        </ul>');
    
    
            updateRoom();
        });
    
    
        function countAdult() {
            var listRoomItem = listRoom.find('.list-room__item');
            var totalAdults = 0;
    
            listRoomItem.each(function () {
                var that = $(this);
                var numberAdults = parseInt(that.find('.quantity1 > input').val());
    
                totalAdults = totalAdults + numberAdults;
    
            });
    
            return totalAdults;
        }
    
        function countChildren() {
            var listRoomItem = listRoom.find('.list-room__item');
            var totalChildren = 0;
    
            listRoomItem.each(function () {
                var that = $(this);
                var numberChildren = parseInt(that.find('.quantity2 > input').val());
    
                totalChildren = totalChildren + numberChildren;
            });
    
            return totalChildren;
        }
    
        function updateRoom() {
            var totalAd = parseInt(countAdult());
            var totalChi = parseInt(countChildren());
            var adults = 'Adult, ';
            var rooms = 'Room';
    
            if (totalAd > 1) {
                adults = 'Adults, ';
            }
    
            if (totalRoom > 1) {
                rooms = 'Rooms';
            }
    
            var infoText = totalAd + ' ' + adults + totalChi + ' ' + 'Children, ' + totalRoom + ' ' + rooms;
    
            info.val(infoText);
        }
    
    } catch (e) {
        console.log(e);
    }

})(jQuery);

var $table = $('#table')
var $remove = $('#remove')
var selections = []

function getIdSelections() {
  return $.map($table.bootstrapTable('getSelections'), function (row) {
    return row.id
  })
}

function responseHandler(res) {
  $.each(res.rows, function (i, row) {
    row.state = $.inArray(row.id, selections) !== -1
  })
  return res
}

function detailFormatter(index, row) {
  var html = []
  $.each(row, function (key, value) {
    html.push('<p><b>' + key + ':</b> ' + value + '</p>')
  })
  return html.join('')
}

function operateFormatter(value, row, index) {
  return [
    '<a class="like" href="javascript:void(0)" title="Like">',
    '<i class="fa fa-heart"></i>',
    '</a>  ',
    '<a class="remove" href="javascript:void(0)" title="Remove">',
    '<i class="fa fa-trash"></i>',
    '</a>'
  ].join('')
}

window.operateEvents = {
  'click .like': function (e, value, row, index) {
    alert('You click like action, row: ' + JSON.stringify(row))
  },
  'click .remove': function (e, value, row, index) {
    $table.bootstrapTable('remove', {
      field: 'id',
      values: [row.id]
    })
  }
}

function totalTextFormatter(data) {
  return 'Total'
}

function totalNameFormatter(data) {
  return data.length
}

function totalPriceFormatter(data) {
  var field = this.field
  return '$' + data.map(function (row) {
    return +row[field].substring(1)
  }).reduce(function (sum, i) {
    return sum + i
  }, 0)
}

function initTable() {
  $table.bootstrapTable('destroy').bootstrapTable({
    height: 550,
    locale: $('#locale').val(),
    columns: [
      [{
        field: 'state',
        checkbox: true,
        rowspan: 2,
        align: 'center',
        valign: 'middle'
      }, {
        title: 'Item ID',
        field: 'id',
        rowspan: 2,
        align: 'center',
        valign: 'middle',
        sortable: true,
        footerFormatter: totalTextFormatter
      }, {
        title: 'Item Detail',
        colspan: 3,
        align: 'center'
      }],
      [{
        field: 'name',
        title: 'Item Name',
        sortable: true,
        footerFormatter: totalNameFormatter,
        align: 'center'
      }, {
        field: 'price',
        title: 'Item Price',
        sortable: true,
        align: 'center',
        footerFormatter: totalPriceFormatter
      }, {
        field: 'operate',
        title: 'Item Operate',
        align: 'center',
        clickToSelect: false,
        events: window.operateEvents,
        formatter: operateFormatter
      }]
    ]
  })
  $table.on('check.bs.table uncheck.bs.table ' +
    'check-all.bs.table uncheck-all.bs.table',
  function () {
    $remove.prop('disabled', !$table.bootstrapTable('getSelections').length)

    // save your data, here just save the current page
    selections = getIdSelections()
    // push or splice the selections if you want to save all data selections
  })
  $table.on('all.bs.table', function (e, name, args) {
    console.log(name, args)
  })
  $remove.click(function () {
    var ids = getIdSelections()
    $table.bootstrapTable('remove', {
      field: 'id',
      values: ids
    })
    $remove.prop('disabled', true)
  })
}

$(function() {
  initTable()

  $('#locale').change(initTable)
})