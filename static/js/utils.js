var rootPath = 'http://' + location.hostname + ':' + location.port + '/#/';
var mainPath = rootPath + 'main/';
var adminPath = rootPath + 'admin/';
var serverMainPath = 'http://' + location.hostname + ':8083' + '/';

//将时间戳转换为年-月-日格式
var dateFormat = function (timestamp) {
    var date = new Date(timestamp * 1000);
    return date.toLocaleDateString().replace(/\//g, "-");
};

//将时间戳转换为年-月-日 hh:mm:ss格式
var timeFormat = function (timestamp) {
    var date = new Date(timestamp * 1000);
    return date.toLocaleDateString().replace(/\//g, "-") + " " + date.toTimeString().substr(0, 8);
};

export {
    rootPath, mainPath, adminPath, serverMainPath, dateFormat, timeFormat
}
