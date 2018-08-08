<template>
    <div>
        <head-top></head-top>
        <tendency :sevenDate='sevenDate' :sevenDay='sevenDay' :maxNum="maxNum" :maxSale="maxSale"></tendency>
        <div style="display: flex;justify-content: center;padding: 20px;">
            <el-button-group>
                <el-button type="primary" icon="el-icon-arrow-left" @click="handleChange(1)">上一页</el-button>
                <el-button type="primary" :disabled="page==0" @click="handleChange(-1)">下一页<i
                    class="el-icon-arrow-right el-icon--right"></i></el-button>
            </el-button-group>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import tendency from '../components/tendency'
    import dtime from 'time-formater'
    import {userCount, orderCount, saleCount, countDay} from '@/api/getData'

    export default {
        data() {
            return {
                // userCount: null,
                // orderCount: null,
                // adminCount: null,
                // allUserCount: null,
                // allOrderCount: null,
                // allAdminCount: null,
                sevenDay: [],
                sevenDate: [[], [], []],
                maxSale: 500,
                maxNum: 5,

                page: 0,
            }
        },
        components: {
            headTop,
            tendency,
        },
        mounted() {
            // this.initData();
            this.init();
        },
        computed: {},
        methods: {
            // async initData() {
            //     const today = dtime().format('YYYY-MM-DD');
            //     Promise.all([userCount({'date': today}), orderCount({'date': today}), saleCount({'date': today}), userCount(), orderCount(), saleCount()])
            //         .then(res => {
            //             this.userCount = res[0].count;
            //             this.orderCount = res[1].count;
            //             this.adminCount = res[2].count;
            //             this.allUserCount = res[3].count;
            //             this.allOrderCount = res[4].count;
            //             this.allAdminCount = res[5].count;
            //         }).catch(err => {
            //         console.log(err)
            //     })
            // },
            init() {
                this.sevenDay = [];
                for (let i = 9 + 10 * this.page; i > -1 + this.page * 10; i--) {
                    const date = dtime(new Date().getTime() - 86400000 * i).format('YYYY-MM-DD');
                    this.sevenDay.push(date)
                }
                this.getSevenData();
            },
            async getSevenData() {
                const loading = this.$loading({
                    lock: true,
                    text: '拼命加载中',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.8)',
                    customClass: 'loading'
                });
                const apiArr = [];
                this.sevenDay.forEach(item => {
                    // apiArr[0].push(userCount({'date': item}));
                    // apiArr[1].push(orderCount({'date': item}));
                    // apiArr[2].push(saleCount({'date': item}));
                    apiArr.push(countDay({'date': item}));
                });
                const promiseArr = [...apiArr];
                Promise.all(promiseArr).then(res => {
                    loading.close();
                    const resArr = [[], [], []];
                    // var temp = 0;
                    res.forEach((item, index) => {
                        if (item.status == 1) {
                            // temp = Math.floor(index / 10);
                            // temp !== 2 ? item.count > this.maxNum ? this.maxNum = item.count : '' : this.count > this.maxSale ? this.maxSale = item.count : '';
                            // resArr[temp].push(item.count);
                            item.userCount > this.maxNum ? this.maxNum = item.userCount : '';
                            item.orderCount > this.maxNum ? this.maxNum = item.orderCount : '';
                            item.saleCount > this.maxSale ? this.maxSale = item.saleCount : '';
                            resArr[0][index] = item.userCount;
                            resArr[1][index] = item.orderCount;
                            resArr[2][index] = item.saleCount;
                        }
                    });
                    // 优化图表,认为平均一个订单100元
                    var tempSale = Math.ceil(this.maxSale / 1000) * 10;
                    var tempNum = Math.ceil(this.maxNum / 10) * 10;
                    tempSale > tempNum ? (this.maxSale = tempSale * 100, this.maxNum = tempSale) : (this.maxSale = tempNum * 100, this.maxNum = tempNum);

                    this.sevenDate = resArr;
                }).catch(err => {
                    loading.close();
                    console.log(err)
                })
            },

            handleChange(a) {

                this.page = this.page + a < 0 ? 0 : this.page + a;
                this.init();
            },
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';

    /*.data_section {*/
    /*padding: 20px;*/
    /*margin-bottom: 40px;*/
    /*.section_title {*/
    /*text-align: center;*/
    /*font-size: 30px;*/
    /*margin-bottom: 10px;*/
    /*}*/
    /*.data_list {*/
    /*text-align: center;*/
    /*font-size: 14px;*/
    /*color: #666;*/
    /*border-radius: 6px;*/
    /*background: #E5E9F2;*/
    /*.data_num {*/
    /*color: #333;*/
    /*font-size: 26px;*/

    /*}*/
    /*.head {*/
    /*border-radius: 6px;*/
    /*font-size: 22px;*/
    /*padding: 4px 0;*/
    /*color: #fff;*/
    /*display: inline-block;*/
    /*}*/
    /*}*/
    /*.today_head {*/
    /*background: #FF9800;*/
    /*}*/
    /*.all_head {*/
    /*background: #20A0FF;*/
    /*}*/
    /*}*/
    .loading {
        color: #fff;
    }

    .wan {
        .sc(16px, #333)
    }
</style>
