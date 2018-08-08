<template>
    <div class="fillcontain">
        <head-top></head-top>
        <p class="explain_text" style="text-align: center;">后台管理系统</p>
        <p class="explain_text">1.本系统配合小程序使用</p>
        <p class="explain_text">2.本系统除了支持商家的基本功能,还包括分销功能以及会员功能</p>
        <p class="explain_text">3.关于分销功能要注意几点:<br>(1).分销包含两级分销,商家可在 设置-分销规则设置 进行设置各级的分销提成,和各级每一次提成的上限
            <br>(2)建议一级分销不超过10%,二级分销不超过5%.<br>(3)每一次分销所产生的提成都是按照订单的实际付款金额来进行计算的<br>(4)例如A是代理,B是A的一级用户(粉丝),C是A的二级用户(粉丝),若B一次下单购买100元商品,那么A可以获得提成为:
            一级分销提成=一级分销百分比%x订单实际金额<=一级分销金额上限.<br>(5)用户通过提交代理申请等到管理员审核通过后才可以成为代理.<br>(6)代理通过转发小程序等途径让新用户注册,那么用户A就是代理的一级粉丝.若用户A转发给用户B,用户B也注册,那么B就是该代理的二级粉丝.若用户B转发给用户C,那么C也是二级粉丝,以此类推.
        <br>(7)商家不设置此项时,不开启代理功能.若设置了此项,表示开启分销功能.不建议频繁调整分销比例.
        </p>
        <p class="explain_text">4.会员功能:<br>(1)商家可以根据需求设置会员等级,以及相对应的积分和权益.<br>(2)会员等级应该根据积分大小来分级<br>(3)用户可以通过每日签到(+5积分)、购买商品(+20积分)、评价订单(+10积分)三个方式进行获取积分升级以获得更高的会员权益.<br>(4)会员权益只支持用户在购买商品时进行折扣优惠

        </p>
        <p class="explain_text">5.关于商品:(1)添加商品时默认未发布,此时商家还可以更改或删除商品;若上线了商品,则不能删除商品,只能下架或修改商品;<br>(2)修改商品中可以修改每一样库存的状态(上线或者下线)</p>
        <p class="explain_text">6.关于商品分类:(1)未上线的分类可以删除(2)已上线的分类可以下线和修改</p>
    </div>

</template>

<script>
    import headTop from '../components/headTop'

    export default {
        components: {
            headTop,
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .explain_text {
        margin-top: 20px;
        /*text-align: center;*/
        font-size: 20px;
        color: #333;
        padding: 20px;
    }
</style>
