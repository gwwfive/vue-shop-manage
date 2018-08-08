<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                    type="index"
                    width="100"
                    label="序号">
                </el-table-column>
                <el-table-column
                    type="avatarUrl"
                    width="150"
                    label="头像">
                    <!--<templete>-->
                    <template scope="scope">
                        <img style="width: 30px;height: 30px;border-radius: 50%;"
                             :src="scope.row.avatarUrl">
                    </template>
                    <!--</templete>-->

                </el-table-column>
                <el-table-column
                    property="createTime"
                    label="注册日期"
                    width="220">
                </el-table-column>
                <el-table-column
                    property="nickName"
                    label="用户姓名"
                    width="220">
                </el-table-column>
                <el-table-column
                    property="gender"
                    label="性别"
                >
                </el-table-column>
                <el-table-column
                    property="city"
                    label="城市">
                </el-table-column>
                <el-table-column
                    property="id"
                    label="ID">
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
    import {userCount} from '@/api/getData'

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
                    const countData = await userCount();
                    if (countData.status == 1) {
                        this.count = countData.count;
                    } else {
                        throw new Error('获取数据失败');
                    }
                    this.getUsers();
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
                this.getUsers()
            },
            async getUsers() {
                const Users = await userCount({offset: this.offset, limit: this.limit});
                this.tableData = [];
                if (Users.status == 1) {
                    Users.users.forEach(item => {
                        const tableData = {};
                        tableData.nickName = item.nickName;
                        tableData.createTime = item.createTime;
                        tableData.city = item.city;
                        tableData.gender = item.gender;
                        tableData.avatarUrl = item.avatarUrl;
                        tableData.id = item.id;
                        this.tableData.push(tableData);
                    })
                }

            }
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .table_container {
        padding: 20px;
    }
</style>
