<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                @expand='expand'
                :expand-row-keys='expendRow'
                :row-key="row => row.index"
                style="width: 100%">
                <el-table-column type="expand">
                    <template scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="商品名称">
                                <span>{{ props.row.productName }}</span>
                            </el-form-item>
                            <el-form-item label="商品 ID">
                                <span>{{ props.row.id }}</span>
                            </el-form-item>
                            <el-form-item label="商品卖点">
                                <span>{{ props.row.sellPoint }}</span>
                            </el-form-item>
                            <el-form-item label="商品评分">
                                <span>{{ props.row.rate }}</span>
                            </el-form-item>
                            <el-form-item label="商品分类">
                                <span>{{ props.row.categoryName }}</span>
                            </el-form-item>
                            <el-form-item label="总销量">
                                <span>{{ props.row.saleNum }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    label="商品名称"
                    prop="productName">
                </el-table-column>
                <el-table-column
                    label="商品卖点"
                    prop="sellPoint">
                </el-table-column>
                <el-table-column
                    label="商品评分"
                    prop="rate">
                </el-table-column>
                <el-table-column
                    label="状态"
                    prop="statusDesc">

                </el-table-column>
                <el-table-column label="操作" width="260">
                    <template scope="scope">
                        <el-button
                            size="small"
                            @click="handleEdit(scope.row)" :disabled="scope.row.status!=2">编辑
                        </el-button>
                        <el-button
                            size="small"
                            type="danger"
                            @click="handleChangeStatus(scope.$index, scope.row)">{{scope.row.status!=2?"下线":"上线"}}
                        </el-button>
                        <el-button
                            v-if="scope.row.status==0"
                            size="small"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>


                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination">
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
    import {baseUrl, baseImgPath} from '@/config/env'
    import {
        getProduct, changeProductStatus,
    } from '@/api/getData'

    export default {
        data() {
            return {
                baseUrl,
                baseImgPath,
                // shopId: 0,
                city: {},
                offset: 0,
                limit: 20,
                count: 0,
                tableData: [],
                currentPage: 1,
                expendRow: [],
            }
        },
        created() {
            // this.shopId = this.$route.query.shopId || 0;
            // this.initData();
        },
        components: {
            headTop,
        },
        methods: {
            async initData() {
                try {
                    const countData = await getProduct({shopId: this.shopId});
                    if (countData.status == 1) {
                        this.count = countData.count;
                    } else {
                        throw new Error('获取数据失败');
                    }
                    this.offset = 0;
                    this.limit = 20;
                    this.currentPage = 1;
                    this.getProduct();
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            async getProduct() {
                const products = await getProduct({offset: this.offset, limit: this.limit});
                this.tableData = [];
                if (products.status == 1) {
                    products.products.forEach((item, index) => {
                        var sellPoints = item.sellPoint.split(';');
                        var sellPoint = '';
                        sellPoints.forEach((item, index) => {
                            sellPoint = sellPoint + item + '  '
                        });


                        const tableData = {};
                        tableData.productName = item.productName;
                        tableData.id = item.id;
                        tableData.sellPoint = sellPoint;
                        tableData.rate = item.rate;
                        tableData.saleNum = item.saleNum;
                        tableData.status = item.status;
                        tableData.categoryName = item.categoryName;
                        tableData.statusDesc = item.status == 0 ? "未发布" : item.status == 1 ? "已上线" : "已下线";
                        // tableData.shopName = item.shopName;
                        tableData.index = index;
                        this.tableData.push(tableData);
                    });
                }
            },
            tableRowClassName(row, index) {
                if (index === 1) {
                    return 'info-row';
                } else if (index === 3) {
                    return 'positive-row';
                }
                return '';
            },

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1) * this.limit;
                this.getProduct()
            },
            expand(row, status) {
                // if (status) {
                //     this.getSelectItemData(row)
                // } else {
                //     const index = this.expendRow.indexOf(row.index);
                //     this.expendRow.splice(index, 1)
                // }
            },
            handleEdit(row) {
                console.log(row.id);
                this.$router.push({path: 'editGoods', query: {productId: row.id}});
            },
            async handleDelete(index, row) {
                try {
                    const res = await deleteFood(row.item_id);
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除食品成功'
                        });
                        this.tableData.splice(index, 1);
                    } else {
                        throw new Error(res.message)
                    }
                } catch (err) {
                    this.$message({
                        type: 'error',
                        message: err.message
                    });
                    console.log('删除食品失败')
                }
            },
            async handleChangeStatus(index, row) {

                const res = await changeProductStatus({
                    productId: row.id,
                    status: row.status == 0 ? 1 : row.status == 1 ? 2 : 1,
                    flag: 2
                });
                if (res.status == 1) {
                    var status = row.status == 0 ? 1 : row.status == 1 ? 2 : 1;
                    this.tableData[index].status = status;
                    this.tableData[index].statusDesc = status == 0 ? "未发布" : status == 1 ? "已上线" : "已下线";
                }
            },


        },
        activated() {
            this.initData();
        },
        deactivated() {
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';

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

    .table_container {
        padding: 20px;
    }

    .Pagination {
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }

    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
</style>
