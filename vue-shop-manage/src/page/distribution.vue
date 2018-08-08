<template>

    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px">
            <el-col :span="14" :offset="5">
                <el-form :model="distributionForm" :rules="distributionFormRule" ref="distributionForm"
                         label-width="180px">
                    <el-form-item label="一级分销提成%" prop="firstProfit">
                        <el-input type="number" v-model="distributionForm.firstProfit"></el-input>
                    </el-form-item>
                    <el-form-item label="一级分销提成上限(元)" prop="firstLimit">
                        <el-input type="number" v-model="distributionForm.firstLimit"></el-input>
                    </el-form-item>
                    <el-form-item label="二级分销提成%" prop="secondProfit">
                        <el-input type="number" v-model="distributionForm.secondProfit"></el-input>
                    </el-form-item>
                    <el-form-item label="二级分销提成上限(元)" prop="secondLimit">
                        <el-input type="number" v-model="distributionForm.secondLimit"></el-input>
                    </el-form-item>
                    <div style="display: flex;justify-content: center;padding: 20px;">
                        <el-button type="primary" @click="submit('distributionForm')">提交</el-button>
                    </div>
                </el-form>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import headTop from '@/components/headTop';
    import {setDistribution, getDistribution} from '@/api/getData';

    export default {
        data() {
            return {
                distributionForm: {
                    firstProfit: null,
                    firstLimit: null,
                    secondProfit: null,
                    secondLimit: null,
                },
                distributionFormRule: {

                    firstProfit: [{required: true, message: '请输入一级分销提成', trigger: 'blur'}],
                    firstLimit: [{required: true, message: '请输入一级分销提成上限', trigger: 'blur'}],
                    secondProfit: [{required: true, message: '请输入二级分销提成', trigger: 'blur'}],
                    secondLimit: [{required: true, message: '请输入二级分销提成上限', trigger: 'blur'}],
                }
            }
        },
        components: {
            headTop,
        },
        mounted() {
            this.init();
        },
        methods: {
            async init() {
                const res = await getDistribution();
                if (res.status == 1) {
                    this.distributionForm = {
                        firstProfit: res.firstProfit,
                        firstLimit: res.firstLimit,
                        secondProfit: res.secondProfit,
                        secondLimit: res.secondLimit,
                    }
                } else {
                    this.$message({
                        type: 'error',
                        message: res.message,
                    })
                }

            },
            async submit(distributionForm) {
                this.$refs[distributionForm].validate(async (valid) => {
                    if (valid) {
                        const p = {...this.distributionForm};
                        const res = await setDistribution(p);
                        if (res.status == 1) {
                            this.$message({
                                type: 'success',
                                message: '修改成功',
                            });

                        } else {
                            this.$message({
                                type: 'error',
                                message: '提交失败',
                            });
                        }
                    }
                });

            },

        }
    }
</script>

<style lang="less">

</style>
