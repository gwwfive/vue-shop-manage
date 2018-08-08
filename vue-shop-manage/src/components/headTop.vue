<template>
    <div class="header_container">

        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-badge v-if="newOrdersCount>0" :value="newOrdersCount" :max="99" class="item">
            <el-button size="small" @click="handleGoToOrder(0)">新订单</el-button>
        </el-badge>
        <el-badge v-if="newAgentApply>0" :value="newAgentApply" :max="99" class="item">
            <el-button size="small" @click="handleGoToAgent(0)">新代理申请</el-button>
        </el-badge>
        <el-badge v-if="newCashApply>0" :value="newCashApply" :max="99" class="item">
            <el-button size="small" @click="handleGoToAgent(3)">新提现申请</el-button>
        </el-badge>

        <el-dropdown @command="handleCommand" menu-align='start'>
            <img :src="baseImgPath + adminInfo.avatarUrl" class="avator">
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="home">首页</el-dropdown-item>
                <el-dropdown-item command="singout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    import {signout} from '@/api/getData'
    import {baseImgPath, baseUrl} from '@/config/env'
    import {mapActions, mapState} from 'vuex'

    export default {
        data() {
            return {
                baseImgPath,
                isActive: false,
            }
        },
        created() {
            if (!this.adminInfo.id) {
                this.getAdminData()
            }
        },
        computed: {
            ...mapState(['adminInfo', 'newOrdersCount', 'newAgentApply', 'newCashApply']),
        },
        methods: {
            ...mapActions(['getAdminData', 'getOrderCount', 'getAgentApplyCount', 'getCashApplyCount']),
            // ...mapActions(['setDefaultAdminInfo']),
            async handleCommand(command) {
                if (command == 'home') {
                    this.$router.push('/manage');
                } else if (command == 'singout') {
                    const res = await signout();
                    if (res.status == 1) {
                        // var that = this;
                        // this.setDefaultAdminInfo(function () {
                        //     console.log('退出成功');
                        // });
                        // this.setDefaultAdminInfo();
                        this.$message({
                            type: 'success',
                            message: '退出成功'
                        });
                        this.$router.push('/');
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                }
            },
            async getNotify() {
                var that = this;
                setTimeout(function () {
                    that.getOrderCount();
                    that.getAgentApplyCount();
                    that.getCashApplyCount();
                    console.log('新订单');
                    if (that.isActive) {
                        that.getNotify();

                    }
                }, 300000);//一分钟一次
            },
            handleGoToOrder(index) {
                this.$router.push({path: 'orderList', query: {index: index}});
            },
            handleGoToAgent(index) {
                this.$router.push({path: 'agentManage', query: {index: index}});
            },
        },
        activated() {
            console.log('headTop激活了');
            this.isActive = true;
            this.getNotify();
        },
        deactivated() {
            console.log('headTop休眠了');
            this.isActive = false;
        },

    }
</script>

<style lang="less">
    @import '../style/mixin';

    .header_container {
        background-color: #EFF2F7;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;
    }

    .avator {
        .wh(36px, 36px);
        border-radius: 50%;
        margin-right: 37px;
    }

    .el-dropdown-menu__item {
        text-align: center;
    }
</style>
