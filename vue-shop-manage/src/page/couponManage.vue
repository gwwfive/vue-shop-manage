<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="创建时间">
                                <span>{{ props.row.createTime }}</span>
                            </el-form-item>
                            <el-form-item label="优惠类型" v-if="props.row.couponType==0">
                                <span>满{{ props.row.fullAmount }}元减{{ props.row.reduceAmount }}元</span>
                            </el-form-item>
                            <el-form-item label="优惠类型" v-if="props.row.couponType==1">
                                <span>立减{{ props.row.onceAmount }}元</span>
                            </el-form-item>
                            <el-form-item label="优惠类型" v-if="props.row.couponType==2">
                                <span>打{{ props.row.discount }}折 上限{{props.row.disCountUpLimit}}元</span>
                            </el-form-item>
                            <el-form-item label="时间类型" v-if="props.row.timeType==0">
                                <span>{{ props.row.startTime }} - {{props.row.endTime}}</span>
                            </el-form-item>
                            <el-form-item label="时间类型" v-if="props.row.timeType==1">
                                <span>每周{{ props.row.perWeekDay }}发行</span>
                            </el-form-item>
                            <el-form-item label="时间类型" v-if="props.row.timeType==2">
                                <span>每月{{ props.row.perMonthDay }}号发行</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="id"
                    label="ID"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="couponTypeDesc"
                    label="优惠券类型"
                    width="220">
                </el-table-column>
                <el-table-column
                    prop="timeTypeDesc"
                    label="优惠时间类型"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="couponNum"
                    label="发行数量">
                </el-table-column>
                <el-table-column
                    prop="couponResNum"
                    label="剩余数量">
                </el-table-column>
                <el-table-column
                    prop="statusDesc"
                    label="状态">
                </el-table-column>
                <el-table-column
                    label="操作" width="100">
                    <template scope="scope">
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleChangeStatus(scope.$index,scope.row.id,2)" v-if="scope.row.status==1">暂停发行
                        </el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleChangeStatus(scope.$index,scope.row.id,1)" v-if="scope.row.status==2">继续发行
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="20"
                    layout="total, prev, pager, next"
                    :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import headTop from '../components/headTop'
    import {getCoupon, couponChangeStatus} from '@/api/getData'

    export default {
        data() {
            return {
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                expendRow: []
            }
        },
        components: {
            headTop,
        },
        created() {
            this.initData();
        },
        methods: {
            async initData() {
                try {
                    const res = await getCoupon();
                    if (res.status == 1) {
                        this.count = res.count;
                    } else {
                        throw new Error('获取数据失败');
                    }
                    this.getCoupon();
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1) * this.limit;
                this.getAdmin()
            },
            async getCoupon() {
                try {
                    const res = await getCoupon({offset: this.offset, limit: this.limit});
                    if (res.status == 1) {
                        this.tableData = [];
                        res.coupons.forEach(item => {

                            var statusDesc = '';
                            if (item.status == 1) {
                                statusDesc = '正在发行';
                            } else if (item.status == 2) {
                                statusDesc = '已暂停';
                            }
                            var tableItem = {
                                ...item,
                                statusDesc: statusDesc,
                            };
                            tableItem.couponTypeDesc = tableItem.couponType == 0?"满减券":tableItem.couponType==1?"立减券":"折扣券";
                            tableItem.timeTypeDesc = tableItem.timeType == 0?"时间段":tableItem.timeType==1?"每周":"每月";
                            this.tableData.push(tableItem)
                        })
                    } else {
                        throw new Error(res.message)
                    }
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },

            async handleChangeStatus(index, id, status) {
                const res = await couponChangeStatus({couponId: id, status: status});
                if (res.status == 1) {
                    this.tableData[index].status = status;
                    this.tableData[index].statusDesc = status == 2 ? '已暂停' : '正在发行';
                    this.$message({
                        type: 'success',
                        message: '修改成功',
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: res.message,
                    });

                }

            },
            expand(){},
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .table_container {
        padding: 20px;
    }
</style>


