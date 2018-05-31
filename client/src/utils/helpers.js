const helpers = {};

helpers.memoize = (func) => {
  const cache = {};
  return (...rest) => {
    const params = JSON.stringify(rest);
    if (!cache[params]) {
      cache[params] = func(...rest);
    }
    return cache[params];
  };
};

helpers.filterAppointmentsByMonth = (monthFromState, appointments) => (
  appointments
    .filter(({ date_of_service }) => {
      const month = new Date(date_of_service).getMonth();
      return month === monthFromState;
    })
    .sort((a, b) => new Date(a.date_of_service) - new Date(b.date_of_service))
);

export default helpers;
