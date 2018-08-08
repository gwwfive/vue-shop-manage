import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false;

Vue.use(ElementUI);
// 定义一个全局变量用户数据传递
// window.eventBus = new Vue();

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
});
