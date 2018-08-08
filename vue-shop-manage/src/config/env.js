/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 *
 */
let baseUrl = '';
let routerMode = 'hash';
let baseImgPath;

if (process.env.NODE_ENV == 'development') {
	baseUrl = '';
    baseImgPath = '/static/img/';
}else{
	// baseUrl = '//127.0.0.1:8000';//'//elm.cangdu.org';
    baseUrl = 'https://native.yfeel.cn/';//'//elm.cangdu.org';
    baseImgPath = 'https://native.yfeel.cn/static/img/';//'//elm.cangdu.org/img/';
}

export {
	baseUrl,
	routerMode,
	baseImgPath
}
