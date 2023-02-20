const formateDay = (date) => {
    const weekday = [
      'Неділя',
      'Понеділок',
      'Вівторок',
      'Середа',
      'Четвер',
      'Пʼятниця',
      'Субота',
    ];
    return weekday[new Date(date).getDay()];
};
  
module.exports = formateDay;