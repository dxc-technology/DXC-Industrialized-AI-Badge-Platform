function formatDateTime(date) {
    const moment = require('moment');
    return moment(date).format('MM-DD-YYYY HH:mm:ss')
    // return moment(date).format(moment.HTML5_FMT.DATE);    
  }
export default formatDateTime;