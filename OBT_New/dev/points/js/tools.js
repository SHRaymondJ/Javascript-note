window.tools = {};
/*
* 获取get请求的参数
* 使用方法： tools.queryString().id
* */
var _queryString = null;
tools.queryString = function(){
  !_queryString && (_queryString = function(){
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for(var i = 0; i < vars.length; i++){
      var pair = vars[i].split("=");
      if(typeof query_string[pair[0]] === "undefined"){
        query_string[pair[0]] = decodeURIComponent(pair[1]);
      }else if(typeof query_string[pair[0]] === "string"){
        query_string[pair[0]] = [query_string[pair[0]], decodeURIComponent(pair[1])];
      }else{
        query_string[pair[0]].push(decodeURIComponent(pair[1]));
      }
    }
    return query_string;
  }());
  return _queryString;
};