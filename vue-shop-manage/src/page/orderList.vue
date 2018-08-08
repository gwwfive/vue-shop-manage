<template>
    <div class="fillcontain">
        <head-top></head-top>
        <el-row>
            <el-tabs type="border-card" @tab-click="handleClick" v-model="name">
                <el-tab-pane label="新订单" name="newOrder">
                    <div class="table_container">
                        <el-table
                            :data="newOrders.tableData"
                            :expand-row-keys='newOrders.expendRow'
                            :row-key="row => row.index"
                            style="width: 100%">
                            <el-table-column type="expand">
                                <template scope="props">
                                    <el-form label-position="left" inline class="demo-table-expand">
                                        <el-form-item label="下单用户">
                                            <span>{{ props.row.userName }}</span>
                                        </el-form-item>
                                        <el-form-item label="收货用户">
                                            <span>{{ props.row.address_userName }}</span>
                                        </el-form-item>
                                        <el-form-item label="收货电话">
                                            <span>{{ props.row.address_phoneNum }}</span>
                                        </el-form-item>
                                        <el-form-item label="收货地址">
                                            <span>{{ props.row.address }}</span>
                                        </el-form-item>
                                        <el-form-item label="下单时间">
                                            <span>{{ props.row.createTime }}</span>
                                        </el-form-item>
                                        <!--<el-form-item label="商品规格">-->
                                        <!--<span>{{ props.row.skuName }}</span>-->
                                        <!--</el-form-item>-->
                                        <!--<el-form-item label="规格数量">-->
                                        <!--<span>{{ props.row.skuNum }}</span>-->
                                        <!--</el-form-item>-->
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="订单号"
                                prop="orderNo">
                            </el-table-column>
                            <el-table-column
                                label="订单价格"
                                prop="total_fee">
                            </el-table-column>
                            <el-table-column
                                label="购买商品"
                                prop="productName">
                            </el-table-column>
                            <el-table-column
                                label="订单类型"
                                prop="typeDesc">
                            </el-table-column>
                            <el-table-column label="操作" width="260">
                                <template scope="scope">
                                    <el-button
                                        size="small"
                                        @click="handleConfirm(scope.row)">确认发货
                                    </el-button>
                                    <el-button
                                        size="small"
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row)">取消订单
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="Pagination">
                            <el-pagination
                                @size-change="handleSizeChange(1)"
                                @current-change="newOrdersHandleCurrentChange"
                                :current-page="newOrders.currentPage"
                                :page-size="20"
                                layout="total, prev, pager, next"
                                :total="newOrders.count">
                            </el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="未收货" name="unReceive">
                    <div class="table_container">
                        <el-table
                            :data="unCollect.tableData"
                            @expand='expand'
                            :expand-row-keys='unCollect.expendRow'
                            :row-key="row => row.index"
                            style="width: 100%">
                            <el-table-column type="expand">
                                <template scope="props">
                                    <el-form label-position="left" inline class="demo-table-expand">
                                        <el-form-item label="下单用户">
                                            <span>{{ props.row.userName }}</span>
                                        </el-form-item>
                                        <el-form-item label="收货用户">
                                            <span>{{ props.row.address_userName }}</span>
                                        </el-form-item>
                                        <el-form-item label="收货电话">
                                            <span>{{ props.row.address_phoneNum }}</span>
                                        </el-form-item>
                                        <el-form-item label="收货地址">
                                            <span>{{ props.row.address }}</span>
                                        </el-form-item>
                                        <el-form-item label="下单时间">
                                            <span>{{ props.row.createTime}}</span>
                                        </el-form-item>
                                        <el-form-item label="快递类型">
                                            <span>{{ props.row.expressType }}</span>
                                        </el-form-item>
                                        <el-form-item label="快递单号">
                                            <span>{{ props.row.expressNo }}</span>
                                        </el-form-item>
                                        <el-form-item label="发货时间">
                                            <span>{{ props.row.expressTime }}</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="订单号"
                                prop="orderNo">
                            </el-table-column>
                            <el-table-column
                                label="订单价格"
                                prop="total_fee">
                            </el-table-column>
                            <el-table-column
                                label="商品名称"
                                prop="productName">
                            </el-table-column>
                            <el-table-column
                                label="订单类型"
                                prop="typeDesc">
                            </el-table-column>
                        </el-table>
                        <div class="Pagination">
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="unCollectHandleCurrentChange"
                                :current-page="unCollect.currentPage"
                                :page-size="20"
                                layout="total, prev, pager, next"
                                :total="unCollect.count">
                            </el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="收货完成" name="receive">
                    <div class="table_container">
                        <el-table
                            :data="collect.tableData"
                            @expand='expand'
                            :expand-row-keys='collect.expendRow'
                            :row-key="row => row.index"
                            style="width: 100%">
                            <el-table-column type="expand">
                                <template scope="props">
                                    <el-form label-position="left" inline class="demo-table-expand">
                                        <el-form-item label="下单用户">
                                            <span>{{ props.row.userName }}</span>
                                        </el-form-item>
                                        <el-form-item label="收货用户">
                                            <span>{{ props.row.address_userName }}</span>
                                        </el-form-item>
                                        <el-form-item label="收货电话">
                                            <span>{{ props.row.address_phoneNum }}</span>
                                        </el-form-item>
                                        <el-form-item label="收货地址">
                                            <span>{{ props.row.address }}</span>
                                        </el-form-item>
                                        <el-form-item label="下单时间">
                                            <span>{{ props.row.createTime }}</span>
                                        </el-form-item>
                                        <el-form-item label="快递类型">
                                            <span>{{ props.row.expressType }}</span>
                                        </el-form-item>
                                        <el-form-item label="快递单号">
                                            <span>{{ props.row.expressNo }}</span>
                                        </el-form-item>
                                        <el-form-item label="发货时间">
                                            <span>{{ props.row.expressTime }}</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="订单号"
                                prop="orderNo">
                            </el-table-column>
                            <el-table-column
                                label="订单价格"
                                prop="total_fee">
                            </el-table-column>
                            <el-table-column
                                label="商品名称"
                                prop="productName">
                            </el-table-column>
                            <el-table-column
                                label="订单类型"
                                prop="typeDesc">
                            </el-table-column>
                            <el-table-column
                                label="订单状态"
                                prop="statusDesc">
                            </el-table-column>
                        </el-table>
                        <div class="Pagination">
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="collectHandleCurrentChange"
                                :current-page="collect.currentPage"
                                :page-size="20"
                                layout="total, prev, pager, next"
                                :total="collect.count">
                            </el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="申请退款" name="refund">
                    <div class="table_container">
                        <el-table
                            :data="refund.tableData"
                            @expand='expand'
                            :expand-row-keys='refund.expendRow'
                            :row-key="row => row.index"
                            style="width: 100%">
                            <el-table-column type="expand">
                                <template scope="props">
                                    <el-form label-position="left" inline class="demo-table-expand">
                                        <el-form-item label="下单用户">
                                            <span>{{ props.row.userName }}</span>
                                        </el-form-item>
                                        <el-form-item label="收货用户">
                                            <span>{{ props.row.address_userName }}</span>
                                        </el-form-item>
                                        <el-form-item label="联系方式">
                                            <span>{{ props.row.address_phoneNum }}</span>
                                        </el-form-item>
                                        <el-form-item label="收货地址">
                                            <span>{{ props.row.address }}</span>
                                        </el-form-item>
                                        <el-form-item label="下单时间">
                                            <span>{{ props.row.createTime }}</span>
                                        </el-form-item>
                                        <el-form-item label="快递类型">
                                            <span>{{ props.row.expressType }}</span>
                                        </el-form-item>
                                        <el-form-item label="快递单号">
                                            <span>{{ props.row.expressNo }}</span>
                                        </el-form-item>
                                        <el-form-item label="发货时间">
                                            <span>{{ props.row.expressTime }}</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="订单号"
                                prop="orderNO">
                            </el-table-column>
                            <el-table-column
                                label="订单价格"
                                prop="total_fee">
                            </el-table-column>
                            <el-table-column
                                label="商品名称"
                                prop="productName">
                            </el-table-column>
                            <el-table-column
                                label="订单类型"
                                prop="typeDesc">
                            </el-table-column>
                            <el-table-column label="操作" width="260">
                                <template scope="scope">
                                    <el-button
                                        size="small"
                                        @click="handleEdit(scope.row)">审核
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="Pagination">
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="refundHandleCurrentChange"
                                :current-page="refund.currentPage"
                                :page-size="20"
                                layout="total, prev, pager, next"
                                :total="refund.count">
                            </el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="全部" name="all">
                    <div class="table_container">
                        <el-table
                            :data="all.tableData"
                            @expand='expand'
                            :expand-row-keys='all.expendRow'
                            :row-key="row => row.index"
                            style="width: 100%">
                            <el-table-column type="expand">
                                <template scope="props">
                                    <el-form label-position="left" inline class="demo-table-expand">
                                        <el-form-item label="下单用户">
                                            <span>{{ props.row.userName }}</span>
                                        </el-form-item>
                                        <el-form-item label="收货用户">
                                            <span>{{ props.row.address_userName }}</span>
                                        </el-form-item>
                                        <el-form-item label="联系方式">
                                            <span>{{ props.row.address_phoneNum }}</span>
                                        </el-form-item>
                                        <el-form-item label="收货地址">
                                            <span>{{ props.row.address }}</span>
                                        </el-form-item>
                                        <el-form-item label="下单时间">
                                            <span>{{ props.row.createTime }}</span>
                                        </el-form-item>
                                        <el-form-item label="快递类型">
                                            <span>{{ props.row.expressType }}</span>
                                        </el-form-item>
                                        <el-form-item label="快递单号">
                                            <span>{{ props.row.expressNo }}</span>
                                        </el-form-item>
                                        <el-form-item label="发货时间">
                                            <span>{{ props.row.expressTime }}</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="订单号"
                                prop="orderNo">
                            </el-table-column>
                            <el-table-column
                                label="订单价格"
                                prop="total_fee">
                            </el-table-column>
                            <el-table-column
                                label="商品名称"
                                prop="productName">
                            </el-table-column>
                            <el-table-column
                                label="订单类型"
                                prop="typeDesc">
                            </el-table-column>
                            <el-table-column
                                label="订单状态"
                                prop="statusDesc">
                            </el-table-column>
                        </el-table>
                        <div class="Pagination">
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="allHandleCurrentChange"
                                :current-page="all.currentPage"
                                :page-size="20"
                                layout="total, prev, pager, next"
                                :total="all.count">
                            </el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>

            <el-col :span="14" :offset="5">
                <el-dialog title="确认发货" :visible.sync="dialogVisible">
                    <el-form :model="expressForm" :rules="expressFormRules" ref="expressForm">
                        <el-form-item label="快递类型" label-width="100px" prop="expressType">
                            <!--<el-autocomplete-->
                            <!--class="inline-input"-->
                            <!--v-model="expressForm.expressType"-->
                            <!--:fetch-suggestions="querySearch"-->
                            <!--placeholder="请输入快递类型"-->
                            <!--@select="handleSelect"-->
                            <!--&gt;</el-autocomplete>-->
                            <el-select v-model="expressForm.expressType" placeholder="请选择">
                                <el-option
                                    v-for="item in expressOptions"
                                    :key="item.value.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="快递单号" label-width="100px" prop="expressNo">
                            <el-input v-model="expressForm.expressNo" placeholder="输入订单号"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <!--<el-button @click="dialogFormVisible = false">取 消</el-button>-->
                        <el-button type="primary" @click="submitExpressForm('expressForm')">提交
                        </el-button>
                    </div>
                </el-dialog>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import headTop from '../components/headTop';
    import {mapActions, mapState} from 'vuex';
    import {getOrders, getOrderCount, confirmExpress} from '@/api/getData'

    export default {
        data() {
            return {
                newOrders: {
                    tableData: [],
                    currentRow: null,
                    offset: 0,
                    limit: 20,
                    count: 0,
                    currentPage: 1,
                    expendRow: [],
                },
                unCollect: {
                    tableData: [],
                    currentRow: null,
                    offset: 0,
                    limit: 20,
                    count: 0,
                    currentPage: 1,
                    expendRow: []
                },
                collect: {
                    tableData: [],
                    currentRow: null,
                    offset: 0,
                    limit: 20,
                    count: 0,
                    currentPage: 1,
                    expendRow: []
                },
                refund: {
                    tableData: [],
                    currentRow: null,
                    offset: 0,
                    limit: 20,
                    count: 0,
                    currentPage: 1,
                    expendRow: []
                },
                all: {
                    tableData: [],
                    currentRow: null,
                    offset: 0,
                    limit: 20,
                    count: 0,
                    currentPage: 1,
                    expendRow: []
                },
                dialogVisible: false,
                expressForm: {},
                expressFormRules: {
                    expressType: [{required: true, message: '请输入快递类型', trigger: ['blur', 'change']}],
                    expressNo: [{required: true, message: '请输入快递单号', trigger: 'blur'}],
                },
                express: [],
                isActive: false,
                expressOptions: [
                    {value: {value: 'shunfeng', label: '顺丰快递'}, label: '顺丰快递'},
                    {value: {value: 'zhongtong', label: '中通快递'}, label: '中通快递'},
                    {value: {value: 'shentong', label: '申通快递'}, label: '申通快递'},
                    {value: {value: 'yuantong', label: '圆通快递'}, label: '圆通快递'},
                    {value: {value: 'tiantian', label: '天天快递'}, label: '天天快递'},
                    {value: {value: 'ems', label: 'EMS'}, label: 'EMS'},
                    {value: {value: 'yunda', label: '韵达快递'}, label: '韵达快递'},
                    {value: {value: 'huitongkuaidi', label: '百世汇通'}, label: '百世汇通'},
                    {value: {value: 'jd', label: '京东快递'}, label: '京东快递'},
                ],
                index: 0,
                name: 'newOrder',
                // currentRow: null,
                // offset: 0,
                // limit: 20,
                // count: 0,
                // currentPage: 1,
                // // shopId: null,
                // expendRow: [],
            }
        },
        components: {
            headTop,
        },
        created() {
            // this.shopId = this.$route.query.shopId || 0;
            // this.initData();
        },
        mounted() {
            // this.express = this.loadAll()
        },
        computed: {
            ...mapState(['newOrdersCount'])
        },
        methods: {
            ...mapActions(['setOrderCount']),
            async initData() {
                try {

                    var index = this.$route.query.index || 0;
                    this.index = index;
                    switch (index) {
                        case 0:
                            this.name = 'newOrder';
                            break;
                        case 1:
                            this.name = 'unReceive';
                            break;
                        case 2:
                            this.name = 'receive';
                            break;
                        case 3:
                            this.name = 'refund';
                            break;
                        case 4:
                            this.name = 'all';
                            break;
                        default:
                            this.name = 'newOrder';
                            break;
                    }
                    ;
                    this.getOrderCount(this.index);
                    this.getOrders(this.index);
                    // this.getNewOrdersByTime();
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            newOrdersHandleCurrentChange(val) {
                this.newOrders.currentPage = val;
                this.newOrders.offset = (val - 1) * this.newOrders.limit;
                this.getOrders(0)
            },
            unCollectHandleCurrentChange(val) {
                this.unCollect.currentPage = val;
                this.unCollect.offset = (val - 1) * this.unCollect.limit;
                this.getOrders(1)
            },
            collectHandleCurrentChange(val) {
                this.collect.currentPage = val;
                this.collect.offset = (val - 1) * this.collect.limit;
                this.getOrders(2)
            },
            refundHandleCurrentChange(val) {
                this.refund.currentPage = val;
                this.refund.offset = (val - 1) * this.refund.limit;
                this.getOrders(3)
            },
            allHandleCurrentChange(val) {
                this.all.currentPage = val;
                this.all.offset = (val - 1) * this.all.limit;
                this.getOrders(4)
            },
            handleConfirm(row) {
                this.dialogVisible = true;
                this.expressForm.orderId = row.id;
                this.expressForm.index = row.index;
            },

            async getOrderCount(index) {
                const countData = await getOrderCount({index: index});
                if (countData.status == 1) {
                    if (index == 0) {
                        this.newOrders.count = countData.count;
                    } else if (index == 1) {
                        this.unCollect.count = countData.count;
                    } else if (index == 1) {
                        this.collect.count = countData.count;
                    } else if (index == 1) {
                        this.refund.count = countData.count;
                    } else if (index == 1) {
                        this.all.count = countData.count;
                    }
                } else {
                    throw new Error('获取数据失败');
                }
            },

            async getOrders(index) {
                var offset = 0;
                var limit = 20;
                if (index === 0) {
                    offset = this.newOrders.offset;
                    limit = this.newOrders.limit;
                } else if (index === 1) {
                    offset = this.unCollect.offset;
                    limit = this.unCollect.limit;
                } else if (index === 2) {
                    offset = this.collect.offset;
                    limit = this.collect.limit;
                } else if (index === 3) {
                    offset = this.refund.offset;
                    limit = this.refund.limit;
                } else if (index === 4) {
                    offset = this.all.offset;
                    limit = this.all.limit;
                }
                const res = await getOrders({
                    offset: offset,
                    limit: limit,
                    index: index,
                });
                var tempDate = [];
                // this.tableData = [];
                if (res.status == 1) {
                    res.orders.forEach((item, index) => {
                        const tableData = {};
                        tableData.id = item.id;
                        tableData.orderNo = item.order_code;
                        tableData.total_fee = item.realTotal;
                        tableData.status = item.status;
                        tableData.user_id = item.user_id;
                        tableData.address = item.province + item.city + item.area + item.address;
                        tableData.index = index;
                        tableData.userName = item.user__nickName;
                        tableData.address_userName = item.name;
                        tableData.address_phoneNum = item.phoneNum;
                        tableData.createTime = item.createTime;
                        tableData.expressType = item.express;
                        tableData.expressNo = item.expressNo;
                        tableData.expressTime = item.expressTime;
                        var tempsku = '';
                        item.orderSkus.forEach((sku) => {
                            tempsku = sku.productName + '-' + sku.skuName + ' 数量×' + sku.skuNum + '  ';
                        });
                        tableData.productName = tempsku;
                        // tableData.skuName = item.sku__skuName;
                        // tableData.skuNum = item.skuNum;

                        if (item.orderType == 0) {
                            tableData.typeDesc = '单买';
                        } else if (item.orderType == 1) {
                            tableData.typeDesc = '团购';
                        }
                        if (item.status == 1) {
                            tableData.statusDesc = '未发货';
                        } else if (item.status == 2) {
                            tableData.statusDesc = '未收货';
                        }
                        else if (item.status == 3) {
                            tableData.statusDesc = '未评价';
                        } else if (item.status == 4) {
                            tableData.statusDesc = '订单完成';
                        } else if (item.status == 5) {
                            tableData.statusDesc = '已取消';
                        } else if (item.status == 6) {
                            tableData.statusDesc = '申请退款';
                        } else if (item.status == 7) {
                            tableData.statusDesc = '已退款';
                        } else if (item.status == 8) {
                            tableData.statusDesc = '拼团成功未发货';
                        }
                        tempDate.push(tableData);
                    });
                    if (index == 0) {
                        this.newOrders.tableData = tempDate;
                    } else if (index == 1) {
                        this.unCollect.tableData = tempDate;
                    } else if (index == 2) {
                        this.collect.tableData = tempDate;
                    } else if (index == 3) {
                        this.refund.tableData = tempDate;
                    } else if (index == 4) {
                        this.all.tableData = tempDate;
                    } else {
                        console.log(index)
                    }
                }
            },

            //    选择tab触发事件
            handleClick(tab, even) {
                console.log(tab);
                this.name = tab.name;
                this.index = tab.index;
                this.getOrders(tab.index);
            },
            expand() {
            },
            // querySearch(queryString, cb) {
            //     var express = this.express;
            //     var results = queryString ? express.filter(this.createFilter(queryString)) : express;
            //     // 调用 callback 返回建议列表的数据
            //     cb(results);
            // },
            // createFilter(queryString) {
            //     return (express) => {
            //         return (express.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            //     };
            // },
            // loadAll() {
            //     return [{value: '顺丰快递'},
            //         {value: '中通快递'},
            //         {value: '申通快递'},
            //         {value: '天天快递'},
            //         {value: 'EMS快递'},
            //         {value: '圆通快递'},
            //         {value: '韵达快递'}];
            // },
            // handleSelect(item) {
            //     console.log(item);
            //     this.expressForm.expressType = item.value;
            // },
            submitExpressForm(expressForm) {
                this.$refs[expressForm].validate(async (valid) => {
                    if (valid) {
                        const params = {
                            ...this.expressForm,
                        };
                        const res = await confirmExpress(JSON.parse(JSON.stringify(params)));
                        if (res.status == 1) {
                            this.newOrders.tableData.splice(this.expressForm.index, 1);
                            this.newOrders.count = this.newOrders.count - 1;
                            this.dialogVisible = false;
                            this.setOrderCount(this.newOrdersCount - 1 >= 0 ? this.newOrdersCount - 1 : 0);
                            this.expressForm = {};
                            this.$message({
                                type: 'success',
                                message: '确认发货成功',
                            });
                        } else {
                            this.$message({
                                type: 'error',
                                message: '确认发货失败',
                            });
                        }
                    }
                });
            },
            //    定时刷新新订单数据
            async getNewOrdersByTime() {
                var that = this;
                setTimeout(function () {
                    that.newOrders.offset = 0;
                    that.newOrders.limit = 20;
                    that.newOrders.page = 1;
                    console.log('执行了');
                    that.getOrderCount(0);
                    that.getOrders(0);
                    if (that.isActive) {
                        that.getNewOrdersByTime();
                    }
                }, 300000);// 五分钟加载一次新订单
            },

        },
        beforeDestroy() {
            console.log('实例已销毁');
        },
        activated() {
            console.log('激活了');
            this.isActive = true;
            // this.getOrderCount(this.index);
            // this.getOrders(this.index);
            this.initData();
            this.getNewOrdersByTime();
        },
        deactivated() {
            console.log('休眠了');
            this.isActive = false;
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
