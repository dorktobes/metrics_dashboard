import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';


class Histogram extends Component {
  createBins() {
    const { data } = this.props;
    const bins = this.generateEmptyWeeks();
    data.forEach((e) => {
      for (let i = 0; i < bins.length; i += 1) {
        const apptDate = new Date(e.date_of_service);
        if (bins[i].weekStart <= apptDate && bins[i].weekEnd >= apptDate) {
          if (!e.canceled && !e.no_show) {
            bins[i].appointmentsCount += 1;
          }
        }
      }
    });
    return bins;
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
  buildChartData() {
    const data = {
      labels: [],
      datasets: [{
        label: 'Appointments',
        data: [],
        backgroundColor: '#00cc00',
        borderWidth: 1,
        hoverBorderWidth: 3,
      }],
    };
    const bins = this.createBins();
    bins.forEach((e) => {
      let weekStart = e.weekStart.toDateString();
      weekStart = weekStart.slice(0, weekStart.length - 5);

      let weekEnd = e.weekEnd.toDateString();
      weekEnd = weekEnd.slice(0, weekEnd.length - 5);

      data.labels.push(`${weekStart} - ${weekEnd}`);
      data.datasets[0].data.push(e.appointmentsCount);
    });
    return data;
  }

  render() {
    return (
      <Bar
        data={this.buildChartData()}
        width={300}
        height={50}
        options={{
          maintainAspectRatio: false,
        }}
      />
    );
  }
}

Histogram.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Histogram;
