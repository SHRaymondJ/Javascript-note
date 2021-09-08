// 替换

String.prototype.highLightKeyword = function (keyword) {
    let panter = new RegExp(keyword, 'g')
    console.log(this.replace(panter, '<b style="color: #2D7BFF">' + keyword + '</b>'))
}