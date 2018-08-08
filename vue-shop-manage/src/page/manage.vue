<template>
    <div class="manage_page fillcontain">
        <el-row style="height: 100%;">
            <el-col :span="4" style="min-height: 100%; background-color: #324057;">
                <!-- 其中router 表示是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转-->
                <el-menu :default-active="defaultActive" style="min-height: 100%;" background-color="#324057"
                         text-color="#fff"
                         active-text-color="#ffd04b" router>
                    <el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-document"></i>数据管理</template>

                        <!--<el-menu-item index="shopList">商家列表</el-menu-item>-->
                        <el-menu-item index="goodsList">商品列表</el-menu-item>
                        <el-menu-item index="orderList">订单列表</el-menu-item>
                        <el-menu-item index="userList">用户列表</el-menu-item>
                        <el-menu-item index="categoryManage">分类管理</el-menu-item>
                        <el-menu-item index="collageList">拼团管理</el-menu-item>
                        <el-menu-item index="couponManage">优惠券管理</el-menu-item>
                        <el-menu-item index="shopManage">商铺管理</el-menu-item>
                        <el-menu-item index="agentManage">代理管理</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-plus"></i>添加数据</template>
                        <!--<el-menu-item index="addShop">添加商铺</el-menu-item>-->
                        <el-menu-item index="addGoods">添加商品</el-menu-item>
                        <!--<el-menu-item index="addAdmin">添加轮播图</el-menu-item>-->
                        <el-menu-item index="collage">拼团活动</el-menu-item>
                        <el-menu-item index="addCarousel">添加封面</el-menu-item>
                        <el-menu-item index="addCoupon">添加优惠券</el-menu-item>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-star-on"></i>数据分析</template>
                        <el-menu-item index="visitor">用户分布</el-menu-item>
                        <el-menu-item index="history">历史销量</el-menu-item>
                        <!-- <el-menu-item index="newMember">用户数据</el-menu-item> -->
                    </el-submenu>

                    <el-submenu index="5">
                        <template slot="title"><i class="el-icon-setting"></i>设置</template>
                        <!--<el-menu-item index="adminSet">管理员设置</el-menu-item>-->
                        <el-menu-item index="distribution">分销规则设置</el-menu-item>
                         <el-menu-item index="memberSet">会员设置</el-menu-item>
                    </el-submenu>
                    <el-submenu index="6">
                        <template slot="title"><i class="el-icon-warning"></i>说明</template>
                        <el-menu-item index="explain">说明</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
            <el-col :span="20" style="height: 100%;overflow: auto;">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        computed: {
            defaultActive: function () {
                return this.$route.path.replace('/', '');
            }
        },
    }
</script>


<style lang="less" scoped>
    @import '../style/mixin';

    .manage_page {

    }
</style>
