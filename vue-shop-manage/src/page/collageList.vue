<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="id"
                    label="ID"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建日期"
                    width="220">
                </el-table-column>
                <el-table-column
                    prop="collageProductNum"
                    label="商品数量"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="collageTotal"
                    label="活动营收">
                </el-table-column>
                <el-table-column
                    prop="statusDesc"
                    label="活动状态">
                </el-table-column>
                <el-table-column
                    label="操作" width="250">
                    <template scope="scope">
                        <!--只有未上线的活动可以继续编辑-->
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit(scope.row)" :disabled="scope.row.status==1||scope.row.status==3">编辑
                        </el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleChangeStatus(scope.$index,scope.row.id,2)" v-if="scope.row.status==1">下线
                        </el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleChangeStatus(scope.$index,scope.row.id,1)" v-if="scope.row.status==2||scope.row.status==0">上线
                        </el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index,scope.row.id)" v-if="scope.row.status==0">删除
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
    import {getCollage,collageChangeStatus,deleteCollage} from '@/api/getData'

    export default {
        data() {
            return {
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
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
                    const res = await getCollage();
                    if (res.status == 1) {
                        this.count = res.count;
                    } else {
                        throw new Error('获取数据失败');
                    }
                    this.getCollage();
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
            async getCollage() {
                try {
                    const res = await getCollage({offset: this.offset, limit: this.limit});
                    if (res.status == 1) {
                        this.tableData = [];
                        res.collages.forEach(item => {
                            var statusDesc = '';
                            if (item.status == 0) {
                                statusDesc = '未上线';
                            } else if (item.status == 1) {
                                statusDesc = '已上线';
                            } else if (item.status == 2) {
                                statusDesc = '已暂停';
                            } else if (item.status == 3) {
                                statusDesc = '已过期';
                            }
                            const tableItem = {
                                createTime: item.createTime,
                                id: item.id,
                                collageProductNum: item.collageProductNum,
                                collageTotal: item.collageTotal,
                                statusDesc: statusDesc,
                                status: item.status,
                            };
                            this.tableData.push(tableItem)
                        })
                    } else {
                        throw new Error(res.message)
                    }
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            handleEdit(row) {
                this.$router.push({path: 'editCollage', query: {collageId: row.id}});

            },
            async handleDelete(index,id){
                const res = await deleteCollage({collageId:id});
                if(res.status==1){
                    this.$message({
                        type:'success',
                        message:'删除成功',
                    });
                    this.tableData.splice(index,1);
                }else {
                    this.$message({
                        type:'error',
                        message:'删除失败',
                    });
                }
            },
            async handleChangeStatus(index,id,status) {
                const res = await collageChangeStatus({collageId:id,status:status});
                if(res.status==1){
                    this.tableData[index].status = status;
                    this.tableData[index].statusDesc = status==2?'已下线':'已上线';
                    this.$message({
                        type:'success',
                        message:'修改成功',
                    });
                }else {
                    this.$message({
                        type:'error',
                        message:res.message,
                    });

                }

            },
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .table_container {
        padding: 20px;
    }
</style>


