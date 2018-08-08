<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
            <el-col :span="20" :offset="2">
                <el-container>
                    <el-header>
                        <el-col :span="14">拼团活动基本信息</el-col>
                        <el-col :span="10">
                            <el-button :disabled="!canSave" type="primary" @click="saveCollage('form')">保存
                            </el-button>
                        </el-col>
                    </el-header>
                    <el-main>
                        <el-form :model="form" :rules="formRule" label-width="110px" ref="form">
                            <!--<el-form-item label="活动"></el-form-item>-->
                            <el-form-item label="活动时间" prop="date">
                                <el-date-picker
                                    v-model="form.date"
                                    value-format="yyyy-MM-dd"
                                    type="daterange"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :default-time="['00:00:00', '00:00:00']">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="有效时间" prop="collageHour">
                                <el-input-number v-model="form.collageHour" :min=12 :max=72 :step=1>
                                </el-input-number>
                                小时
                            </el-form-item>
                            <el-form-item label="成团人数" prop="collagePeople">
                                <el-input-number v-model="form.collagePeople" :min=2 :max=12 :step=1>
                                </el-input-number>
                                人
                            </el-form-item>
                            <el-form-item label="每人限购" prop="collageLimit">
                                <el-input-number v-model="form.collageLimit" :min=1 :step=1>
                                </el-input-number>
                                件
                            </el-form-item>
                            <!--<el-form-item>-->
                            <!--</el-form-item>-->
                        </el-form>
                    </el-main>
                </el-container>

                <el-container style="margin-top: 40px;">
                    <el-header>
                        <el-col :span="14">关联商品</el-col>
                        <el-col :span="10">
                            <el-button type="primary" @click="dialogVisible=true">添加</el-button>
                        </el-col>
                    </el-header>
                    <el-main>
                        <el-form label-width="110px">
                            <el-row v-if="product.length>0" style="overflow: auto; text-align: center;">
                                <!--<el-button type="primary" @click="dialogFormVisible = true" style="margin-bottom: 10px;">添加规格-->
                                <!--</el-button>-->
                                <el-table
                                    :data="product"
                                    style="margin-bottom: 20px;"
                                    :row-class-name="tableRowClassName">
                                    <el-table-column
                                        prop="productName"
                                        label="商品">
                                    </el-table-column>
                                    <el-table-column
                                        prop="skuName"
                                        label="商品库存">
                                    </el-table-column>
                                    <el-table-column
                                        prop="marketPrice"
                                        label="商品原价">
                                    </el-table-column>
                                    <el-table-column
                                        prop="price"
                                        label="商品现价">
                                    </el-table-column>
                                    <el-table-column
                                        prop="collagePrice"
                                        label="团购价">
                                    </el-table-column>
                                    <el-table-column
                                        prop="collageNum"
                                        label="拼团数量">
                                    </el-table-column>
                                    <el-table-column label="操作" width="160">
                                        <template scope="scope">
                                            <el-button
                                                size="mini"
                                                type="primary"
                                                @click="handleEdit(scope.$index,scope.row)">编辑
                                            </el-button>
                                            <el-button
                                                size="mini"
                                                type="danger"
                                                @click="handleDelete(scope.$index)">删除
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-row>
                        </el-form>
                    </el-main>
                </el-container>
                <el-dialog title="添加商品" :visible.sync="dialogVisible">
                    <el-form :model="productForm" :rules="productFormRules" ref="productForm" label-width="100px">
                        <el-form-item label="选择商品" prop="productId">
                            <el-select v-model="productForm.productId"
                                       filterable
                                       remote
                                       :remote-method="remoteSearch"
                                       :loading="loading"
                                       @change="selectProduct"
                                       placeholder="请选择">
                                <el-option
                                    v-for="item in productIds"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                    <span style="float: right">{{ item.label }}</span>
                                    <span style="float: left; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="选择商品库存" prop="skuId">
                            <el-select v-model="productForm.skuId" @change="selectSku" placeholder="请选择">
                                <el-option
                                    v-for="item in skuNames"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="输入团购价" prop="collagePrice">
                            <el-input v-model="productForm.collagePrice"></el-input>
                        </el-form-item>
                        <el-form-item label="输入拼团数量" prop="collageNum">
                            <el-input type="number" v-model="productForm.collageNum" :min="1"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <!--<el-button @click="dialogFormVisible = false">取 消</el-button>-->
                        <el-button type="primary" @click="addProduct('productForm')">提交
                        </el-button>
                    </div>
                </el-dialog>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import headTop from '@/components/headTop';
    import {baseUrl, baseImgPath} from '@/config/env';
    import {saveCollage, searchId, getProductSku, addCollageProduct,getCollage} from '@/api/getData';
    import ElInput from "element-ui/packages/input/src/input";
    import ElFormItem from "element-ui/packages/form/src/form-item";
    import ElInputNumber from "element-ui/packages/input-number/src/input-number";

    export default {
        data() {
            return {
                baseUrl,
                baseImgPath,
                collageId: null,// 要改为null
                canSave: true,
                dialogVisible: false,
                loading: false,
                form: {
                    date: null,
                    collageHour: 12,
                    collagePeople: 2,
                    collageLimit: 1,
                },
                formRule: {
                    collageHour: [{required: true, message: '请输入有效时间', trigger: 'blur'}],
                    collagePeople: [{required: true, message: '请输入成团人数', trigger: 'blur'}],
                    collageLimit: [{required: true, message: '请输入每人限购', trigger: 'blur'}],
                    date: [{required: true, message: '请选择活动时间', trigger: 'blur'}],
                },
                productForm: {
                    id: null,
                    productId: null,
                    productName: null,
                    skuId: null,
                    skuName: null,
                    collagePrice: null,
                    collageNum: 1,
                    originPrice: null,
                    price: null,
                },
                productFormRules: {
                    productId: [{required: true, message: '请选择商品', trigger: 'blur'}],
                    skuId: [{required: true, message: '请选择库存', trigger: 'blur'}],
                    collagePrice: [{required: true, message: '请输入拼团价格'}],
                    collageNum: [{required: true, message: '请输入拼团数量'}],
                },
                product: [],
                productIds: [],
                skuNames: [],
            }
        },
        computed: {
            time: function () {
                // `this` 指向 vm 实例
                return this.message.split('').reverse().join('')
            }
        },
        components: {
            ElInputNumber,
            ElFormItem,
            ElInput,
            headTop,
        },
        watch: {
            form: {
                handler(val, oldVal) {
                    console.log('数据改变了');
                    this.canSave = true;
                }, deep: true
            },
            // 如果路由有变化，会再次执行该方法
            "$route": "fetchDate"
        },
        created() {
            this.collageId = this.$route.query.collageId;
            this.initData();
        },
        methods: {
            fetchDate() {
                console.log('路由变化了');
                if (this.$route.query.collageId) {
                    if (this.collageId != this.$route.query.collageId) {
                        this.collageId = this.$route.query.collageId;
                        // this.shopName = this.$route.query.shopName;
                        this.initData();
                    }
                }
            },
            async initData() {
                if (this.collageId) {
                    try {
                        const res = await getCollage({collageId: this.collageId});
                        if (res.status == 1) {
                            // this.count = res.count;
                            this.form.date = [res.collage.startTime, res.collage.endTime];
                            this.form.collageHour = res.collage.effectiveTime;
                            this.form.collagePeople = res.collage.collagePeople;
                            this.form.collageLimit = res.collage.collageLimit;
                            this.product = [];
                            res.collage.product.forEach((item) => {
                                this.product.push({
                                    productName: item.product__productName,
                                    skuName: item.sku__skuName,
                                    skuNames: [],
                                    productIds: [],
                                    marketPrice: item.sku__originPrice,
                                    price: item.sku__sellPrice,
                                    collagePrice: item.collagePrice,
                                    collageNum: item.collageNum,
                                    skuId: item.sku_id,
                                    productId: item.product_id,
                                    collageSkuId: item.id,
                                })
                            });
                        } else {
                            throw new Error('获取数据失败');
                        }
                        // this.getCollage();
                    } catch (err) {
                        console.log('获取数据失败', err);
                    }
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
            handleSave(index) {
            },
            async addProduct() {
                if (!this.collageId) {
                    this.$message({
                        type: 'error',
                        message: '未保存活动'
                    });
                    return;
                }
                const params = {
                    collageId: this.collageId,
                    ...this.productForm,
                };
                const res = await addCollageProduct(JSON.parse(JSON.stringify(params)));
                if (res.status == 1) {
                    this.$message({
                        type: 'success',
                        message: '添加成功',
                    });
                    this.dialogVisible = false;
                    if (this.productForm.id) {// 是修改
                        this.product.forEach((item) => {
                            if (item.collageSkuId == this.productForm.id) {
                                item.productName = this.productForm.productName;
                                item.skuName = this.productForm.skuName;
                                item.skuNames = this.skuNames;
                                item.productIds = this.productIds;
                                item.marketPrice = this.productForm.originPrice;
                                item.price = this.productForm.price;
                                item.collagePrice = this.productForm.collagePrice;
                                item.collageNum = this.productForm.collageNum;
                                item.skuId = this.productForm.skuId;
                                item.productId = this.productForm.productId;
                                item.collageSkuId = res.collageSkuId;
                            }
                        })
                    } else {
                        this.product.push({
                            productName: this.productForm.productName,
                            skuName: this.productForm.skuName,
                            skuNames: this.skuNames,
                            productIds: this.productIds,
                            marketPrice: this.productForm.originPrice,
                            price: this.productForm.price,
                            collagePrice: this.productForm.collagePrice,
                            collageNum: this.productForm.collageNum,
                            skuId: this.productForm.skuId,
                            productId: this.productForm.productId,
                            collageSkuId: res.collageSkuId,
                        });
                    }
                    this.productForm = {
                        id: null,
                        productId: null,
                        productName: null,
                        skuId: null,
                        skuName: null,
                        collagePrice: null,
                        price: null,
                        originPrice: null,
                        collageNum: 1,
                    };
                    this.productIds = [];
                    this.skuNames = [];
                }
            },
            saveCollage(form) {
                this.$refs[form].validate(async (valid) => {
                    if (valid) {
                        const params = {
                            collageId: this.collageId || 0,
                            date: this.form.date,
                            collageHour: this.form.collageHour,
                            collagePeople: this.form.collagePeople,
                            collageLimit: this.form.collageLimit,
                        };
                        // console.log(params);
                        const res = await saveCollage(JSON.parse(JSON.stringify(params)));
                        if (res.status == 1) {
                            this.canSave = false;
                            this.collageId = res.collageId;
                            this.$message({
                                type: 'success',
                                message: '保存成功',
                            });
                        } else {
                            this.$message({
                                type: 'error',
                                message: '保存失败',
                            })
                        }

                    }
                });
            },
            async remoteSearch(query) {
                this.loading = true;
                const res = await searchId({'searchKey': query});
                if (res.status == 1) {
                    this.loading = false;
                    this.productIds = res.productIds;
                } else {
                    this.loading = false;
                }
            },
            async selectProduct(select) {
                console.log(select);
                // console.log(index);
                const res = await getProductSku({'select': select});
                if (res.status == 1) {
                    this.skuNames = res.skus;
                    this.productIds.forEach((item) => {
                        if (item.value == select) {
                            this.productForm.productName = item.label;
                        }
                    })
                }
            },
            selectSku(select) {
                console.log(select);
                this.skuNames.forEach((item) => {
                    if (item.value == select) {
                        this.productForm.originPrice = item.originPrice;
                        this.productForm.price = item.sellPrice;
                        this.productForm.skuName = item.label;
                    }
                });
                // this.productIds.forEach((item)=>{})
            },
            handleEdit(index, row) {
                this.dialogVisible = true;
                this.productForm.id = row.collageSkuId;
                this.productForm.productId = row.productId;
                this.productForm.productName = row.productName;
                this.productForm.skuId = row.skuId;
                this.productForm.skuName = row.skuName;
                this.productForm.collagePrice = row.collagePrice;
                this.productForm.originPrice = row.marketPrice;
                this.productForm.price = row.price;
                this.productForm.collageNum = row.collageNum;
                this.skuNames = row.skuNames;
                this.productIds = row.productIds;
            },
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        /*text-align: center;*/
        /*line-height: 160px;*/
    }

    body > .el-container {
        margin-bottom: 40px;
        /*margin-top: 40px;*/
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    .line {
        text-align: center;
    }


</style>
