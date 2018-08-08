<template>
    <div>
        <head-top></head-top>
		<section class="data_section">
			<header class="section_title">数据统计</header>
			<el-row :gutter="20" style="margin-bottom: 10px;">
                <el-col :span="4"><div class="data_list today_head"><span class="data_num head">当日数据：</span></div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">{{userCount}}</span> 新增用户</div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">{{orderCount}}</span> 新增订单</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{saleCount}}</span> 新增销售额</div></el-col>
			</el-row>
            <el-row :gutter="20">
                <el-col :span="4"><div class="data_list all_head"><span class="data_num head">总数据：</span></div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{allUserCount}}</span> 注册用户</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{allOrderCount}}</span> 订单</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{allSaleCount}}</span> 销售额</div></el-col>
            </el-row>
		</section>
		<tendency :sevenDate='sevenDate' :sevenDay='sevenDay' :maxNum="maxNum" :maxSale="maxSale"></tendency>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
	import tendency from '../components/tendency'
	import dtime from 'time-formater'
	import {count,countDay} from '@/api/getData'
    export default {
    	data(){
    		return {
    			userCount: null,
    			orderCount: null,
                saleCount: null,
                allUserCount: null,
                allOrderCount: null,
                allSaleCount: null,
    			sevenDay: [],
    			sevenDate: [[],[],[]],
                maxNum:5,
                maxSale:500,
    		}
    	},
    	components: {
    		headTop,
    		tendency,
    	},
    	mounted(){
    		this.initData();
    		for (let i = 6; i > -1; i--) {
    			const date = dtime(new Date().getTime() - 86400000*i).format('YYYY-MM-DD');
    			this.sevenDay.push(date)
    		}
    		this.getSevenData();
    	},
        computed: {

        },
    	methods: {
    		async initData(){
    			const today = dtime().format('YYYY-MM-DD');
    			Promise.all([count(), countDay({'date':today})])
    			.then(res => {
    				this.userCount = res[1].userCount;
    				this.orderCount = res[1].orderCount;
                    this.saleCount = res[1].saleCount;
                    this.allUserCount = res[0].userCount;
                    this.allOrderCount = res[0].orderCount;
                    this.allSaleCount = res[0].saleCount;
    			}).catch(err => {
    				console.log(err)
    			})
    		},
    		async getSevenData(){
    			const apiArr = [];
    			this.sevenDay.forEach(item => {
                    // apiArr[0].push(userCount({'date':item}));
                    // apiArr[1].push(orderCount({'date':item}));
                    // apiArr[2].push(saleCount({'date':item}));
                    apiArr.push(countDay({'date':item}));
    			});
    			const promiseArr = [...apiArr];
    			Promise.all(promiseArr).then(res => {
    				const resArr = [[],[],[]];
    				var temp = 0;
					res.forEach((item, index) => {
						if (item.status == 1) {
                            // temp = Math.floor(index / 7);
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
    				console.log(err)
    			})
    		}
    	}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.data_section{
		padding: 20px;
		margin-bottom: 40px;
		.section_title{
			text-align: center;
			font-size: 30px;
			margin-bottom: 10px;
		}
		.data_list{
			text-align: center;
			font-size: 14px;
			color: #666;
            border-radius: 6px;
            background: #E5E9F2;
            .data_num{
                color: #333;
                font-size: 26px;

            }
            .head{
                border-radius: 6px;
                font-size: 22px;
                padding: 4px 0;
                color: #fff;
                display: inline-block;
            }
        }
        .today_head{
            background: #FF9800;
        }
        .all_head{
            background: #20A0FF;
        }
	}
    .wan{
        .sc(16px, #333)
    }
</style>
