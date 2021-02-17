// import {moment} from 'moment';
function formatDate(date) {
    const moment = require('moment');
    return moment(date).format(moment.HTML5_FMT.DATE);    
  }
export default formatDate;