<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
            <el-col :span="12" :offset="4">
                <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
                    <el-form-item label="优惠券分类" prop="couponType">
                        <el-select v-model="formData.couponType" placeholder="选择优惠券种类">
                            <el-option
                                v-for="item in categoryOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="满多少" prop="fullAmount" v-if="formData.couponType==0">
                        <el-input v-model="formData.fullAmount" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="减多少" prop="reduceAmount" v-if="formData.couponType==0">
                        <el-input v-model="formData.reduceAmount" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="立减多少" prop="onceAmount" v-if="formData.couponType==1">
                        <el-input v-model="formData.onceAmount" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="折扣" prop="discount" placeholder="例如8.8折输入8.8" v-if="formData.couponType==2">
                        <el-input v-model="formData.discount"></el-input>
                    </el-form-item>
                    <el-form-item label="折扣上限" prop="disCountUpLimit" v-if="formData.couponType==2">
                        <el-input v-model="formData.disCountUpLimit" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="优惠券数量" prop="couponNum">
                        <el-input v-model="formData.couponNum" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="优惠时间类型" prop="timeType">
                        <el-select v-model="formData.timeType" placeholder="选择优惠券种类">
                            <el-option
                                v-for="item in timeTypeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="优惠券时间段" prop="dateRange" v-if="formData.timeType==0">
                        <el-date-picker
                            v-model="formData.dataRange"
                            type="daterange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :default-time="['00:00:00', '23:59:59']">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="固定每周某日" prop="perWeekDay" v-if="formData.timeType==1">
                        <el-input v-model="formData.perWeekDay" placeholder="例如输入4，表示每周周四有效" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="固定每月某日" prop="perMonthDay" v-if="formData.timeType==2">
                        <el-input v-model="formData.perMonthDay" placeholder="例如输入13，表示每月13号有效，应小于29"
                                  type="number"></el-input>
                    </el-form-item>
                    <el-form-item class="button_submit">
                        <el-button type="primary" @click="submitForm('formData')">立即创建</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import headTop from '@/components/headTop'
    import {addCoupon} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'

    export default {
        data() {
            return {
                city: {},
                formData: {
                    couponType: null,//满减 1立减 2折扣 3指定商品
                    fullAmount: null,  // 满多少 couponType = 0 有效
                    reduceAmount: null,// 减多少 couponType = 0 有效
                    onceAmount: null,  // 立刻减多少 couponType = 1有效
                    discount: null,  // 折扣
                    disCountUpLimit: null,  //折扣上限
                    couponNum: 0,  // 优惠券总数量
                    timeType: null,// 时间类型 0为某一个时间段有效 1固定每周某日有效 2固定某月有效
                    // startTime: null,  //优惠券开始时间
                    // endTime: null,  // 优惠券结束时间
                    dataRange: null,  // 时间段
                    perWeekDay: null,  // 固定每周某日有效
                    perMonthDay: null,//固定每月某日有效
                },

                rules: {
                    couponType: [
                        {required: true, message: '请选择优惠券类型', trigger: 'blur'},
                    ],
                    timeType: [
                        {required: true, message: '请选择优惠时间类型', trigger: 'blur'}
                    ],
                    fullAmount: [
                        {required: true, message: '请输入满金额'},
                        // {type: 'number', message: '请输入数字'}
                    ],
                    reduceAmount: [
                        {required: true, message: '请输入减金额'},
                        // {type: 'number', message: '请输入数字'}
                    ],
                    onceAmount: [
                        {required: true, message: '请输入立减金额'},
                        // {type: 'number', message: '请输入数字'}
                    ],
                    discount: [
                        {required: true, message: '请输入折扣'},
                        // {type: 'number', message: '请输入数字'}
                    ],
                    disCountUpLimit: [
                        {required: true, message: '请输入折扣上限金额'},
                        // {type: 'number', message: '请输入数字'}
                    ],
                    couponNum: [
                        {required: true, message: '请输入优惠券发行数量'},
                        // {type: 'number', message: '请输入数字'}
                    ],
                    dataRange: [
                        {required: true, message: '请选择时间段'},
                        // {type: 'number', message: '请输入数字'}
                    ],
                    // endTime: [
                    //     {required: true, message: '请选择结束时间'},
                    //     // {type: 'number', message: '请输入数字'}
                    // ],
                    perWeekDay: [
                        {required: true, message: '请输入星期某日'},
                        // {type: 'number', message: '请输入数字'}
                    ],
                    perMonthDay: [
                        {required: true, message: '请输入月某日'},
                        // {type: 'number', message: '请输入数字'}
                    ],
                },
                categoryOptions: [{
                    value: '0',
                    label: '满减优惠券'
                }, {
                    value: '1',
                    label: '立减优惠券'
                }, {
                    value: '2',
                    label: '折扣优惠券'
                },],
                timeTypeOptions: [{
                    value: '0',
                    label: '时间段有效'
                }, {
                    value: '1',
                    label: '固定每周某日有效'
                }, {
                    value: '2',
                    label: '固定每月某日有效'
                },],
                baseUrl,
                baseImgPath,
            }
        },
        components: {
            headTop,
        },
        mounted() {
            // this.initData();
        },
        methods: {

            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        console.log('验证通过了');
                        var p1 = {};
                        var p2 = {};
                        if (this.formData.couponType == 0) {
                            // 是满减
                            p1 = {
                                fullAmount: this.formData.fullAmount,  // 满多少 couponType = 0 有效
                                reduceAmount: this.formData.reduceAmount,// 减多少 couponType = 0 有效
                            }
                            if(parseInt(p1.reduceAmount)>parseInt(p1.fullAmount)){
                                this.$message({
                                    type:'error',
                                    message:'减多少要小于满多少',
                                });
                                return false;
                            }
                        } else if (this.formData.couponType == 1) {
                            // 是立减
                            p1 = {
                                onceAmount: this.formData.onceAmount,  // 立刻减多少 couponType = 1有效
                            }
                        } else {
                            // 是折扣
                            p1 = {
                                discount: this.formData.discount,  // 折扣
                                disCountUpLimit: this.formData.disCountUpLimit,  //折扣上限
                            }
                        }
                        if (this.formData.timeType == 0) {
                            p2 = {
                                dateRange: this.formData.dataRange,  // 时间段
                            }
                        } else if (this.formData.timeType == 1) {
                            p2 = {
                                perWeekDay: this.formData.perWeekDay,  // 固定每周某日有效
                            }
                            if(parseInt(p2.perWeekDay)>7||parseInt(p2.perWeekDay)===0){
                                this.$message({
                                    type:'error',
                                    message:'输入星期有误',
                                });
                                return;
                            }
                        } else {
                            p2 = {
                                perMonthDay: this.formData.perMonthDay,//固定每月某日有效
                            }
                            if(parseInt(p2.perMonthDay)>28||parseInt(p2.perMonthDay)===0){
                                this.$message({
                                    type:'error',
                                    message:'输入日期有误',
                                });
                                return;
                            }

                        }
                        const p = {
                            couponType: this.formData.couponType,//满减 1立减 2折扣 3指定商品
                            couponNum: this.formData.couponNum,  // 优惠券总数量
                            timeType: this.formData.timeType,// 时间类型 0为某一个时间段有效 1固定每周某日有效 2固定某月有效
                            ...p1,
                            ...p2,
                        }
                        const res = await addCoupon(p);
                        if (res.status == 1) {
                            this.formData = {
                                couponType: null,//满减 1立减 2折扣 3指定商品
                                fullAmount: null,  // 满多少 couponType = 0 有效
                                reduceAmount: null,// 减多少 couponType = 0 有效
                                onceAmount: null,  // 立刻减多少 couponType = 1有效
                                discount: null,  // 折扣
                                disCountUpLimit: null,  //折扣上限
                                couponNum: 0,  // 优惠券总数量
                                timeType: null,// 时间类型 0为某一个时间段有效 1固定每周某日有效 2固定某月有效
                                dataRange: null,  // 时间段
                                perWeekDay: null,  // 固定每周某日有效
                                perMonthDay: null,//固定每月某日有效
                            },
                                this.$message({
                                    type: 'success',
                                    message: '添加成功',
                                });
                        }else {
                            this.message({
                                type:'error',
                                message:'添加失败，请检查输入或者网络',
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
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .button_submit {
        text-align: center;
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

    .el-table .info-row {
        background: #c9e5f5;
    }

    .el-table .positive-row {
        background: #e2f0e4;
    }
</style>
