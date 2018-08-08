<template>
    <div class="fillcontain">
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="5">
                <el-form :model="shopForm" ref="shopForm" :rules="shopFormRule" label-width="110px">
                    <el-form-item label="商铺名称" prop="name">
                        <el-input v-model="shopForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="商铺头像" prop="imageUrl">
                        <el-upload
                            class="avatar-uploader"
                            name="img"
                            :action="baseUrl + '/v1/upload/image/'"
                            :show-file-list="false"
                            :on-success="handleSuccess"
                            :before-upload="handleBefore"
                        >
                            <img v-if="shopForm.imageUrl" :src="shopForm.imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="商铺地址" prop="address" size="medium">
                        <!--<el-input v-model="shopForm.address"></el-input>-->
                        <el-autocomplete
                            style="width:100%;"
                            v-model="shopForm.address"
                            :fetch-suggestions="querySearchAsync"
                            placeholder="请输入内容"
                            @select="handleSelect"
                        ></el-autocomplete>
                    </el-form-item>
                    <el-form-item label="商铺电话" prop="address">
                        <el-input v-model="shopForm.contact"></el-input>
                    </el-form-item>
                    <el-form-item label="商铺介绍" prop="desc">
                        <quill-editor ref="quillEditor"></quill-editor>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updateShop('shopForm')">提交修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import headTop from '../components/headTop';
    import {baseUrl, baseImgPath} from '@/config/env';
    // 富文本
    import quillEditor from '@/components/quillEditor';
    import {getShop, updateShop, suggestAddress} from '@/api/getData'
    import ElForm from "element-ui/packages/form/src/form";
    import ElFormItem from "element-ui/packages/form/src/form-item";
    import ElButton from "element-ui/packages/button/src/button";

    export default {
        data() {
            return {
                baseUrl,
                baseImgPath,
                shopForm: {
                    name: null,
                    imageUrl: null,
                    address: null,
                    contact: null,
                    desc: null,
                    lat:null,
                    lng:null,
                },
                shopFormRule: {
                    name: [{required: true, message: '必须填写商店名称', trigger: 'blur'}],
                    address: [{required: true, message: '必须填写商店地址', trigger: 'blur'}],
                    contact: [{required: true, message: '请输入商铺联系电话', trigger: 'blur'}],
                    imageUrl: [{required: true, message: '请上传头像', trigger: 'blur'}]
                },
            }
        },
        created() {
            this.initData();
        },
        components: {
            ElButton,
            ElFormItem,
            ElForm,
            headTop,
            quillEditor,
        },
        methods: {
            async initData() {
                try {
                    // this.city = await cityGuess();
                    const res = await getShop();
                    if (res.status == 1) {
                        this.shopForm.name = res.shop.shopName;
                        this.shopForm.address = res.shop.shopAddress;
                        this.shopForm.imageUrl = res.shop.shopImgUrl;
                        this.shopForm.contact = res.shop.shopPhoneNum;
                        this.shopForm.lat = res.shop.lat;
                        this.shopForm.lng = res.shop.lng;
                        this.$refs.quillEditor.content = res.shop.shopIntroduce;
                    } else {
                        throw new Error('获取数据失败');
                    }
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            updateShop(shopForm) {
                this.$refs[shopForm].validate(async (valid) => {
                    if (valid) {
                        if (!this.shopForm.imageUrl) {
                            this.$message.error({
                                message: '商品没有主图',
                            });
                            return;
                        }
                        var form = JSON.parse(JSON.stringify(this.shopForm));
                        form.desc = this.$refs.quillEditor.content;
                        try {
                            const result = await updateShop(form);
                            if (result.status == 1) {
                                console.log(result);
                                this.$message({
                                    type: 'success',
                                    message: '修改成功'
                                });
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: result.message
                                });
                            }
                        } catch (err) {
                            console.log(err)
                        }

                    }
                });
            },
            handleSuccess(res, file) {
                if (res.status == 1) {
                    this.shopForm.imageUrl = res.imageUrl;
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
            async querySearchAsync(queryString, cb) {
                const res = await suggestAddress({searchKey: queryString});
                console.log(res);
                if (res.status == 0) {
                    var temp = [];
                    res.data.forEach((item)=>{
                        temp.push({
                            value:item.address,
                            lat:item.location.lat,
                            lng:item.location.lng,
                            name:item.title,
                        });
                    });
                    cb(temp);
                }
            },
            handleSelect(select){
                // console.log(select);
                this.shopForm.lat = select.lat;
                this.shopForm.lng = select.lng;
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
