Date.prototype.addYears = function(year) {
    this.setFullYear(this.getFullYear() + parseInt(year));
}

Date.prototype.addMonths = function(month) {
    this.setMonth(this.getMonth() + parseInt(month));
}

Date.prototype.addDates = function(day) {
    this.setDate(this.getDate() + parseInt(day));
}

Date.prototype.addHours = function(hour) {
    this.setHours(this.getHours() + parseInt(hour));
}

Date.prototype.addMinutes = function(minute) {
    this.setMinutes(this.getMinutes() + parseInt(minute));
}

Date.prototype.addSeconds = function(second) {
    this.setSeconds(this.getSeconds() + parseInt(second));
}

Date.prototype.date2String = function() {
    return `${this.getFullYear()}/${this.getMonth()}/${this.getDate()} ${this.getHours()}:${this.getMinutes()}:${this.getSeconds()}`;
}

Date.string2Date = function(item) {
    if (!item instanceof String) return null;
    let arr = item.split(' ');
    let dateArr = arr[0].split('/'),
        timeArr = arr[1].split(':');

    let year = dateArr[0],
        month = dateArr[1],
        day = dateArr[2],
        hour = timeArr[0],
        minute = timeArr[1],
        second = timeArr[2];

    return new Date(year, month, day, hour, minute, second)
}

Date.prototype.expire = function({ year, month, day, hour, minute, second }) {
    this.addYears(year);
    this.addMonths(month);
    this.addDates(day);
    this.addHours(hour);
    this.addMinutes(minute);
    this.addSeconds(second);

    return this;
}