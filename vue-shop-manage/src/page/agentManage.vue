<template>
    <div class="fillcontain">
        <head-top></head-top>
        <el-row>
            <!--<el-col :span="14" :offset="5">-->
            <el-tabs type="border-card" @tab-click="handleClick" v-model="name">
                <el-tab-pane label="新申请" name="newApply">
                    <div class="table_container">
                        <el-table
                            :data="newApply.tableData"
                            :expand-row-keys='newApply.expendRow'
                            :row-key="row => row.index"
                            style="width: 100%">
                            <el-table-column
                                label="头像"
                                prop="avatarUrl">
                                <template scope="scope">
                                    <img style="width: 30px;height: 30px;border-radius: 50%;"
                                         :src="scope.row.avatarUrl">
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="申请人"
                                prop="realName">
                            </el-table-column>
                            <el-table-column
                                label="电话"
                                prop="phoneNum">
                            </el-table-column>
                            <el-table-column
                                label="性别"
                                prop="gender">
                            </el-table-column>
                            <el-table-column
                                label="省份"
                                prop="province">
                            </el-table-column>
                            <el-table-column
                                label="城市"
                                prop="city">
                            </el-table-column>
                            <el-table-column label="操作" width="260">
                                <template scope="scope">
                                    <el-button
                                        size="small"
                                        @click="handleVerify(scope.row,1,scope.$index,1)">允许
                                    </el-button>
                                    <el-button
                                        size="small"
                                        type="danger"
                                        @click="handleVerify(scope.row,2,scope.$index,1)">拒绝
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="Pagination">
                            <el-pagination
                                @size-change="handleSizeChange(1)"
                                @current-change="newApplyHandleCurrentChange"
                                :current-page="newApply.currentPage"
                                :page-size="20"
                                layout="total, prev, pager, next"
                                :total="newApply.count">
                            </el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="代理申请" name="agentApply">
                    <div class="table_container">
                        <el-table
                            :data="apply.tableData"
                            :expand-row-keys='apply.expendRow'
                            :row-key="row => row.index"
                            style="width: 100%">
                            <el-table-column
                                label="头像"
                                prop="avatarUrl">
                                <template scope="scope">
                                    <img style="width: 30px;height: 30px;border-radius: 50%;"
                                         :src="scope.row.avatarUrl">
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="申请人"
                                prop="realName">
                            </el-table-column>
                            <el-table-column
                                label="电话"
                                prop="phoneNum">
                            </el-table-column>
                            <el-table-column
                                label="性别"
                                prop="gender">
                            </el-table-column>
                            <el-table-column
                                label="省份"
                                prop="province">
                            </el-table-column>
                            <el-table-column
                                label="城市"
                                prop="city">
                            </el-table-column>
                            <el-table-column
                                label="状态"
                                prop="statusDesc">
                            </el-table-column>
                        </el-table>
                        <div class="Pagination">
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="applyHandleCurrentChange"
                                :current-page="apply.currentPage"
                                :page-size="20"
                                layout="total, prev, pager, next"
                                :total="apply.count">
                            </el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="代理人" name="agent">
                    <div class="table_container">
                        <el-table
                            :data="agent.tableData"
                            :expand-row-keys='agent.expendRow'
                            :row-key="row => row.index"
                            style="width: 100%">
                            <el-table-column type="expand">
                                <template scope="props">
                                    <el-form label-position="left" inline class="demo-table-expand">
                                        <el-form-item label="电话号码">
                                            <span>{{ props.row.phoneNum }}</span>
                                        </el-form-item>
                                        <el-form-item label="一级粉丝">
                                            <span>{{ props.row.firstFans }}</span>
                                        </el-form-item>
                                        <el-form-item label="二级粉丝">
                                            <span>{{ props.row.secondFans }}</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="头像"
                                prop="avatarUrl">
                                <template scope="scope">
                                    <img style="width: 30px;height: 30px;border-radius: 50%;"
                                         :src="scope.row.avatarUrl">
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="代理人"
                                prop="realName">
                            </el-table-column>
                            <el-table-column
                                label="收益总额"
                                prop="total">
                            </el-table-column>
                            <el-table-column
                                label="收益余额"
                                prop="residue">
                            </el-table-column>
                            <el-table-column label="操作" width="360">
                                <template scope="scope">
                                    <el-button v-if="scope.row.status!=1"
                                               size="small"
                                               @click="handleAgentStatus(scope.row,1,scope.$index)">开始代理
                                    </el-button>
                                    <el-button
                                        v-if="scope.row.status!=2"
                                        size="small"
                                        type="danger"
                                        @click="handleAgentStatus(scope.row,2,scope.$index)">停止代理
                                    </el-button>
                                    <el-button
                                        size="small"
                                        type="primary"
                                        @click="handleDown(scope.row)">下载二维码
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="Pagination">
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="agentHandleCurrentChange"
                                :current-page="agent.currentPage"
                                :page-size="20"
                                layout="total, prev, pager, next"
                                :total="agent.count">
                            </el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="新提现申请" name="newCash">
                    <div class="table_container">
                        <el-table
                            :data="newCash.tableData"
                            :expand-row-keys='newCash.expendRow'
                            :row-key="row => row.index"
                            style="width: 100%">
                            <el-table-column
                                label="头像"
                                prop="avatarUrl">
                                <template scope="scope">
                                    <img style="width: 30px;height: 30px;border-radius: 50%;"
                                         :src="scope.row.avatarUrl">
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="申请人"
                                prop="realName">
                            </el-table-column>
                            <el-table-column
                                label="电话"
                                prop="phoneNum">
                            </el-table-column>
                            <el-table-column
                                label="性别"
                                prop="gender">
                            </el-table-column>
                            <el-table-column
                                label="省份"
                                prop="province">
                            </el-table-column>
                            <el-table-column
                                label="城市"
                                prop="city">
                            </el-table-column>
                            <el-table-column label="操作" width="260">
                                <template scope="scope">
                                    <el-button
                                        size="small"
                                        @click="handleVerify(scope.row,1,scope.$index,2)">允许
                                    </el-button>
                                    <el-button
                                        size="small"
                                        type="danger"
                                        @click="handleVerify(scope.row,2,scope.$index,2)">拒绝
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="Pagination">
                            <el-pagination
                                @size-change="handleSizeChange(1)"
                                @current-change="newCashHandleCurrentChange"
                                :current-page="newApply.currentPage"
                                :page-size="20"
                                layout="total, prev, pager, next"
                                :total="newApply.count">
                            </el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="提现申请" name="cashApply">
                    <div class="table_container">
                        <el-table
                            :data="cash.tableData"
                            :expand-row-keys='cash.expendRow'
                            :row-key="row => row.index"
                            style="width: 100%">
                            <el-table-column
                                label="头像"
                                prop="avatarUrl">
                                <template scope="scope">
                                    <img style="width: 30px;height: 30px;border-radius: 50%;"
                                         :src="scope.row.avatarUrl">
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="申请人"
                                prop="realName">
                            </el-table-column>
                            <el-table-column
                                label="电话"
                                prop="phoneNum">
                            </el-table-column>
                            <el-table-column
                                label="微信"
                                prop="wxCode">
                            </el-table-column>
                            <el-table-column
                                label="金额"
                                prop="cash">
                            </el-table-column>
                            <el-table-column
                                label="申请时间"
                                prop="applyTime">
                            </el-table-column>
                            <el-table-column
                                label="状态"
                                prop="statusDesc">
                            </el-table-column>

                        </el-table>
                        <div class="Pagination">
                            <el-pagination
                                @size-change="handleSizeChange(1)"
                                @current-change="cashHandleCurrentChange"
                                :current-page="cash.currentPage"
                                :page-size="20"
                                layout="total, prev, pager, next"
                                :total="cash.count">
                            </el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <!--</el-col>-->
        </el-row>
    </div>
</template>
<script>
    import headTop from '../components/headTop';
    import {getAgentApply, getApplyCount, verifyApply, agentStatus} from '@/api/getData';
    import {baseUrl, baseImgPath} from '@/config/env';
    import {mapActions, mapState} from 'vuex'

    export default {
        data() {
            return {
                newApply: {
                    tableData: [],
                    currentRow: null,
                    offset: 0,
                    limit: 20,
                    count: 0,
                    currentPage: 1,
                    expendRow: []
                },
                apply: {
                    tableData: [],
                    currentRow: null,
                    offset: 0,
                    limit: 20,
                    count: 0,
                    currentPage: 1,
                    expendRow: []
                },
                agent: {
                    tableData: [],
                    currentRow: null,
                    offset: 0,
                    limit: 20,
                    count: 0,
                    currentPage: 1,
                    expendRow: []
                },
                newCash: {
                    tableData: [],
                    currentRow: null,
                    offset: 0,
                    limit: 20,
                    count: 0,
                    currentPage: 1,
                    expendRow: []
                },
                cash: {
                    tableData: [],
                    currentRow: null,
                    offset: 0,
                    limit: 20,
                    count: 0,
                    currentPage: 1,
                    expendRow: []
                },
                name: 'newApply',
                index: 0,
            }
        },
        components: {
            headTop,
        },
        created() {
            // this.shopId = this.$route.query.shopId || 0;
            this.initData();
        },
        mounted() {
        },
        computed: {
            ...mapState(['newAgentApply', 'newCashApply']),
        },
        methods: {
            ...mapActions(['setAgentApply', 'setCashApply']),
            async initData() {
                var index = this.$route.query.index || 0;
                this.index = index;
                switch (index) {
                    case 0:
                        this.name='newApply';
                        break;
                    case 1:
                        this.name='agentApply';
                        break;
                    case 2:
                        this.name='agent';
                        break;
                    case 3:
                        this.name='newCash';
                        break;
                    case 4:
                        this.name='cashApply';
                        break;
                    default:
                        this.name='newApply';
                        break;
                };
                try {
                    this.getApplyCount(index);
                    this.getAgentApply(index);
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            newApplyHandleCurrentChange(val) {
                this.newApply.currentPage = val;
                this.newApply.offset = (val - 1) * this.newApply.limit;
                this.getAgentApply(0)
            },
            applyHandleCurrentChange(val) {
                this.apply.currentPage = val;
                this.apply.offset = (val - 1) * this.apply.limit;
                this.getAgentApply(1)
            },
            agentHandleCurrentChange(val) {
                this.collect.currentPage = val;
                this.collect.offset = (val - 1) * this.collect.limit;
                this.getAgentApply(2)
            },
            newCashHandleCurrentChange(val) {
                this.newCash.currentPage = val;
                this.newCash.offset = (val - 1) * this.newCash.limit;
                this.getAgentApply(3)
            },
            cashHandleCurrentChange(val) {
                this.cash.currentPage = val;
                this.cash.offset = (val - 1) * this.cash.limit;
                this.getAgentApply(4)
            },
            handleVerify(row, status, index, flag) {
                this.$msgbox({
                    title: '提示',
                    message: '确认操作？',
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            var p = {};
                            if (flag == 1) {
                                p = {applyId: row.id, status: status}
                            } else {
                                p = {cashId: row.id, status: status}
                            }
                            this.verifyApply(p, index, flag);
                            done();
                        } else {
                            this.$message({
                                type: 'info',
                                message: '取消'
                            });
                            done();
                        }
                    }
                });
            },
            handleAgentStatus(row, status, index) {
                this.$msgbox({
                    title: '提示',
                    message: '确认操作？',
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            this.agentStatus({agentId: row.id, status: status}, index);
                            done();
                        } else {
                            this.$message({
                                type: 'info',
                                message: '取消'
                            });
                            done();
                        }
                    }
                });
            },
            handleDown(row) {
                // 创建隐藏的可下载链接
                var eleLink = document.createElement('a');
                eleLink.download = row.realName;
                eleLink.style.display = 'none';
                // 字符内容转变成blob地址
                eleLink.href = baseUrl + '/v1/download/qr/?agentId=' + row.id;
                // 触发点击
                document.body.appendChild(eleLink);
                eleLink.click();
                // 然后移除
                document.body.removeChild(eleLink);
            },
            async agentStatus(p, index) {
                var temp = p;
                const res = await agentStatus(p);
                if (res.status == 1) {
                    console.log(p);
                    console.log(temp.status);
                    console.log(index);
                    console.log(this.agent.tableData[index]);
                    this.agent.tableData[index].status = temp.status;
                    this.$message({
                        type: 'success',
                        message: '操作成功',
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: '操作失败',
                    })
                }
            },
            async verifyApply(p, index, flag) {
                const res = await
                    verifyApply(p);
                if (res.status == 1) {
                    if (flag == 1) {
                        this.newApply.tableData.splice(index, 1);
                        this.newApply.count = this.newApply.count - 1;
                        this.setAgentApply(this.newAgentApply - 1 > 0 ? this.newAgentApply - 1 : 0);
                        this.$message({
                            type: 'success',
                            message: '操作成功',
                        });
                    } else if (flag == 2) {
                        this.newCash.tableData.splice(index, 1);
                        this.newCash.count = this.newCash.count - 1;
                        this.setCashApply(this.newCashApply - 1 > 0 ? this.newCashApply - 1 : 0);
                        this.$message({
                            type: 'success',
                            message: '操作成功',
                        });
                    }

                } else {
                    if (flag == 1) {
                        this.$message({
                            type: 'error',
                            message: '操作失败',
                        })
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.message || '操作失败',
                        })
                    }

                }

            },
            async getAgentApply(index) {
                var offset = 0;
                var limit = 20;
                if (index === 0) {
                    offset = this.newApply.offset;
                    limit = this.newApply.limit;
                } else if (index === 1) {
                    offset = this.apply.offset;
                    limit = this.apply.limit;
                } else if (index === 2) {
                    offset = this.agent.offset;
                    limit = this.agent.limit;
                }
                const res = await getAgentApply({
                    offset: offset,
                    limit: limit,
                    index: index,
                });
                var tempDate = [];
                // this.tableData = [];
                if (res.status == 1) {
                    if (index == 0 || index == 1) {
                        res.applys.forEach((item) => {
                            const tableData = {};
                            tableData.id = item.id;
                            tableData.realName = item.realName;
                            tableData.phoneNum = item.phoneNum;
                            tableData.status = item.status;
                            tableData.user_id = item.user_id;
                            tableData.gender = item.gender;
                            tableData.city = item.city;
                            tableData.province = item.province;
                            tableData.avatarUrl = item.avatarUrl;
                            tableData.statusDesc = item.status == 1 ? '已通过' : item.status == 2 ? '已拒绝' : '未审核';
                            tempDate.push(tableData);
                        });
                        if (index == 0) {
                            this.newApply.tableData = tempDate;
                        } else {
                            this.apply.tableData = tempDate;
                        }
                    } else if (index == 2) {
                        res.applys.forEach((item, index) => {
                            const tableData = {};
                            tableData.id = item.id;
                            tableData.realName = item.realName;
                            tableData.phoneNum = item.phoneNum;
                            tableData.status = item.status;
                            tableData.user_id = item.user_id;
                            tableData.total = item.total;
                            tableData.residue = item.residue;
                            tableData.firstFans = item.firstFans;
                            tableData.secondFans = item.secondFans;
                            tableData.avatarUrl = item.avatarUrl;
                            tempDate.push(tableData);
                        });
                        this.agent.tableData = tempDate;
                    } else if (index == 3 || index == 4) {
                        res.applys.forEach((item) => {
                            const tableData = {};
                            tableData.id = item.id;
                            tableData.realName = item.name;
                            tableData.phoneNum = item.phoneNum;
                            tableData.status = item.status;
                            tableData.agentId = item.agent_id;
                            tableData.cash = item.cash;
                            tableData.wxCode = item.wxCode;
                            tableData.applyTime = item.applyTime;
                            tableData.avatarUrl = item.agent__avatarUrl;
                            tableData.statusDesc = item.status == 0 ? '未审核' : item.status == 1 ? '已通过' : '未通过';
                            tempDate.push(tableData);
                            if (index == 3) {
                                this.newCash.tableData = tempDate;
                            } else {
                                this.cash.tableData = tempDate;
                            }
                        });
                    }
                }
            },
            async getApplyCount(count) {
                const res = await getApplyCount({count: count});
                if (res.status == 1) {
                    if (count == 0) {
                        this.newApply.count = res.count;
                    } else if (count == 1) {
                        this.apply.count = res.count;
                    } else if (count == 2) {
                        this.agent.count = res.count;
                    } else if (count == 3) {
                        this.newCash.count = res.count;
                    } else if (count == 4) {
                        this.cash.count = res.count;
                    }
                }
            },

            //    选择tab触发事件
            handleClick(tab, even) {
                this.getAgentApply(tab.index);
                this.getApplyCount(tab.index);
                this.index = tab.index;
                this.name = tab.name;
            },
            expand() {
            },
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .table_container {
        padding: 20px;
    }

    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>
