$(document).ready(function () {
    $('.paymentYear').on('click', function () {
        var clickkey = $(this).data('payment-key');
        if (clickkey !== undefined) {
            $('.paymentMonthWrapper').slideUp(function () {
                $('.paymentMonthWrapper').removeClass('active');
            });

            $('.paymentMonthWrapper[data-payment-result="' + clickkey + '"]').slideDown(function () {
                $('.detailedDetails[data-payment-result="' + clickkey + '"]').addClass('active');
            });

            $('.paymentYear').removeClass('active');

            $(this).addClass('active');
        } else {
            console.warn('clickkey is undefined or not set on this element');
        }

    });

    $('.tabBtns button').on('click', function () {
        var clickkey = $(this).data('button-key');
        if (clickkey !== undefined) {
            $('.allOffersWrapper').slideUp(function () {
                $('.allOffersWrapper').removeClass('active');
            });

            $('.allOffersWrapper[data-content-key="' + clickkey + '"]').slideDown(function () {
                $('.allOffersWrapper[data-content-key="' + clickkey + '"]').addClass('active');
            });

            $('.tabBtns button').removeClass('activeTab');

            $(this).addClass('activeTab');
        } else {
            console.warn('clickkey is undefined or not set on this element');
        }

    });


    // ======================== loanDetialsChart Calls Chart  start========================
    Highcharts.chart('loanDetialsChart', {
        chart: {
            type: 'pie',
            custom: {},
            borderRadius: 0,
            events: {
                render() {
                    const chart = this,
                        series = chart.series[0];
                    let customLabel = chart.options.chart.custom.label;

                    if (!customLabel) {
                        customLabel = chart.options.chart.custom.label =
                            chart.renderer.label(
                                'Loan Paid<br/>' +
                                '<strong>70%</strong>'
                            )
                                .css({
                                    color: '#000',
                                    textAnchor: 'middle'
                                })
                                .add();
                    }

                    const x = series.center[0] + chart.plotLeft,
                        y = series.center[1] + chart.plotTop -
                            (customLabel.attr('height') / 2);

                    customLabel.attr({
                        x,
                        y
                    });
                    // Set font size based on chart diameter
                    customLabel.css({
                        fontSize: `${series.center[2] / 12}px`
                    });
                }
            }
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        title: {
            text: ' '
        },
        subtitle: {
            text: ' '
        },
        tooltip: {
            pointFormat: ' '
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                allowPointSelect: true,
                cursor: 'pointer',
                borderRadius: 0,
                dataLabels: [{
                    enabled: false,
                }, {
                    enabled: false,
                    distance: -15,
                    format: '',
                    style: {
                        fontSize: '12px'
                    }
                }],
                showInLegend: false
            }
        },
        series: [{
            name: 'Loan',
            colorByPoint: true,
            innerSize: '75%',
            data: [{
                name: 'Pending Loan',
                y: 20,
                color: '#E6E6E6'
            },
            {
                name: 'Loan Paid',
                y: 40,
                color: '#5FC088'
            },]
        }]
    });
    // ======================== loanDetialsChart Calls Chart  end========================
    
    
    
    
    // ======================== ccDetialsChart Calls Chart  start========================
    Highcharts.chart('ccDetialsChart', {
        chart: {
            type: 'pie',
            custom: {},
            borderRadius: 0,
            events: {
                render() {
                    const chart = this,
                        series = chart.series[0];
                    let customLabel = chart.options.chart.custom.label;

                    if (!customLabel) {
                        customLabel = chart.options.chart.custom.label =
                            chart.renderer.label(
                                'Total Spend<br/>' +
                                '<strong>20%</strong>'
                            )
                                .css({
                                    color: '#000',
                                    textAnchor: 'middle'
                                })
                                .add();
                    }

                    const x = series.center[0] + chart.plotLeft,
                        y = series.center[1] + chart.plotTop -
                            (customLabel.attr('height') / 2);

                    customLabel.attr({
                        x,
                        y
                    });
                    // Set font size based on chart diameter
                    customLabel.css({
                        fontSize: `${series.center[2] / 12}px`
                    });
                }
            }
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        title: {
            text: ' '
        },
        subtitle: {
            text: ' '
        },
        tooltip: {
            pointFormat: ' '
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                allowPointSelect: true,
                cursor: 'pointer',
                borderRadius: 0,
                dataLabels: [{
                    enabled: false,
                }, {
                    enabled: false,
                    distance: -15,
                    format: '',
                    style: {
                        fontSize: '12px'
                    }
                }],
                showInLegend: false
            }
        },
        series: [{
            name: 'Credit Card',
            colorByPoint: true,
            innerSize: '75%',
            data: [{
                name: 'Used Limit',
                y: 20,
                color: '#45C752'
            },
            {
                name: 'Unused Limit',
                y: 40,
                color: '#3E88EC'
            },]
        }]
    });
    // ======================== ccDetialsChart Calls Chart  end========================
})