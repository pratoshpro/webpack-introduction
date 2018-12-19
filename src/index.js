// import "./scss/main.scss";

// let name = 'pratosh';
// console.log('My name is '+name+'!!!');

import symbolData from './images/check-circle.svg';
import calendarSvg from './images/ic-calendar.svg';
// import icPaySvg from './images/warning.svg';
// import icrefundSvg from './images/refund.svg';
// import icSearchSvg from './images/ic-search.svg';



// console.log(symbolData);

window.addEventListener('DOMContentLoaded', () => {
  // const image = `<img src="${calendarSvg.url}">`;
  const usage = `
                <svg viewBox="${calendarSvg.viewBox}"><use xlink:href="${calendarSvg.url}"></use></svg>
                <svg viewBox="${symbolData.viewBox}"><use xlink:href="${symbolData.url}"></use></svg>
                `;

  document.body.innerHTML = `${usage}`;
});
