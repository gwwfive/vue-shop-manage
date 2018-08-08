<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
            <el-col :span="16" :offset="4">
                <!--<header class="form_header">添加商品</header>-->
                <el-form :model="foodForm" :rules="foodrules" ref="foodForm" label-width="110px" class="form food_form">
                    <!--<el-form-item v-if="shopName" label="选择商店">-->
                    <!--<el-button type="text" @click="selectShop">{{shopName}}</el-button>-->
                    <!--</el-form-item>-->
                    <!--<el-from-item v-if="restaurant_name" label="选择商品种类">-->
                    <!--<el-row class="category_select">-->
                    <el-form-item label="商品种类" pron="categorySelect">
                        <el-row>
                            <el-col :span="8">
                                <el-cascader
                                    expand-trigger="hover"
                                    :options="categoryForm.categoryList"
                                    v-model="foodForm.categorySelect"
                                    size="medium"
                                    show-all-levels
                                    clearable>
                                </el-cascader>
                            </el-col>
                            <!--<el-col :span="2"></el-col>-->
                            <!--<el-col :span="4" style="margin-left: 10px;">-->
                                <!--<el-button type="primary" plain @click="dialogCategoryFVisible = true"><i-->
                                    <!--class="el-icon-plus el-icon&#45;&#45;left"></i>添加种类-->
                                <!--</el-button>-->
                            <!--</el-col>-->
                        </el-row>
                    </el-form-item>
                    <!--</el-row>-->
                    <!--</el-from-item>-->
                    <el-form-item label="商品名称" prop="name">
                        <el-input v-model="foodForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="上传商品主图">
                        <el-upload
                            class="avatar-uploader"
                            name="img"
                            :action="baseUrl + '/v1/upload/image/'"
                            :show-file-list="false"
                            :on-success="handleSuccess"
                            :before-upload="handleBefore"
                        >
                            <img v-if="foodForm.imageUrl" :src="foodForm.imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="轮播图组">
                        <el-upload
                            name="img"
                            :action="baseUrl + '/v1/upload/image/'"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :file-list="foodForm.carousel"
                            :on-change="handleChange">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>
                    <el-form-item label="商品介绍" prop="description">
                        <quill-editor ref="quillEditor"></quill-editor>
                    </el-form-item>
                    <el-form-item label="商品卖点">
                        <el-select v-model="foodForm.sellPoint" multiple allow-create filterable default-first-option
                                   placeholder="创建或选择商品的卖点">
                            <el-option
                                v-for="item in sellPoint"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品参数">
                        <el-row v-if="foodForm.formats.length>0">
                            <el-col :span="12" class="guige" v-for="(item,index) in foodForm.formats">
                                <el-row>
                                    <el-col :span="9">
                                        <el-input
                                            placeholder="请输入规格名"
                                            v-model="item.name">
                                        </el-input>
                                    </el-col>
                                    <el-col class="line" :span="2">-</el-col>
                                    <el-col :span="9">
                                        <el-input
                                            placeholder="请输入规格名"
                                            v-model="item.value">
                                        </el-input>
                                    </el-col>
                                    <el-col :span="2">
                                        <!--<templete scope="scope">-->
                                        <i class="el-icon-delete el-icon--right" v-bind:index="index"
                                           @click="deleteFormat(index)"></i>
                                        <!--</templete>-->

                                    </el-col>
                                </el-row>
                            </el-col>

                        </el-row>

                        <el-button type="primary" @click="addFormat"><i class="el-icon-plus el-icon--left"></i>{{foodForm.formats.length>0?"继续添加":"添加参数"}}
                        </el-button>
                    </el-form-item>
                    <el-form-item label="商品规格">
                        <el-row v-if="foodForm.specs.length>0" style="overflow: auto; text-align: center;">
                            <!--<el-button type="primary" @click="dialogFormVisible = true" style="margin-bottom: 10px;">添加规格-->
                            <!--</el-button>-->
                            <el-table
                                :data="foodForm.specs"
                                style="margin-bottom: 20px;"
                                :row-class-name="tableRowClassName">
                                <el-table-column
                                    prop="specs"
                                    label="规格" align="center">
                                </el-table-column>
                                <el-table-column
                                    prop="packing_fee"
                                    label="包装费" align="center">
                                </el-table-column>
                                <el-table-column
                                    prop="market_price"
                                    label="市场价" align="center">
                                </el-table-column>
                                <el-table-column
                                    prop="price"
                                    label="现售价" align="center">
                                </el-table-column>
                                <el-table-column
                                    prop="sku_num"
                                    label="库存" align="center">
                                </el-table-column>
                                <el-table-column label="操作" width="200" align="center">
                                    <template scope="scope">
                                        <el-button
                                            size="small"
                                            type="primary"
                                            @click="handleEdit(scope.$index,scope.row)" :disabled="scope.row.status==1">
                                            编辑
                                        </el-button>
                                        <el-button
                                            v-if="scope.row.id"
                                            size="small"
                                            type="danger"
                                            @click="handleChangeStatus(scope.$index,scope.row)">
                                            {{scope.row.status==0?"上线":"下线"}}
                                        </el-button>
                                        <el-button
                                            v-if="!scope.row.id"
                                            size="small"
                                            type="danger"
                                            @click="handleDelete(scope.$index,scope.row)">
                                            删除
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-row>
                        <el-button type="primary" @click="dialogFormVisible = true" style="margin-bottom: 10px;"><i
                            class="el-icon-plus el-icon--left"></i>{{foodForm.specs.length>0?"继续添加":"添加规格"}}
                        </el-button>
                        <!--<el-radio class="radio" v-model="foodSpecs" label="one">单规格</el-radio>-->
                        <!--<el-radio class="radio" v-model="foodSpecs" label="more">多规格</el-radio>-->
                    </el-form-item>

                    <!--<el-form-item>-->
                    <!---->
                    <!--</el-form-item>-->
                    <el-row>
                        <el-col :span="24" style="display: flex;justify-content: center;padding: 20px;">
                            <el-button type="primary" @click="editFood('foodForm')">保存</el-button>
                        </el-col>
                    </el-row>
                </el-form>
                <el-dialog title="添加规格" :visible.sync="dialogFormVisible">
                    <el-form :rules="specsFormrules" :model="specsForm">
                        <el-form-item label="规格" label-width="100px" prop="specs">
                            <el-input v-model="specsForm.specs" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="包装费" label-width="100px"prop="packing_fee">
                            <el-input type="number" v-model="specsForm.packing_fee" controls-position="right" :precision="2"
                                      :step="0.1" :min="0" :max="100"></el-input>
                        </el-form-item>
                        <el-form-item label="市场价(元)" label-width="100px"prop="market_price">
                            <el-input type="number" v-model="specsForm.market_price" :precision="2" :step="0.1" :min="0"
                                      :max="10000"></el-input>
                        </el-form-item>
                        <el-form-item label="现售价(元)" label-width="100px"prop="price">
                            <el-input type="number" v-model="specsForm.price" :min="0" :precision="2" :step="0.1"
                                      :max="10000"></el-input>
                        </el-form-item>
                        <el-form-item label="库存" label-width="100px"prop="sku_num">
                            <el-input-number v-model="specsForm.sku_num" :min="0" :max="10000"></el-input-number>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addspecs">确 定</el-button>
                    </div>
                </el-dialog>
                <el-dialog title="编辑规格" :visible.sync="dialogEditFormVisible">
                    <el-form :rules="specsFormrules" :model="specsEditForm">
                        <el-form-item label="规格" label-width="100px" prop="specs">
                            <el-input v-model="specsEditForm.specs" auto-complete="off" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="包装费" label-width="100px" disabled prop="packing_fee">
                            <el-input v-model="specsEditForm.packing_fee" controls-position="right" :precision="2"
                                      :step="0.1" :min="0" :max="100"></el-input>
                        </el-form-item>
                        <el-form-item label="市场价(元)" label-width="100px" disabled prop="market_price">
                            <el-input type="number" v-model="specsEditForm.market_price" :precision="2" :step="0.1" :min="0"
                                      :max="10000"></el-input>
                        </el-form-item>
                        <el-form-item label="现售价(元)" label-width="100px" prop="price">
                            <el-input type="number" v-model="specsEditForm.price" :min="0" :precision="2" :step="0.1"
                                      :max="10000"></el-input>
                        </el-form-item>
                        <el-form-item label="库存" label-width="100px" prop="sku_num">
                            <el-input-number v-model="specsEditForm.sku_num" :min="0" :max="10000"></el-input-number>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogEditFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="editspecs">确 定</el-button>
                    </div>
                </el-dialog>
                <!-- 添加商品分类的弹窗 -->
                <!--<el-dialog title="添加分类" :visible.sync="dialogCategoryFVisible">-->
                    <!--<el-form :model="categoryForm" :rules="categoryFormRules" ref="categoryForm">-->
                        <!--<el-form-item label="选择分类" label-width="100px" v-if="categoryForm.categoryList">-->
                            <!--<el-cascader :options="categoryForm.categoryList"-->
                                         <!--size="medium"-->
                                         <!--v-model="categoryForm.selectedToAdd"-->
                                         <!--change-on-select-->
                                         <!--clearable>-->
                            <!--</el-cascader>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="添加分类" label-width="100px" prop="newCategory">-->
                            <!--<el-input v-model="categoryForm.newCategory" placeholder="输入多个分类时，请以中文'；'隔开"></el-input>-->
                        <!--</el-form-item>-->
                    <!--</el-form>-->
                    <!--<div slot="footer" class="dialog-footer">-->
                        <!--&lt;!&ndash;<el-button @click="dialogFormVisible = false">取 消</el-button>&ndash;&gt;-->
                        <!--<el-button type="primary" @click="submitCategoryForm('categoryForm')">提交-->
                        <!--</el-button>-->
                    <!--</div>-->
                <!--</el-dialog>-->
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import headTop from '@/components/headTop'
    import {getCategory, addCategory, editProduct, getProduct, changeSkuStatus} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env';
    // 富文本
    import quillEditor from '@/components/quillEditor';
    // import ElForm from "element-ui/packages/form/src/form";
    // import ElDialog from "element-ui/packages/dialog/src/component";
    // import ElFormItem from "element-ui/packages/form/src/form-item";

    export default {
        data() {
            return {
                baseUrl,
                baseImgPath,
                productId: null,
                dialogImageUrl: '',
                dialogVisible: false,
                // hadOnline:null,
                categoryForm: {
                    categoryList: [],
                    newCategory: null,
                    selectedToAdd: null,
                },
                categoryFormRules: {
                    newCategory: [{
                        required: true, message: '至少输入一个分类才能提交', trigger: 'blur'
                    },],
                },

                foodForm: {
                    imageUploadPercent: 0,
                    showUploadPercent: false,
                    categorySelect: null,
                    name: '',
                    description: '',
                    imageUrl: '',
                    // activity: '',
                    carousel: [],
                    sellPoint: [],
                    formats: [],
                    specs: [],
                },
                foodrules: {
                    name: [
                        {required: true, message: '请输入食品名称', trigger: 'blur'},
                    ],
                    categorySelect: [
                        {required: true, message: '请选择商品的分类', trigger: 'blur'},
                    ]
                },
                specsForm: {
                    specs: '',
                    packing_fee: 0,
                    price: 20,
                },
                specsEditForm: {},
                specsFormrules: {
                    specs: [
                        {required: true, message: '请输入规格', trigger: 'blur'},
                    ],
                    packing_fee: [{required: true, message: '请输入包装费', trigger: 'blur'},
                        ],
                    market_price: [{required: true, message: '请输入市场价格', trigger: 'blur'},
                        ],
                    price: [{required: true, message: '请输入现售价', trigger: 'blur'},
                        ],
                    sku_num: [{required: true, message: '请输入库存', trigger: 'blur'}]
                },
                categoryOptions: [],

                sellPoint: [{
                    value: '美容',
                    label: '美容'
                }, {
                    value: '保健',
                    label: '保健'
                },
                    {
                        value: '滋阴补肾',
                        label: '滋阴补肾'
                    },],
                showAddCategory: false,
                foodSpecs: 'one',
                dialogFormVisible: false,
                dialogEditFormVisible: false,
                dialogCategoryFVisible: false,
                dialogCarouselVisible: false,

            }
        },
        components: {
            quillEditor,
            headTop,
        },
        created() {
            if (this.$route.query.productId) {
                // this.shopId = this.$route.query.shopId;
                this.productId = this.$route.query.productId;
            } else {
                // this.restaurant_id = Math.ceil(Math.random() * 10);
                this.$msgbox({
                    title: '提示',
                    message: '修改商品需要选择一个商品',
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) => {
                        this.$router.push('/goodsList');
                        done();
                    }
                })
            }
            this.initData();
        },
        computed: {
            selectValue: function () {
                return this.categoryForm.categoryList[this.categoryForm.categorySelect] || {}
            }
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            "$route": "fetchDate"
        },
        methods: {
            // 更新data
            fetchDate() {
                console.log('路由变化了');
                if (this.$route.query.productId) {
                    this.productId = this.$route.query.productId;
                    // this.shopName = this.$route.query.shopName;
                    this.initData();
                }
            },
            async initData() {
                try {
                    if (!this.productId) {
                        return;
                    }
                    const result = await getCategory();
                    if (result.status == 1) {
                        this.categoryForm.categoryList = result.category;
                    } else {
                        console.log(result)
                    }
                    const res = await getProduct({'productId': this.productId});
                    if (res.status == 1) {
                        console.log(this.foodForm);
                        this.foodForm.name = res.product.productName;
                        this.foodForm.categorySelect = res.product.catrgorySelect;
                        this.foodForm.imageUrl = res.product.imgUrl;
                        this.foodForm.formats = [];
                        res.product.formats.forEach((item) => {
                            this.foodForm.formats.push({
                                name: item.formatName,
                                value: item.formatValue,
                            })
                        });
                        this.foodForm.specs = [];
                        res.product.specs.forEach((item) => {
                            this.foodForm.specs.push({
                                market_price: item.originPrice,
                                packing_fee: 0,
                                price: item.sellPrice,
                                sku_num: item.residualNum,
                                specs: item.skuName,
                                status: item.status,
                                id: item.id,
                            });
                        });
                        this.foodForm.sellPoint = [];
                        res.product.sellPoints.forEach((item) => {
                            if (item) {
                                this.foodForm.sellPoint.push(item);
                            }

                        });
                        this.foodForm.carousel = [];
                        res.product.carousels.forEach((item) => {
                            this.foodForm.carousel.push({'url': item.picUrl})
                        });
                        this.$refs.quillEditor.content = res.product.introduce;
                        console.log(this.foodForm);
                    }
                } catch (err) {
                    console.log(err)
                }
            },
            // addCategoryFun() {
            //     this.showAddCategory = !this.showAddCategory;
            // },
            submitCategoryForm(categoryForm) {
                this.$refs[categoryForm].validate(async (valid) => {
                    if (valid) {

                        const params = {
                            category: this.categoryForm.newCategory,
                            fatherId: this.categoryForm.selectedToAdd ? this.categoryForm.selectedToAdd[this.categoryForm.selectedToAdd.length - 1] : 0,
                            // shopId: this.shopId,
                        };
                        console.log(params);
                        // return;
                        try {
                            const result = await addCategory(params);
                            if (result.status == 1) {
                                const result = await getCategory();
                                if (result.status == 1) {
                                    this.categoryForm.categoryList = result.category;
                                } else {
                                    console.log(result)
                                }
                                this.categoryForm.newCategory = null;
                                // this.categoryForm.selectedToAdd = [];
                                this.dialogCategoryFVisible = false;
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
            handleSuccess(res, file) {
                if (res.status == 1) {
                    this.foodForm.imageUrl = res.imageUrl;
                } else {
                    this.$message.error('上传图片失败！');
                }
            },
            handleBefore(file) {
                const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 10;
                if (!isRightType) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isRightType && isLt2M;


            },
            handleRemove(file, fileList) {
                // console.log(file, fileList);
                this.foodForm.carousel = fileList;
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            uploadError() {
                this.foodForm.uploadState = true;
            },
            handleChange(file, fileList) {
                // this.foodForm.carousel = [];
                // var that = this;

                this.foodForm.carousel = fileList;
            },
            addspecs() {
                if (this.specsForm.specs) {
                    this.foodForm.specs.push({...this.specsForm});
                    this.specsForm.specs = '';
                    this.specsForm.packing_fee = 0;
                    this.specsForm.price = 20;
                    this.dialogFormVisible = false;
                }

            },
            editspecs() {
                var index = this.specsEditForm.index;
                this.foodForm.specs[index].price = this.specsEditForm.price;
                this.foodForm.specs[index].sku_num = this.specsEditForm.sku_num;
                this.dialogEditFormVisible = false;
            },
            // 添加规格
            addFormat() {
                this.foodForm.formats.push({'name': null, 'value': null});
            }
            ,
            // 删除规格
            deleteFormat(index) {
                this.foodForm.formats.splice(index, 1);

            }
            ,
            // 上下线
            async handleChangeStatus(index, row) {
                // this.foodForm.specs.splice(index, 1);

                const res = await changeSkuStatus({skuId: row.id, status: row.status == 0 ? 1 : 0, flag: 1});
                if (res.status == 1) {
                    this.foodForm.specs[index].status = row.status == 0 ? 1 : 0;
                }
            }
            ,
            // 编辑
            handleEdit(index, row) {
                this.dialogEditFormVisible = true;
                this.specsEditForm = {...row, index: index}
            },
            // 删除sku
            handleDelete(index, row) {
                this.foodForm.specs.splice(index, 1);
            },
            tableRowClassName(row, index) {
                if (index === 1) {
                    return 'info-row';
                } else if (index === 3) {
                    return 'positive-row';
                }
                return '';
            }
            ,
            editFood(foodForm) {
                this.$refs[foodForm].validate(async (valid) => {
                    if (valid) {
                        // 验证是否选择了商品
                        if (!this.productId) {
                            this.$msgbox({
                                title: '提示',
                                message: '还没有选择商品无法提交，前往选择？',
                                showCancelButton: true,
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                beforeClose: (action, instance, done) => {
                                    if (action === 'confirm') {
                                        this.$router.push('/goodsList');
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
                            return;
                        } else if (!this.foodForm.imageUrl) {
                            this.$message.error({
                                message: '商品没有主图',
                            });
                            return;
                        } else if (this.foodForm.specs.length === 0) {
                            this.$message.error({
                                message: '请至少添加一个规格',
                            });
                            return;
                        }
                        var carousels = [];
                        this.foodForm.carousel.forEach(function (item) {
                            console.log(item);
                            if (item.status == 'success') {
                                if (item.response) {
                                    carousels.push(item.response.imageUrl)
                                } else {
                                    carousels.push(item.url)
                                }
                            }

                        });
                        // 由于this.foodForm 包含了_ob_,故做json 处理
                        var foodForm = JSON.parse(JSON.stringify(this.foodForm));
                        console.log(foodForm);
                        const params = {
                            ...foodForm,
                            // category_id: this.selectValue.id,
                            carousels: carousels,
                            shopId: this.shopId,
                            productId: this.productId,
                            productDetail: this.$refs.quillEditor.content,
                            // hadOnline:this.hadOnline,
                        };
                        console.log(params);
                        try {
                            const result = await editProduct(params);
                            if (result.status == 1) {
                                console.log(result);
                                this.$message({
                                    type: 'success',
                                    message: '添加成功'
                                });
                                var that = this;
                                setTimeout(function () {
                                    that.$destroy();
                                    that.$router.back();
                                }, 1000);

                            } else {
                                this.$message({
                                    type: 'error',
                                    message: result.message
                                });
                            }
                        } catch (err) {
                            console.log(err)
                        }
                    } else {
                        this.$message.error({

                            message: '请检查输入是否正确',

                        });
                        return false;
                    }
                });
            }
            ,
            // //重新选择店铺？
            // selectShop() {
            //     this.$router.push('/shopList');
            //     done();
            // }
        },
        beforeDestroy() {
            // eventBus.$off('restaurantName');
        }
        ,
    }
</script>

<style lang="less" scoped>
    @import '../style/mixin';

    .guige {
        margin: 5px 0px;
    }

    .line {
        text-align: center;
    }

    .form {
        min-width: 400px;
        margin-bottom: 30px;
        &:hover {
            box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
            border-radius: 6px;
            transition: all 400ms;
        }
    }

    .food_form {
        border: 1px solid #eaeefb;
        padding: 10px 10px 0;
    }

    .form_header {
        text-align: center;
        margin-bottom: 10px;
    }

    .category_select {
        border: 1px solid #eaeefb;
        padding: 10px 30px 10px 10px;
        border-top-right-radius: 6px;
        border-top-left-radius: 6px;
    }

    .add_category_row {
        height: 0;
        overflow: hidden;
        transition: all 400ms;
        background: #f9fafc;
    }

    .showEdit {
        height: 185px;
    }

    .add_category {
        background: #f9fafc;
        padding: 10px 30px 0px 10px;
        border: 1px solid #eaeefb;
        border-top: none;
    }

    .add_category_button {
        text-align: center;
        line-height: 40px;
        border-bottom-right-radius: 6px;
        border-bottom-left-radius: 6px;
        border: 1px solid #eaeefb;
        border-top: none;
        transition: all 400ms;
        &:hover {
            background: #f9fafc;
            span, .edit_icon {
                color: #20a0ff;
            }
        }
        span {
            .sc(14px, #999);
            transition: all 400ms;
        }
        .edit_icon {
            color: #ccc;
            transition: all 400ms;
        }
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

    .el-table .cell {
        text-align: center;
    }

    /*轮播图*/


</style>
