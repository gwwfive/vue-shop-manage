<template>
    <div>
        <head-top></head-top>
        <visitor-pie :provinceData="provinceData" :maxNum="maxNum"></visitor-pie>
    </div>
</template>

<script>
    import headTop from '../components/headTop';
    import visitorPie from '@/components/visitorPie';
    import {userCount} from '@/api/getData';

    export default {
        data() {
            return {
                pieData: {},
                provinceData: [],
                maxNum:100,
            }
        },
        components: {
            headTop,
            visitorPie,
        },
        mounted() {
            this.initData();
        },
        methods: {
            async initData() {
                try {
                    // const res = await getUserCity();
                    // if (res.status == 1) {
                    // 	this.pieData = res.user_city;
                    // }else{
                    // 	throw new Error(res)
                    // }
                    this.getUserData();
                } catch (err) {
                    console.log('获取用户分布信息失败', err);
                }
            },
            async getUserData() {
                const loading = this.$loading({
                    lock: true,
                    text: '拼命加载中',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.8)',
                    customClass: 'loading'
                });
                const apiArr = [];
                const resArr = [];
                const province = [{name: '西藏', value: 0},
                    {name: '青海', value: 0},
                    {name: '宁夏', value: 0},
                    {name: '海南', value: 0},
                    {name: '甘肃', value: 0},
                    {name: '贵州', value: 0},
                    {name: '新疆', value: 0},
                    {name: '云南', value: 0},
                    {name: '重庆', value: 0},
                    {name: '吉林', value: 0},
                    {name: '山西', value: 0},
                    {name: '天津', value: 0},
                    {name: '江西', value: 0},
                    {name: '广西', value: 0},
                    {name: '陕西', value: 0},
                    {name: '黑龙江', value: 0},
                    {name: '内蒙古', value: 0},
                    {name: '安徽', value: 0},
                    {name: '北京', value: 0},
                    {name: '福建', value: 0},
                    {name: '上海', value: 0},
                    {name: '湖北', value: 0},
                    {name: '湖南', value: 0},
                    {name: '四川', value: 0},
                    {name: '辽宁', value: 0},
                    {name: '河北', value: 0},
                    {name: '河南', value: 0},
                    {name: '浙江', value: 0},
                    {name: '山东', value: 0},
                    {name: '江苏', value: 0},
                    {name: '广东', value: 0}];
                province.forEach(item => {
                    // apiArr[0].push(userCount({'date': item}));
                    // apiArr[1].push(orderCount({'date': item}));
                    // apiArr[2].push(saleCount({'date': item}));
                    apiArr.push(userCount({'province': item.name}));
                    resArr.push(item);
                });
                const promiseArr = [...apiArr];
                Promise.all(promiseArr).then(res => {
                    loading.close();
                    // const resArr = [[], [], []];
                    // var temp = 0;
                    res.forEach((item, index) => {
                        if (item.status == 1) {
                            item.count>this.maxNum?this.maxNum=item.count:'';
                            resArr[index].value = item.count;

                        }else {
                            resArr[index].value = 0;
                        }
                    });

                    this.provinceData = resArr;
                }).catch(err => {
                    loading.close();
                    console.log(err)
                })

            },
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';

</style>
