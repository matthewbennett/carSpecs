$(document).ready(function() {

    var edmundsApiKey = 'jdq9c2drnq3nqqwpcek7ynjv';
    var enmundsBaseUrl = 'https://api.edmunds.com/api/vehicle/v2/';
    var makes = {};
    var year = '2016';

    function fullscreen() {
        $('a').click(function() {
            if (!$(this).hasClass('noeffect')) {
                window.location = $(this).attr('href');
                return false;
            }
        });
    }

    fullscreen();


    var onPageLoad = {
        init: function() {
            this.getYears();
            this.getMakes();
        },

        getMakes: function() {
            $.get(enmundsBaseUrl + "makes?state=used&year=" + year+"&view=basic&fmt=json&api_key=" + edmundsApiKey, function(data) {
                console.log(data);
                makes = data.makes;
                populateMakes(data);
                $('.makePoint:eq(0)').trigger('click');
            });
        },
        getYears: function() {
            for (var i = 1990; i < 2017; i++) {
                $('#yearDrop').prepend('<li class="yearPoint"><a href="#">' + i + '</a></li>');
            }
        }
    };

    var userInteractions = {
        init: function() {
            this.setMake();
            this.setModel();
            this.setYear();
        },
        setMake: function() {
            $(document).on('click', '.makePoint', function() {
                var currentMake = $(this).text();
                $('.makeBtn').empty();
                $('.makeBtn').append(currentMake + '<span class="caret"></span>');
                populateModels(currentMake);
            });
        },
        setModel: function() {
            $(document).on('click', '.modelPoint', function() {
                var currentMake = $(this).text();
                $('.modelBtn').empty();
                $('.modelBtn').append(currentMake + '<span class="caret"></span>');
                populateModels(currentMake);
            });
        },
        setYear: function() {
            $(document).on('click', '.yearPoint', function() {
                var currentYear= $(this).text();
                year = currentYear;
                $('.yearBtn').empty();
                $('.yearBtn').append(currentYear + '<span class="caret"></span>');
                onPageLoad.getMakes();
                //populateModels(currentMake);
            });
        }
    };

    function populateMakes(data) {
        $('#makeDrop').empty();
        $.each(data.makes, function(ind, item) {
            $('#makeDrop').append('<li class="makePoint"><a href="#">' + item.name + '</a></li>')
        });
    };

    function populateModels(currentMake) {
        $.each(makes, function(ind, item) {
            if (item.name == currentMake) {
                $('.modelBtn').empty();
                $('.modelBtn').append(item.models[0].name + '<span class="caret"></span>');
                $('#modelDrop').empty();
                $.each(item.models, function(index, mod) {
                    $('#modelDrop').append('<li class="modelPoint"><a href="#">' + mod.name + '</a></li>');
                });
            }
        });
    };

    (function() {
        onPageLoad.init();
        userInteractions.init();
    }());

});