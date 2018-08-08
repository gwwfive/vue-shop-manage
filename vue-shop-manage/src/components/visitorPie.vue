<template>
    <div class="visitorpie">
        <div id="visitor" class="" :style="style" ></div>
    </div>
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    // 引入柱状图
    import 'echarts/lib/chart/pie';
    // import 'echarts/lib/chart/map';
    import 'echarts/map/js/china.js';
    import 'echarts/theme/shine.js';
    // import 'echarts/lib/component/title';
    // import 'echarts/lib/component/legend';

    export default {
        data(){
            return{
                style:{
                    width:'100%',
                    height:document.body.clientHeight-200+'px',
                },
            }
        },
        mounted() {
            this.myChart = echarts.init(document.getElementById('visitor'),'shine');
            this.initData();
        },
        props: ['provinceData','maxNum'],
        methods: {
            initData() {
                this.style={
                    width:'100%',
                    height:document.body.clientHeight-200+'px',
                };
                const option = {
                    title: {
                        text: '全国用户分布（个）',
                        // subtext: '数据来自国家统计局'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        x: 'right',
                        selectedMode: false,
                        data: ['北京', '上海', '广东']
                    },
                    dataRange: {
                        orient: 'horizontal',
                        min: 0,
                        max: this.maxNum,
                        text: ['高', '低'],           // 文本，默认为数值文本
                        splitNumber: 0
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        x: 'right',
                        y: 'center',
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false}
                        }
                    },
                    series: [
                        {
                            name: '全国用户分布',
                            type: 'map',
                            mapType: 'china',
                            mapLocation: {
                                x: 'left'
                            },
                            zoom:1,
                            selectedMode: 'multiple',
                            itemStyle: {
                                normal: {label: {show: true}},
                                emphasis: {label: {show: true}}
                            },
                            data: this.provinceData,
                        },

                    ],
                    animation: false
                };
                this.myChart.setOption(option);
            }
        },
        watch: {
            provinceData: function () {
                this.initData()
            }
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .visitorpie {
        display: flex;
        justify-content: center;
        /*margin-top: 20px;*/
        height: 100%;
        width: 100%;
        padding: 20px;
    }
</style>
