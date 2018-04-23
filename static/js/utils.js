var rootPath = 'http://' + location.hostname + ':' + location.port + '/#/';
var mainPath = rootPath + 'main/';
var serverMainPath = 'http://' + location.hostname + ':8083' + '/';

//将时间戳转换为年-月-日格式
var timeFormat = function (timestamp) {
    var date = new Date(timestamp * 1000);
    return date.toLocaleDateString().replace(/\//g, "-");
};

export {
    mainPath, serverMainPath, timeFormat
}
