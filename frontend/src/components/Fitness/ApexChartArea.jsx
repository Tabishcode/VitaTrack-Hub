
import React from 'react';
import ReactApexChart from 'react-apexcharts';


class ApexChartArea extends React.Component {
    constructor(props) {
        super(props);
        function generateDayWiseTimeSeries(baseDate, n, { min, max }) {
            let series = [];
            let date = baseDate;
            for (let i = 0; i < n; i++) {
                series.push([date, Math.floor(Math.random() * (max - min + 1)) + min]);
                date += 86400000; // Increment by one day
            }
            return series;
        }        
        this.state = {
            series: [
                {
                    name: 'BMI',
                    data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
                        min: 10,
                        max: 60
                    })
                },
                {
                    name: 'Weight',
                    data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
                        min: 10,
                        max: 20
                    })
                },
                {
                    name: 'Calories',
                    data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
                        min: 10,
                        max: 15
                    })
                }
            ],
            options: {
                chart: {
                    type: 'area',
                    height: 350,
                    stacked: true,
                    zoom: {
                        enabled: false
                    },
                    events: {
                        selection: function (chart, e) {
                            console.log(new Date(e.xaxis.min))
                        }
                    },
                },
                colors: ['#008FFB', '#00E396', '#CED4DC'],
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'monotoneCubic'
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        opacityFrom: 0.6,
                        opacityTo: 0.8,
                    }
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'left'
                },
                xaxis: {
                    type: 'datetime'
                },
            },
        };
    }

    render() {
        return (
            <div>
                <div id="chart">
                    <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={350} />
                </div>
                <div id="html-dist"></div>
            </div>
        );
    }
}

export default ApexChartArea;
