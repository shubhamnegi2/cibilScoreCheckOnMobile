$(document).ready(function () {

    $('.historyCard').on('click', function () {
        if (!$(this).hasClass('activeCardLeft')) {
            var clickkey = $(this).data('clickkey');
            if (clickkey !== undefined) {
                $('.detailedDetails').slideUp(function () {
                    $('.detailedDetails').removeClass('activeChart');
                });

                $('.detailedDetails[data-showkey="' + clickkey + '"]').slideDown(function () {
                    $('.detailedDetails[data-showkey="' + clickkey + '"]').addClass('activeChart');
                });
                $('.historyCard').removeClass('activeCardLeft');

                $(this).addClass('activeCardLeft');
            } else {
                console.warn('clickkey is undefined or not set on this element');
            }

            var completeHeight = $('.userfinancialDetails').outerHeight(true); // Include margins
            console.log(completeHeight);
        }
    });

   

    // ======================== cibilScoreChart Calls Chart  start========================
    Highcharts.chart('cibilScoreChart', {

        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false,
        },

        title: {
            text: ''
        },

        pane: {
            startAngle: -90,
            endAngle: 89.9,
            background: null,
            center: ['50%', '75%'],
            size: '110%'
        },

        // the value axis
        yAxis: {
            min: 300,
            max: 850,
            tickPixelInterval: 90,
            tickPosition: 'inside',
            tickColor: Highcharts.defaultOptions.chart.backgroundColor || '#FFFFFF',
            tickLength: 20,
            tickWidth: 2,
            minorTickInterval: null,
            labels: {
                distance: 10,
                style: {
                    fontSize: getLabelFontSize(),
                    color: '#000' 
                }
            },
            tickPositioner: function () {
                // Manually specify the ticks to show 850
                return [300, 400, 500, 600, 700, 800, 850];
            },
            lineWidth: 0,
            plotBands: [{
                from: 300,
                to: 410,
                color: '#f9382f',
                thickness: 20
            }, {
                from: 410,
                to: 520,
                color: '#f9382f',
                thickness: 20
            }, {
                from: 520,
                to: 630,
                color: '#f8c200',
                thickness: 20,
            },
            {
                from: 630,
                to: 740,
                color: '#05b374',
                thickness: 20,
            },
            {
                from: 740,
                to: 850,
                color: '#058b59',
                thickness: 20,
            }]
        },
        series: [{
            name: 'CIBIL Score',
            data: [650], // Example score; adjust as needed
            tooltip: {
                valueSuffix: ''
            },
            dataLabels: {
                format: '{y} ',
                borderWidth: 0,
                style: {
                    fontSize: '30px',
                    fontWeight: '700',
                },
                y: -40,
                color: (
                    Highcharts.defaultOptions.title &&
                    Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color
                ) || '#333333',
            },
            dial: {
                radius: '80%',
                backgroundColor: 'gray',
                baseWidth: 12,
                baseLength: '0%',
                rearLength: '0%'
            },
            pivot: {
                backgroundColor: 'gray',
                radius: 6
            }
        }]

    });
    function getLabelFontSize() {
        if (window.innerWidth <= 576) { // For mobile screens (width less than or equal to 576px)
            return '8px';
        } else { // For larger screens (desktop)
            return '12px';
        }
    }
    // ======================== cibilScoreChart Calls Chart  end========================



    // ======================== PaymentHistoryDetailsChart Calls Chart  start========================
    Highcharts.chart('PaymentHistoryDetailsChart', {
        chart: {
            type: 'spline',
            height: 200,
            scrollablePlotArea: {
                minWidth: 600,
                scrollPositionX: 1
            }
        },
        title: {
            text: '',
            align: 'left'
        },
        xAxis: {
            categories: ['Oct 2021', 'Nov 2021', 'Dec 2021', 'Jan 2022', 'Feb 2022', 'Mar 2022'],
            labels: {
                overflow: 'justify',
                style: {
                    fontSize: '12px', // Adjust the font size for the labels
                    color: '#000000' // Change the font color
                }
            }
        },
        yAxis: {
            title: {
                text: ''
            },
            min: 6,
            max: 12,
            tickPositions: [6, 8, 10, 12],
            gridLineWidth: 1,
            tickLength: 5,
            labels: {
                y: 10 // Adjust the position of the labels closer to the axis
            }
        },
        tooltip: {
            valueSuffix: ' m/s'
        },
        plotOptions: {
            spline: {
                lineWidth: 6,
                states: {
                    hover: {
                        lineWidth: 5
                    }
                },
                marker: {
                    enabled: false
                }
            }
        },
        series: [{
            name: 'On time',
            color: '#FB896B',
            data: [8.4, 8.2, 8.7, 9.3, 8.5, 9.0]
        }, {
            name: 'Delayed',
            color: '#6956E5',
            data: [7.2, 7.1, 7.3, 7.9, 7.0, 8.2]
        }],
        navigation: {
            menuItemStyle: {
                fontSize: '10px'
            }
        }
    });
    // ======================== PaymentHistoryDetailsChart Calls Chart  end========================



    // ======================== creditCardUtilizationDetialsChart Calls Chart  start========================
    Highcharts.chart('creditCardUtilizationDetialsChart', {
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
                                '<strong>₹20K</strong>'
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
                    enabled: false, // Disable the default data labels
                }, {
                    enabled: false, // Disable percentage labels
                    distance: -15,
                    format: '', // No format, so nothing is displayed
                    style: {
                        fontSize: '12px'
                    }
                }],
                showInLegend: false
            }
        },
        series: [{
            name: 'Utilization',
            colorByPoint: true,
            innerSize: '75%',
            data: [{
                name: 'Card 1',
                y: 40,
                color: '#14B8A6'
            }, {
                name: 'Card 2',
                y: 20,
                color: '#3B82F6'
            }, {
                name: 'Card 3',
                y: 10,
                color: '#F59E0B'
            }, {
                name: 'Card 4',
                y: 10,
                color: '#FACC15'
            }]
        }]
    });

    // ======================== creditCardUtilizationDetialsChart Calls Chart  end========================



    // ======================== ApplicationInitiatedChart Calls Chart  start========================
    var options = {
        series: [50, 20], // Your values
        chart: {
            height: 200,     // Height of the chart
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                dataLabels: {
                    name: {
                        fontSize: '10px',
                    },
                    value: {
                        fontSize: '18px',
                        offsetY: 10,
                    },
                    total: {
                        show: true,
                        label: 'Accounts',
                        formatter: function (w) {
                            return 7; // Total of 5 + 2
                        },

                    }
                },
            }
        },
        fill: {
            colors: ['#14B8A6', '#3B82F6'], // Your color choices
        },
        labels: ['Closed Account', 'Active Account'],
    };

    var chart = new ApexCharts(document.querySelector("#TotalAccountDetialsChart"), options);
    chart.render();

    // ======================== ApplicationInitiatedChart Calls Chart  end========================


})
