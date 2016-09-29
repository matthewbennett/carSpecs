$(document).ready(function() {

    var edmundsApiKey = 'jdq9c2drnq3nqqwpcek7ynjv';
    var enmundsBaseUrl = 'https://api.edmunds.com/api/vehicle/v2/';

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
            this.getMakes();
        },

        getMakes: function() {
            $.get(enmundsBaseUrl + "makes?state=used&year=2016&view=basic&fmt=json&api_key=" + edmundsApiKey, function(data) {
                console.log(data);
                // data.makes.splice(1, 1);
                // data.makes.splice(37, 1);
                // data.makes.splice(29, 1);
                // data.makes.splice(20, 1);
            });
        }
    };

    var userInteractions = {
        init: function() {
            this.showCars();
            this.viewCarDetials();
        },

        showCars: function() {
            $(document).on('mouseenter', '.carMakeSpecsContainer', function() {
                $(this).find('.makeCarsList').show();
            });
            $(document).on('mouseleave', '.carMakeSpecsContainer', function() {
                $(this).find('.makeCarsList').hide();
            });
        },
        viewCarDetials: function() {
            $(document).on('click', '.carNameContainer', function() {
                var engineID = null;
                var carID = $(this).attr('id');
                var makeID = $(this).parent().attr('id');
                $('.carTitle').text('');
                $(this).parent().parent().find('.carTitle').text(carID);
                $.get(enmundsBaseUrl + makeID + '/' + carID + '?state=new&year=2014&view=basic&fmt=json&api_key=' + edmundsApiKey, function(data) {
                    engineID = data.years[0].styles[0].id;
                    $.get(enmundsBaseUrl + 'styles/' + engineID + '/engines?availability=standard&fmt=json&api_key=' + edmundsApiKey, function(data) {
                        console.log(data);
                        var specs = Handlebars.compile($('#specInfo').html());
                        var specData = specs(data.engines[0]);
                        $('.specList').empty();
                        $('.specList').append(specData);
                    });
                    $.get('https://api.edmunds.com/v1/api/tco/newtruecosttoownbystyleidandzip/' + engineID + '/30341?fmt=json&api_key=' + edmundsApiKey, function(data) {
                        console.log(data);
                    });
                });
                $('.carSpecDropdown').hide();
                $('#drop' + makeID).show();
            });
        }
    };




    (function() {
        onPageLoad.init();
        userInteractions.init();
    }());

});