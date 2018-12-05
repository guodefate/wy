
function getQueryStringArgs() {
    //取得查询字符串并去掉开头的问号
    var qs = location.search.length > 0 ? location.search.substring(1):"";
    //保存数据的对象
    var args = {};
    //取得每一项
    items = qs.length > 0 ? qs.split('&'):[];
    var item = null,name = null,value = null;
    for(var i = 0;i < items.length;i++) {
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if(name.length) {
            args[name] = value;
        }
    }
    return args;
}
 
//假设查询字符串是?q=javascript&num=10
var args = getQueryStringArgs();
alert(args['q']);  //javascript
alert(args['num']); 


/*第二种方法
function getQueryString(name) {
		//接收参数id
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	    var r = window.location.search.substr(1).match(reg);
		if (r != null) 
			return unescape(r[2]);
        return null;

        var num = decodeURI(getQueryString("num")); 
 */