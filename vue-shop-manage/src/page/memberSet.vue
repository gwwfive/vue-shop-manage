<template>
    <div class="fillcontain">
        <head-top></head-top>
        <!--<header class="admin_title">管理员信息</header>-->
        <div class="table_container">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="level"
                    label="会员等级"
                    width="220">
                </el-table-column>
                <el-table-column
                    prop="memberName"
                    label="会员昵称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="score"
                    label="所需积分">
                </el-table-column>
                <el-table-column
                    prop="discount"
                    label="会员权益">
                </el-table-column>
                <el-table-column
                    label="操作" width="250">
                    <template scope="scope">
                        <!--只有未上线的活动可以继续编辑-->
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit(scope.row,scope.$index)">编辑
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
            <!--<el-form>-->
                <div style="display:flex;justify-content: center;padding: 20px; ">
                    <el-button type="primary" @click="add">添加</el-button>
                </div>
            <!--</el-form>-->
            <el-dialog title="添加会员等级" :visible.sync="dialogVisible">
                <el-form :model="memberForm" :rules="memberFormRules" ref="memberForm">
                    <el-form-item label="会员等级" label-width="100px" prop="level">
                        <el-input v-model="memberForm.level" placeholder="输入会员等级" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="会员昵称" label-width="100px" prop="memberName">
                        <el-input v-model="memberForm.memberName" placeholder="输入会员昵称"></el-input>
                    </el-form-item>
                    <el-form-item label="所需积分" label-width="100px" prop="score">
                        <el-input v-model="memberForm.score" placeholder="输入所需积分"></el-input>
                    </el-form-item>
                    <el-form-item label="会员权益" label-width="100px" prop="discount">
                        <el-input v-model="memberForm.discount" placeholder="输入会员折扣，如8.8表示8.8折"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <!--<el-button @click="dialogFormVisible = false">取 消</el-button>-->
                    <el-button type="primary" @click="submitForm('memberForm')">提交
                    </el-button>
                </div>
            </el-dialog>

        </div>

    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {mapState} from 'vuex'
    import {baseUrl, baseImgPath} from '@/config/env';
    import {getMember, getMemberCount, addMember} from '@/api/getData';


    export default {
        data() {
            return {
                baseUrl,
                baseImgPath,
                tableData: [],
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                dialogVisible: false,
                memberForm: {
                    level: 0,
                    memberName: null,
                    discount: 10.00,
                    score: 0
                },
                memberFormRules: {
                    level: [{required: true, message: '等级'}],
                    memberName: [{required: true, message: '缺少昵称'}],
                    discount: [{required: true, message: '缺少折扣'}],
                    score: [{required: true, message: '缺少所需积分'}],
                },

            }
        },
        components: {
            headTop,
        },
        computed: {
            ...mapState(['adminInfo']),
        },
        created() {
            this.init();
        },
        methods: {

            async init() {
                const res = await getMemberCount();
                if (res.status == 1) {
                    this.count = res.count;
                }
                this.getMember();

            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1) * this.limit;
                this.getMember()
            },
            async getMember() {
                const res = await getMember({offset: this.offset, limit: this.limit});
                if (res.status == 1) {
                    this.tableData = [];
                    res.members.forEach((item) => {
                        this.tableData.push(item);
                    });
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        var that = this;
                        console.log('验证通过了');
                        const params = {
                            ...that.memberForm,
                        };
                        console.log('d');
                        if (this.tableData.length > 0) {
                            if (params.memberId) {
                                var length = that.tableData.length;
                                if (params.index == 0 && length > 1) {
                                    if (parseInt(params.score) >= parseInt(that.tableData[1].score)) {
                                        this.$message({
                                            type: 'error',
                                            message: '所需积分有误',
                                        });
                                        return false;
                                    }
                                } else if (params.index > 0 && params.index < length - 1) {
                                    if (parseInt(params.score) <= parseInt(that.tableData[params.index - 1].score) || parseInt(params.score) >= parseInt(that.tableData[params.index + 1].score)) {
                                        this.$message({
                                            type: 'error',
                                            message: '所需积分有误',
                                        });
                                        return false;
                                    }
                                } else if (params.index > 0 && params.index == length - 1) {
                                    if (parseInt(params.score) <= parseInt(that.tableData[params.index - 1].score)) {
                                        this.$message({
                                            type: 'error',
                                            message: '所需积分有误',
                                        });
                                        return false;
                                    }
                                }
                            }
                            else {
                                if (parseInt(params.score) <= parseInt(that.tableData[that.tableData.length - 1].score)) {
                                    this.$message({
                                        type: 'error',
                                        message: '所需积分有误',
                                    });
                                    return false;
                                }
                            }
                        }
                        console.log('e');
                        const res = await addMember(params);
                        console.log('e');
                        if (res.status == 1) {
                            this.offset = 0;
                            this.limit = 20;
                            this.count += 1;
                            this.getMember();
                            this.$message({
                                type: 'success',
                                message: '添加成功',
                            });
                            this.dialogVisible = false;
                        } else {
                            this.$message({
                                type: 'success',
                                message: '添加失败',
                            });
                        }
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: '请检查输入是否正确',
                            offset: 100
                        });
                        return false;
                    }
                });
            },
            async submitMemberForm(memberForm) {
                this.$refs[memberForm].validate(async (valid) => {
                    if (valid) {
                        const params = {
                            ...this.memberForm,
                        };
                        if (this.tableData.length > 0) {
                            if (parseInt(params.score) <= parseInt(this.tableData[this.tableData.length - 1].score)) {
                                this.$message({
                                    type: 'error',
                                    message: '所需积分有误',
                                });
                                return false;
                            }
                        }
                        const res = await addmember(params);
                        if (res.status == 1) {
                            this.offset = 0;
                            this.limit = 20;
                            this.count += 1;
                            this.getMember();
                            this.$message({
                                type: 'success',
                                message: '添加成功',
                            });
                        } else {
                            this.$message({
                                type: 'success',
                                message: '添加失败',
                            });
                        }
                    } else {
                        this.$message({
                            type: 'error',
                            message: '输入有误',
                        });
                    }
                });
            },
            add() {
                this.dialogVisible = true;
                this.memberForm = {
                    level: 0,
                    memberName: null,
                    discount: 10.00,
                    score: 0
                };
                this.memberForm.level = this.tableData.length > 0 ? parseInt(this.tableData[this.tableData.length - 1].level) + 1 : 1;
            },
            handleEdit(row, index) {
                this.dialogVisible = true;
                this.memberForm = {
                    level: row.level,
                    memberName: row.memberName,
                    discount: row.discount,
                    score: row.score,
                    memberId: row.id,
                    index: index,
                };
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
