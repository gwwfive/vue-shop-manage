<template>
    <div class="edit_container">
        <quill-editor
            v-model="content"
            ref="myQuillEditor"
            class="editer"
            :options="editorOption"
            @change="onEditorChange()"
        >
        </quill-editor>
    </div>
</template>
<script>
    import {quillEditor, Quill} from 'vue-quill-editor'
    import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
    import {baseUrl} from '@/config/env'
    Quill.register('modules/ImageExtend', ImageExtend);
    export default {
        components: {quillEditor},
        data() {
            return {
                baseUrl,
                content: '',
                // 富文本框参数设置
                editorOption: {
                    modules: {
                        ImageExtend: {
                            loading: true,
                            name: 'img',
                            size: 3,
                            action: '/v1/upload/image/',
                            response: (res) => {
                                console.log('图片上传了');
                                return res.imageUrl
                            },
                            headers: (xhr) => {
                                xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
                            },  // 可选参数 设置请求头部
                            sizeError: () => {
                            },  // 图片超过大小的回调
                            start: () => {
                                console.log('开始上传');
                            },  // 可选参数 自定义开始上传触发事件
                            end: () => {
                            },  // 可选参数 自定义上传结束触发的事件，无论成功或者失败
                            error: () => {
                            },  // 可选参数 上传失败触发的事件
                            success: () => {
                            },  // 可选参数  上传成功触发的事件
                            change: (xhr, formData) => {
                                // console.log('改变了')
                                // xhr.setRequestHeader('myHeader','myValue')
                                // formData.append('token', 'myToken')
                            } // 可选参数
                        },
                        toolbar: {
                            container: container,
                            handlers: {
                                'image': function () {
                                    QuillWatch.emit(this.quill.id)
                                }
                            }
                        }
                    }
                }
            }
        },
        methods: {
            onEditorChange: function () {
                // this.$emit()
                console.log('改变了')
            }
        }
    }
</script>
<style lang="less">
    @import '../style/mixin';

    .edit_container {
        padding: 0px 0px ;
        margin-bottom: 0px;
    }

    .editer {
        /*max-height: 400px;*/
    }

</style>
