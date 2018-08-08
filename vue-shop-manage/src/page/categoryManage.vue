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
                <el-table-column
                    label="ID"
                    prop="id">
                </el-table-column>
                <el-table-column
                    label="分类名称"
                    prop="label">
                </el-table-column>
                <el-table-column
                    label="商品数量"
                    prop="productNum">
                </el-table-column>
                <el-table-column
                    label="状态"
                    prop="statusDesc">
                </el-table-column>
                <el-table-column label="操作" width="260">
                    <template scope="scope">
                        <el-button
                            size="small"
                            @click="handleEdit(scope.$index, scope.row)" :disabled="scope.row.status!=2">编辑
                        </el-button>
                        <el-button
                            size="small"
                            type="danger"
                            @click="handleChangeStatus(scope.$index, scope.row)">{{scope.row.status==1?"下线":"上线"}}
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
            <div style="display: flex;justify-content: center;padding: 20px;">
                <el-button type="primary" @click="dialogFVisible=true">添加</el-button>
            </div>
            <el-dialog title="编辑分类" :visible.sync="dialogCategoryFVisible">
                <el-form :model="categoryForm" :rules="categoryFormRules" ref="categoryForm">
                    <!--<el-form-item label="选择分类" label-width="100px" v-if="categoryForm.categoryList">-->
                    <!--<el-cascader :options="categoryForm.categoryList"-->
                    <!--size="medium"-->
                    <!--v-model="categoryForm.selectedToAdd"-->
                    <!--change-on-select-->
                    <!--clearable>-->
                    <!--</el-cascader>-->
                    <!--</el-form-item>-->
                    <el-form-item label="编辑分类" label-width="100px" prop="newCategory">
                        <el-input v-model="categoryForm.newCategory" placeholder="输入分类"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <!--<el-button @click="dialogFormVisible = false">取 消</el-button>-->
                    <el-button type="primary" @click="submitCategoryForm('categoryForm')">提交
                    </el-button>
                </div>
            </el-dialog>
            <el-dialog title="添加分类" :visible.sync="dialogFVisible">
                <el-form :model="newCategoryForm" :rules="categoryFormRules" ref="newCategoryForm">
                    <!--<el-form-item label="选择分类" label-width="100px" v-if="categoryForm.categoryList">-->
                    <!--<el-cascader :options="categoryForm.categoryList"-->
                    <!--size="medium"-->
                    <!--v-model="categoryForm.selectedToAdd"-->
                    <!--change-on-select-->
                    <!--clearable>-->
                    <!--</el-cascader>-->
                    <!--</el-form-item>-->
                    <el-form-item label="添加分类" label-width="100px" prop="newCategory">
                        <el-input v-model="newCategoryForm.newCategory" placeholder="输入多个分类时，请以中文'；'隔开"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <!--<el-button @click="dialogFormVisible = false">取 消</el-button>-->
                    <el-button type="primary" @click="submitNewCategoryForm('newCategoryForm')">提交
                    </el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {
        getCategory, addCategory, changeCategoryStatus, deleteCategory,
    } from '@/api/getData'
    import ElButton from "element-ui/packages/button/src/button";

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
                dialogCategoryFVisible: false,
                dialogFVisible: false,
                categoryForm: {
                    newCategory: null,
                },
                newCategoryForm: {
                    newCategory: null,
                },
                categoryFormRules: {
                    newCategory: [{
                        required: true, message: '至少输入一个分类才能提交', trigger: 'blur'
                    },],
                },
            }
        },
        created() {

            this.initData();
        },
        components: {
            ElButton,
            headTop,
        },
        methods: {
            async initData() {
                try {
                    const countData = await getCategory({flag: 2});
                    if (countData.status == 1) {
                        this.count = countData.category;
                    } else {
                        throw new Error('获取数据失败');
                    }
                    this.offset = 0;
                    this.limit = 20;
                    this.tableData = [];
                    this.currentPage = 1;
                    this.getCategory();
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            async getCategory() {
                const res = await getCategory({offset: this.offset, limit: this.limit, flag: 1});
                this.tableData = [];
                if (res.status == 1) {
                    res.category.forEach((item, index) => {
                        const tableData = {};
                        tableData.label = item.label;
                        tableData.id = item.id;
                        tableData.productNum = item.productNum;
                        tableData.statusDesc = item.status == 0 ? "未发布" : item.status == 1 ? "已上线" : "已下线";
                        tableData.status = item.status;
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
                this.getCategory()
            },
            expand(row, status) {
            },
            handleEdit(index, row) {
                // console.log(row.id);
                // this.$router.push({path: 'editGoods', query: {productId: row.id}});
                this.categoryForm = {id: row.id, newCategory: row.label, index: index};
                this.dialogCategoryFVisible = true;
            },
            async handleDelete(index, row) {
                try {
                    const res = await deleteCategory({categoryId: row.id});
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
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
                    console.log('删除失败')
                }
            },
            async handleChangeStatus(index, row) {
                const res = await changeCategoryStatus({
                    categoryId: row.id,
                    status: row.status != 1 ? 1 : 2,
                    flag: 2
                });
                if (res.status == 1) {
                    var status = row.status != 1 ? 1 : 2;
                    this.tableData[index].status = status;
                    this.tableData[index].statusDesc = status == 1 ? "已上线" : "已下线";
                }
            },
            submitCategoryForm(categoryForm) {
                this.$refs[categoryForm].validate(async (valid) => {
                    if (valid) {

                        const params = {
                            label: this.categoryForm.newCategory,
                            categoryId: this.categoryForm.id,
                            // shopId: this.shopId,
                        };
                        console.log(params);
                        // return;
                        try {
                            const result = await changeCategoryStatus(params);
                            if (result.status == 1) {
                                this.dialogCategoryFVisible = false;
                                this.tableData[this.categoryForm.index].label = params.label;
                            }
                        } catch (err) {
                            console.log(err)
                        }
                    } else {
                        return false;
                    }
                });
            },
            submitNewCategoryForm(categoryForm) {
                this.$refs[categoryForm].validate(async (valid) => {
                    if (valid) {

                        const params = {
                            category: this.newCategoryForm.newCategory,
                            fatherId: this.newCategoryForm.selectedToAdd ? this.newCategoryForm.selectedToAdd[this.newCategoryForm.selectedToAdd.length - 1] : 0,
                            shopId: this.shopId,
                        };
                        console.log(params);
                        try {
                            const result = await addCategory(params);
                            if (result.status == 1) {
                                var res = await this.initData();
                                this.newCategoryForm.newCategory = null;
                                // this.categoryForm.selectedToAdd = [];
                                this.dialogFVisible = false;
                                this.$message({
                                    type: 'success',
                                    message: '添加成功'
                                });
                            }
                        } catch (err) {
                            console.log(err)
                        }
                    } else {
                        return false;
                    }
                });
            },
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
