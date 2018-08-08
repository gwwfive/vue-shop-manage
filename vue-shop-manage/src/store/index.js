import Vue from 'vue'
import Vuex from 'vuex'
import {getAdminInfo, getOrderCount,getApplyCount} from '@/api/getData';
import {baseImgPath, baseUrl} from '@/config/env';


Vue.use(Vuex);


const state = {
    adminInfo: {
        avatarUrl: 'default.jpg',
        id: null,
        account: null,
    },
    newOrdersCount: 0,
    newAgentApply: 0,
    newCashApply: 0,
    baseUrl: 'https://native.yfeel.cn',
};

const mutations = {
    saveAdminInfo(state, adminInfo) {
        state.adminInfo = adminInfo;
    },
    saveNewOrders(state, newOrders) {
        if (state.newOrdersCount < newOrders) {
            console.log('播放音频');
            // console.log(state);
            // console.log(baseUrl);
            try {
                new Audio(
                    '/static/audio/newOrderNotify.wav'
                ).play();
                // var Notification = window.Notification || window.mozNotification || window.webkitNotification;
                // if (Notification) {//支持桌面通知
                //     if (Notification.permission == "granted") {//已经允许通知
                //         var instance = new Notification(title, {
                //             body: '你有新的消息，请及时处理',
                //             icon: baseUrl + '/static/img/default.jpg',// 要换成管理员的头像
                //         });
                //     } else {
                //         Notification.requestPermission(function (status) {
                //             if (status === "granted") {//用户允许
                //                 var instance = new Notification(title, {
                //                     body: msg,
                //                     icon: "images/reload.png"
                //                 });
                //             }
                //         });
                //
                //     }
                // }
            } catch (e) {
            }

            // var audioElementHovertree = document.createElement('audio');
            // console.log(state.baseUrl+'/static/audio/newOrderNotify.wav');
            // audioElementHovertree.setAttribute('src', state.baseUrl+'/static/audio/newOrderNotify.wav');
            // audioElementHovertree.setAttribute('autoplay', 'true');
            // audioElementHovertree.style.display = 'none';
            // document.body.appendChild(audioElementHovertree);
            // // audioElementHovertree.play();
            // setTimeout(function () {
            //    document.body.removeChild(audioElementHovertree);
            // },10000);
        }
        state.newOrdersCount = newOrders;
    },
    saveAgentApply(state, newAgentApply){
        state.newAgentApply = newAgentApply;
    },
    saveCashApply(state,newCashApply){
        state.newCashApply = newCashApply;
    },
    setOrderCount(state,count){
        state.newOrdersCount = count;
    },
    setAgentApply(state,count){
        state.newAgentApply = count;
    },
    setCashApply(state,count){
        state.newCashApply = count;
    }
    // setDefaultAdminInfo(state) {
    //     state.adminInfo = {
    //         avatarUrl: 'default.jpg',
    //         id: null,
    //         account: null,
    //     }
    // },
};

const actions = {
    async getAdminData({commit}) {
        try {
            const res = await getAdminInfo();
            if (res.status == 1) {
                // 利用commit 来提交mutations 里面的方法。这样做是为了更好地追寻状态改变的出处？
                commit('saveAdminInfo', res.adminInfo);
            } else {
                // console.log('改变adminInfo来出发watch事件');
                // commit('saveAdminInfo', res.data)
                // commit('saveAdminInfo', {
                //     avatarUrl: 'default.jpg',
                //     id: null,
                //     account: null,
                // })
                throw new Error(res)
            }
        } catch (err) {
            console.log('您尚未登陆或者session失效');
        }
    },
    async getOrderCount({commit}) {
        try {
            const res = await getOrderCount({index: 0});
            if (res.status == 1) {
                // 利用commit 来提交mutations 里面的方法。这样做是为了更好地追寻状态改变的出处？
                commit('saveNewOrders', res.count);
            } else {
                throw new Error(res)
            }
        } catch (err) {
            console.log('更新新订单出错');
        }
    },
    async getAgentApplyCount({commit}){
        try {
            const res = await getApplyCount({count: 0});
            if (res.status == 1) {
                // 利用commit 来提交mutations 里面的方法。这样做是为了更好地追寻状态改变的出处？
                commit('saveAgentApply', res.count);
            } else {
                throw new Error(res)
            }
        } catch (err) {
            console.log('更新新代理申请出错');
        }
    },
    async getCashApplyCount({commit}){
        try {
            const res = await getApplyCount({count: 3});
            if (res.status == 1) {
                // 利用commit 来提交mutations 里面的方法。这样做是为了更好地追寻状态改变的出处？
                commit('saveCashApply', res.count);
            } else {
                throw new Error(res)
            }
        } catch (err) {
            console.log('更新新提现申请出错');
        }
    },
    setOrderCount({commit},count){
        commit('setOrderCount',count);
    },
    setAgentApply({commit},count){
        commit('setAgentApply',count);
    },
    setCashApply({commit},count){
        commit('setCashApply',count);
    },

    // async setDefaultAdminInfo({commit}) {
    //     commit('setDefaultAdminInfo');
    //     // callback();
    // }
};

export default new Vuex.Store({
    state,
    actions,
    mutations,
})
