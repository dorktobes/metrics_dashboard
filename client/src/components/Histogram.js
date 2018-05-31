import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import d3, { Chart } from 'react-d3-core';
// import d3Basic, { LineChart } from 'react-d3-basic';


class Histogram extends Component {
  createBins() {
    const { data } = this.props;
    const bins = this.generateEmptyWeeks();
    data.forEach(({ date_of_service }) => {
      for (let i = 0; i < bins.length; i += 1) {
        const apptDate = new Date(date_of_service);
        if (bins[i].weekStart <= apptDate && bins[i].weekEnd >= apptDate) {
          bins[i].appointmentsCount += 1;
        }
      }
    });
    console.log(bins);
  }

  generateEmptyWeeks() {
    const bins = [];
    const { data } = this.props;
    if (data[0]) {
      const firstOfTheMonth = new Date(data[0].date_of_service);
      firstOfTheMonth.setDate(1);
      const month = firstOfTheMonth.getMonth();
      const firstDayOfTheMonth = firstOfTheMonth.getDay();
      // find next Sunday
      const endOfFirstWeek = new Date(firstOfTheMonth);
      endOfFirstWeek.setDate(1 + (7 - firstDayOfTheMonth));
      while (endOfFirstWeek.getMonth() === month) {
        bins.push({
          weekStart: new Date(firstOfTheMonth),
          weekEnd: new Date(endOfFirstWeek),
          appointmentsCount: 0,
        });
        firstOfTheMonth.setDate(endOfFirstWeek.getDate() + 1);
        endOfFirstWeek.setDate(endOfFirstWeek.getDate() + 7);
      }
      bins.push({
        weekStart: new Date(firstOfTheMonth),
        weekEnd: new Date(endOfFirstWeek),
        appointmentsCount: 0,
      });
    }
    return bins;
  }

  renderChart() {
    const width = 700;
    const height = 300;
    const margins = {left: 100, right: 100, top: 50, bottom: 50};
    const title = "Appointments per Week";

    // return (<Chart
    //   title={title}
    //   width={width}
    //   height={height}
    //   margins= {margins}
    //   >
    //   <LineChart
    //     margins= {margins}
    //     title={title}
    //     data={chartData}
    //     width={width}
    //     height={height}
    //     chartSeries={chartSeries}
    //     x={x}
    //   />
    // </Chart>);
  }
  render() {
    this.createBins();
    return (
      <div className="canvas">
        {this.renderChart()}
      </div>
    );
  }
}

Histogram.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Histogram;
