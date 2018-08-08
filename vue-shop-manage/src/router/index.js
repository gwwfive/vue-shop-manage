import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const addCoupon = r => require.ensure([], () => r(require('@/page/addCoupon')), 'addCoupon');
const couponManage = r => require.ensure([], () => r(require('@/page/couponManage')), 'couponManage');
const collage = r => require.ensure([], () => r(require('@/page/collage')), 'collage');
const editCollage = r => require.ensure([], () => r(require('@/page/editCollage')), 'editCollage');
const agentManage = r => require.ensure([], () => r(require('@/page/agentManage')), 'agentManage');
const categoryManage = r => require.ensure([], () => r(require('@/page/categoryManage')), 'categoryManage');
const addCarousel = r => require.ensure([], () => r(require('@/page/addCarousel')), 'addCarousel');
const addGoods = r => require.ensure([], () => r(require('@/page/addGoods')), 'addGoods');
const editGoods = r => require.ensure([], () => r(require('@/page/editGoods')), 'editGoods');
const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');
const shopManage = r => require.ensure([], () => r(require('@/page/shopManage')), 'shopManage');
const goodsList = r => require.ensure([], () => r(require('@/page/goodsList')), 'goodsList');
const orderList = r => require.ensure([], () => r(require('@/page/orderList')), 'orderList');
const collageList = r => require.ensure([], () => r(require('@/page/collageList')), 'collageList');
const visitor = r => require.ensure([], () => r(require('@/page/visitor')), 'visitor');
const uploadImg = r => require.ensure([], () => r(require('@/page/uploadImg')), 'uploadImg');
const memberSet = r => require.ensure([], () => r(require('@/page/memberSet')), 'memberSet');
// const sendMessage = r => require.ensure([], () => r(require('@/page/sendMessage')), 'sendMessage');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');
const distribution = r => require.ensure([], () => r(require('@/page/distribution')), 'distribution');
const history = r => require.ensure([], () => r(require('@/page/history')), 'history');

const routes = [
    {
        path: '/',
        component: login
    },
    {
        path: '/manage',
        component: manage,
        name: '',
        children: [{
            path: '',
            component: home,
            meta: [],
        },{
            path: '/addCoupon',
            component: addCoupon,
            meta: ['添加数据', '添加优惠券'],
        }, {
            path: '/collage',
            component: collage,
            meta: ['添加数据', '拼团活动'],
        },{
            path: '/editCollage',
            component: editCollage,
            meta: ['添加数据', '拼团管理', '编辑活动'],
        },{
            path: '/agentManage',
            component: agentManage,
            meta: ['添加数据', '代理管理'],
        },{
            path: '/categoryManage',
            component: categoryManage,
            meta: ['添加数据', '分类管理'],
        },{
            path: '/couponManage',
            component: couponManage,
            meta: ['添加数据', '优惠券管理'],
        },{
            path: '/addCarousel',
            component: addCarousel,
            meta: ['添加数据', '添加封面'],
        }, {
            path: '/addGoods',
            component: addGoods,
            meta: ['添加数据', '添加商品'],
        }, {
            path: '/editGoods',
            component: editGoods,
            meta: ['数据管理', '商品列表', '编辑商品'],
        }, {
            path: '/userList',
            component: userList,
            meta: ['数据管理', '用户列表'],
        }, {
            path: '/shopManage',
            component: shopManage,
            meta: ['数据管理', '商家管理'],
        }, {
            path: '/goodsList',
            component: goodsList,
            meta: ['数据管理', '商品列表'],
        }, {
            path: '/orderList',
            component: orderList,
            meta: ['数据管理', '订单列表'],
        }, {
            path: '/collageList',
            component: collageList,
            meta: ['数据管理', '拼团管理'],
        }, {
            path: '/visitor',
            component: visitor,
            meta: ['图表', '用户分布'],
        }, {
            path: '/history',
            component: history,
            meta: ['图表', '历史销量'],
        },{
            path: '/uploadImg',
            component: uploadImg,
            meta: ['文本编辑', 'MarkDown'],
        }, {
            path: '/memberSet',
            component: memberSet,
            meta: ['设置', '会员设置'],
        }, {
            path: '/distribution',
            component: distribution,
            meta: ['设置', '分销规则设置'],
        }, {
            path: '/explain',
            component: explain,
            meta: ['说明', '说明'],
        }]
    }
]

export default new Router({
    routes,
    strict: process.env.NODE_ENV !== 'production',
})
