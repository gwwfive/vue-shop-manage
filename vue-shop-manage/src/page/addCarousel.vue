<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
            <el-col :span="14" :offset="5">
                <el-form :model="carouselForm" label-width="110px" ref="carouselForm">
                    <el-form-item label="主页轮播图">
                        <el-upload
                            name="img"
                            multiple
                            :limit="6"
                            :action="baseUrl + '/v1/upload/image/'"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :file-list="carouselForm.carousel"
                            :on-change="handleChange"
                            :on-exceed="handleExceed"
                            :before-remove="beforeRemove"
                            :before-upload="handleBefore">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updateCarousel('carouselForm')">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import headTop from '@/components/headTop';
    import {baseUrl, baseImgPath} from '@/config/env';
    import {getCarousel, updateCarousel} from '@/api/getData';

    export default {
        data() {
            return {
                baseUrl,
                baseImgPath,
                carouselForm: {
                    carousel: []
                },
                dialogImageUrl: '',
                dialogVisible: false,
                // adminFormRule: {
                //     passWord: [{required: true, message: '请输入账号', trigger: 'blur'}],
                //     accountName: [{required: true, message: '请输入密码', trigger: 'blur'}],
                //     isRoot: [{required: true, message: '请选择类型', trigger: 'blur'}]
                // }
            }
        },
        created() {
            this.initData();
        },

        components: {
            headTop,
        },
        methods: {
            async initData() {
                try {
                    const res = await getCarousel();
                    if (res.status == 1) {
                        res.carousels.forEach((item) => {
                            this.carouselForm.carousel.push({'url': item.url})
                        });
                    }
                } catch (err) {
                    console.log(err)
                }
            },

            updateCarousel(carouselForm) {
                this.$refs[carouselForm].validate(async (valid) => {
                    if (valid) {
                        if (this.carouselForm.carousel.length == 0) {
                            this.$message.error({
                                message: '没有图片！',
                            });
                            return;
                        }
                        var carousels = [];
                        this.carouselForm.carousel.forEach(function (item, index, list) {
                            console.log(item);
                            if (item.status == 'success') {
                                if (item.response) {
                                    carousels.push(item.response.imageUrl)
                                } else {
                                    carousels.push(item.url)
                                }
                            }
                        });
                        const res = await updateCarousel({carousels: carousels});
                        if (res.status == 1) {
                            this.$message({
                                type: 'success',
                                message: '添加成功'
                            });
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.message || '添加失败',
                            });
                        }
                    }
                });
            },
            handleBefore(file) {
                const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;
                // const limit = this.carouselForm.carousel.length > 6;
                if (!isRightType) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isRightType && isLt2M;
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            handleRemove(file, fileList) {
                this.carouselForm.carousel = fileList;
            },
            handleExceed(files, fileList) {
                this.$message.warning(`最多只能添加 6 张图片`);
            },

            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            uploadError() {
                this.carouselForm.uploadState = true;
            },
            handleChange(file, fileList) {
                this.carouselForm.carousel = fileList;
            },
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
