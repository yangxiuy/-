var echartsExamples = echartsExamples || {};
echartsExamples = {
    init: function () {
        var _this = this;
        _this.twoLineBar();
        _this.line();
        _this.backBar();
        _this.twoBar();
        _this.guage();
        _this.oneRings();
        _this.twoRings();
        _this.map();
        _this.radar();
    },
    /*
    双折柱
    */
    twoLineBar: function () {
        var myChart = echarts.init(document.getElementById('twoLineBar'));
        var option = {
            tooltip: {//提示框组件
                trigger: 'axis',//坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。只有设置了这个参数才会出现竖直的线条
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效，默认为直线，可选为：'line' | 'shadow'
                    type: 'line'        //指示器类型。
                },
                formatter: function (params) {//提示框自定义
                    return formatterTip(params);
                },
            },
            top: "10",
            xAxis: [
                {
                    type: 'category',
                    data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                    splitLine: {show: false},//去除网格线
                    axisLabel: {
                        show: true,
                        interval: 0,
                        textStyle: {
                            color: '#0498ff', //文字颜色
                            fontSize: "14"
                        },
                    },
                    axisLine: {   //x轴、y轴的深色轴线，如图2
                        show: true,
                        interval: "5",
                        lineStyle: {
                            color: "#0078C4",  //边框颜色

                        },

                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: "#fff", //两条轴线之间的背景色
                        },
                    }

                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '',
                    min: 0,
                    max: 50,
                    interval: 10, //y轴间距
                    splitLine: {show: false},//去除网格线
                    axisLabel: {
                        show: true,
                        interval: 0,
                        textStyle: {
                            color: '#0498ff', //文字颜色
                            fontSize: "14"
                        }
                    },
                    axisLine: {   //x轴、y轴的深色轴线
                        show: true,
                        lineStyle: {
                            color: "#0078C4", //边框颜色
                        }
                    },


                }
            ],
            series: [
                {
                    name: '一般隐患',
                    type: 'bar',
                    /*设置柱状图颜色*/
                    tooltip: false,
                    barWidth: 10,      // 控制柱子的宽度
                    itemStyle: {
                        normal: {
                            color: "#0498ff",
                            barBorderRadius: [5, 5, 0, 0], 	    //柱状图的圆角尺寸
                        }
                    },
                    data: [10, 2, 30, 5, 6, 20, 10, 2, 30, 5, 6, 20],
                },
                {
                    name: '重大隐患',
                    type: 'bar',
                    barWidth: 10,      // 控制柱子的宽度
                    barGap: '50%',     // 控制柱子的间隔
                    /*设置柱状图颜色*/
                    itemStyle: {
                        normal: {
                            color: "#f17949",
                            barBorderRadius: [5, 5, 0, 0], 	    //柱状图的圆角尺寸
                        }
                    },
                    data: [2, 1, 3, 5, 6, 8, 2, 12, 3, 5, 6, 8]
                },
                {
                    name: '一般隐患',
                    type: 'line',
                    symbolSize: 0,     //设置圆点大小
                    itemStyle: {
                        /*设置折线颜色*/
                        normal: {
                            color: '#0498ff'
                        }
                    },
                    data: [10, 2, 30, 5, 6, 20, 10, 2, 30, 5, 6, 20],
                }, {
                    name: '重大隐患',
                    type: 'line',
                    symbolSize: 0,     //设置圆点大小
                    itemStyle: {
                        /*设置折线颜色*/
                        normal: {
                            color: '#f17949'
                        }
                    },
                    data: [2, 1, 3, 5, 6, 8, 2, 12, 3, 5, 6, 8]
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

        //自定义提示框
        function formatterTip(params) {
            //移除重复的数据
            for (var i = 0; i < params.length; i++) {
                for (var j = params.length - 1; j > i; j--) {
                    if (params[j].data == params[i].data) {
                        params.splice(j, 1);
                        break;
                    }
                }
            }
            var tip = '';
            for (var i = 0; i < params.length; i++) {//这里是自己定义样式， params[i].marker 表示是否显示左边的那个小圆圈
                if (params[i].value != 0) {
                    tip = tip + params[i].marker + params[i].seriesName + ':' + params[i].value + '<br/>';
                }
            }

            return tip;
        }
    },
    /*
    折线图
     */
    line:function () {
        var myChart = echarts.init(document.getElementById('line'));
        var option = {
            title: {
                text: '单位：个',
                textStyle: {
                    color: '#6C6C6D',  //文字颜色
                    fontStyle: 'normal',   //字体风格,'normal','italic','oblique'
                    fontWeight: 'normal',  //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                    // fontFamily:'sans-serif',   //字体系列
                    fontSize: 14  //字体大小
                }
            },
            tooltip: {trigger: 'item'},  //悬浮显示数据
            grid: {
                top: '20%',
                left: '4%',
                right: '4%',
                bottom: '4%',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月'],

                axisLabel: {
                    show: true,
                    interval: 0,
                    textStyle: {
                        color: '#6C6C6D', //文字颜色
                        fontSize: "10px"
                    }
                },
                axisLine: {   //x轴、y轴的深色轴线，如图2
                    show: true,
                    lineStyle: {
                        color: "#81DBF6", //边框颜色
                    }
                },
            },
            yAxis: {
                min: 0,
                max: 100,
                splitNumber: 10,  //网格间隔的值
                type: 'value',
                splitLine: {
                    show: true,
                    //  改变轴线颜色
                    lineStyle: {
                        // 使用深浅的间隔色
                        color: ['#CEF1FB']
                    }
                },
                axisLabel: {
                    show: true,
                    interval: 0,
                    textStyle: {
                        color: '#6C6C6D', //文字颜色
                        fontSize: "10px"
                    }
                },
                axisLine: {   //x轴、y轴的深色轴线，如图2
                    show: true,
                    lineStyle: {
                        color: "#81DBF6", //边框颜色
                    }
                },
            },
            series: [{
                data: [80, 50, 40, 10, 60, 91, 80],
                type: 'line',
                smooth: true,       //true 为平滑曲线，false为直线
                symbolSize: 8,     //设置圆点大小
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#1897F6'},
                                {offset: 0.5, color: '#AAC9E8'},
                                {offset: 1, color: '#D9C4C4'}
                            ]
                        )
                    },
                },
                itemStyle: {
                    normal: {
                        color: "#1897F6",  //折线圆点的颜色
                        lineStyle: {
                            color: '#1897F6'  //折线的颜色
                        }
                    }
                },
            }]
        };
        myChart.setOption(option, window.onresize = myChart.resize);
    },
    /*
   堆叠柱状图
    */
    backBar:function () {
        var yData = [10, 20, 9, 8, 7, 6, 5, 4, 3, 2, 1, 22], max = 30,
            xData = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            jianData = [];
        for (var i = 0; i < yData.length; i++) {
            jianData.push(max - yData[i]);
        }
        var myChart = echarts.init(document.getElementById("backBar"));
        option = {
            tooltip: {//提示框组件
                trigger: 'axis',//坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。只有设置了这个参数才会出现竖直的线条
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效，默认为直线，可选为：'line' | 'shadow'
                    type: 'line'        //指示器类型。
                },
                formatter: function (params) {//提示框自定义
                    return formatterTip(params);
                },
            },
            legend: false,
            grid: {
                top: "5%",
                left: 0,
                right: 0,
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: xData,
                    axisLabel: {
                        show: true,
                        interval: 0,
                        rotate: 50,
                        textStyle: {
                            color: '#4bacff', //文字颜色
                            fontSize: "13"
                        },
                        // backgroundColor:"red"  //改变刻度值的背景色
                    },
                    splitLine: {show: false},//去除网格线
                    axisLine: false,

                }
            ],
            yAxis: [
                {
                    type: 'value',
                    min: 0,
                    max: max,
                    // interval: 10, //y轴间距
                    splitLine: {show: false},//去除网格线
                    axisLine: false,

                }
            ],
            series: [

                {
                    name: '企业数',
                    type: 'bar',
                    stack: '广告',
                    data: yData,
                    barWidth: 12,
                    itemStyle: {
                        normal: {
                            color: "#02d7fd"
                            // color:function (params) {
                            //     var colorList = [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            //         offset: 0,
                            //         color: '#00e6ff'
                            //     },
                            //         {
                            //         offset: 1,
                            //         color: '#018dff'
                            //     }]),new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            //         offset: 0,
                            //         color: '#00fcae'
                            //     },
                            //         {
                            //         offset: 1,
                            //         color: '#006388'
                            //     }])];
                            //     return colorList[params.dataIndex];
                            // },
                        }
                    },
                },
                {
                    name: '企业数',
                    type: 'bar',
                    stack: '广告',
                    data: jianData,
                    barWidth: 12,
                    itemStyle: {
                        normal: {
                            color: "gray",
                        }
                    },
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    },
    /*
   双柱（x轴换行,下载图表）
    */
    twoBar:function () {

        var myChart = echarts.init(document.getElementById('twoBar'));
        // 指定图表的配置项和数据
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                top: '4%',
                left: '2%',
                right: '10%',
                bottom: '2%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['2019/2/1-2019/2/7', '2019/2/1-2019/2/7', '2019/2/1-2019/2/7', '2019/2/1-2019/2/7', '2019/2/1-2019/2/7', '2019/2/1-2019/2/7'],
                    axisLabel: {
                        show: true,
                        interval: 0,
                        formatter: function (params) {
                            var newParamsName = "",
                                paramsNameNumber = params.length,
                                provideNumber = 9,  // 每行能显示的字的个数
                                rowNumber = Math.ceil(paramsNameNumber / provideNumber);  // 换行的话，需要显示几行，向上取整
                            //判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                            if (paramsNameNumber > provideNumber) {
                                //循环每一行,p表示行
                                for (var p = 0; p < rowNumber; p++) {
                                    var tempStr = "",  // 表示每一次截取的字符串
                                        start = p * provideNumber,  // 开始截取的位置
                                        end = start + provideNumber;  // 结束截取的位置
                                    // 此处特殊处理最后一行的索引值
                                    if (p == rowNumber - 1) {
                                        // 最后一次不换行
                                        tempStr = params.substring(start, paramsNameNumber);
                                    } else {
                                        // 每一次拼接字符串并换行
                                        tempStr = params.substring(start, end) + "\n";
                                    }
                                    newParamsName += tempStr;  // 最终拼成的字符串
                                }

                            } else {
                                newParamsName = params;   // 将旧标签的值赋给新标签
                            }
                            return newParamsName;  //将最终的字符串返回
                        },
                        textStyle: {
                            color: '#6861a6', //文字颜色
                            fontSize: "10px",
                        },
                    }
                }
            ],
            toolbox: {
                feature: {
                    saveAsImage: {
                        show: true,
                        title: "导出"
                    }
                },
                itemSize: 30,
            },
            yAxis: [
                {
                    min: 0,
                    max: 20,
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '已整改',
                    type: 'bar',
                    barWidth: '30%',
                    stack: '广告',
                    itemStyle: {
                        normal: {color: '#4680FE'}
                    },
                    data: [1, 2, 3, 4, 5, 6]
                },
                {
                    name: '未整改',
                    type: 'bar',
                    barWidth: '30%',
                    stack: '广告',
                    itemStyle: {
                        normal: {color: '#E59252'}
                    },
                    data: [2, 4, 5, 6, 7, 8]
                    // data:[1,3,4,5,5]
                },
            ]
        };
        // 使用刚指定的配置项和数据显示图表。2019
        myChart.setOption(option);
        $(window).resize(function () {
            myChart.resize();
        });
        //柱状图有数据是，点击柱状图，透视
        myChart.on("click", function (params) {
            // 当componentType == "xAxis"或者 ==“yAxisx”时，取被点击时坐标轴的值params.value
            // alert("单击了"+params.componentType+"x轴标签"+params.value);
            if (params.componentType == "xAxis") {
                console.log("单击了" + params.value + "x轴标签");
            } else if (params.componentType == "yAxis") {
                console.log("单击了" + params.value + "y轴标签");
            } else {
                console.log("单击了" + params.name + "柱状图" + params.value);
            }
        });

        function formatterTip(params) {
            //移除重复的数据
            for (var i = 0; i < params.length; i++) {
                for (var j = params.length - 1; j > i; j--) {
                    if (params[j].name == params[i].name) {
                        params.splice(j, 1);
                        break;
                    }
                }
            }
            var tip = '';
            for (var i = 0; i < params.length; i++) {//这里是自己定义样式， params[i].marker 表示是否显示左边的那个小圆圈
                if (params[i].value != 0) {
                    tip = tip + params[i].marker + params[i].seriesName + ':' + params[i].value + '<br/>';
                }
            }

            return tip;
        }
    },
    /*
    仪表盘（三个半环）
     */
    guage:function () {
        var myChart = echarts.init(document.getElementById("guage"));
        var option = {
            grid: {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            },
            //悬浮框
            tooltip: {
//                trigger: 'itme',
                formatter: "{a}{c}"
            },
            series: [
                {
                    type: "gauge",
                    center: ["50%", "45%"], // 仪表位置
                    radius: "25%", //仪表大小
                    startAngle: 180, //开始角度
                    endAngle: -60,  //结束角度
                    axisLine: {
                        show: false,
                        lineStyle: { // 属性lineStyle控制线条样式
                            color: [


//                                [[0.2, '#4DFC72'], [0.6, '#E8F914'], [0.8, '#F8A706'], [1, '#FA1404']]
                                [0.008, new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 1,
                                    color: "#4DFC72" // 50% 处的颜色
                                }], false)], // 100% 处的颜色
                                [0.08, new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 1,
                                    color: "#E8F914" // 70% 处的颜色
                                }], false)],
                                [0.672, new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 1,
                                    color: "#F8A706" // 90% 处的颜色
                                }], false)],
                                [1, new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0.2,
                                    color: "#FA1404" // 92% 处的颜色
                                }], false)]
                            ],
                            width: 6
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    // pointer : { //指针样式
                    //     length: '45%'
                    // },
                    detail: {
                        show: false
                    }
                },
                //中半圆
                {
                    type: "gauge",
                    center: ["50%", "45%"], // 默认全局居中
                    radius: "50%",
                    startAngle: 180,
                    endAngle: -60,
                    splitNumber: 4, //刻度数量
                    axisLine: {
                        show: true,
                        length: 10,
                        lineStyle: { // 属性lineStyle控制线条样式
                            color: [ //表盘颜色
                                [0.03, new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0.01,
                                    color: "#3CFD84" // 50% 处的颜色
                                }, {
                                    offset: 0.02,
                                    color: "#56FD7D" // 40% 处的颜色
                                }], false)], // 100% 处的颜色
                                [0.1, new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0.03,
                                    color: "#C4FD4E" // 70% 处的颜色
                                }, {
                                    offset: 0.04,
                                    color: "#FBF739" // 66% 处的颜色
                                }, {
                                    offset: 0.05,
                                    color: "#FAF414" // 50% 处的颜色
                                }], false)],
                                [0.672, new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0.3,
                                    color: "#FAAE0A" // 90% 处的颜色
                                }, {
                                    offset: 0.4,
                                    color: "#FA760B" // 86% 处的颜色
                                }, {
                                    offset: 0.5,
                                    color: "#FA600F" // 70% 处的颜色
                                }], false)],
                                [1, new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0.8,
                                    color: "#FB622D" // 92% 处的颜色
                                }, {
                                    offset: 0.9,
                                    color: "#FA1805" // 90% 处的颜色
                                }], false)]
                            ],
                            width: 10//表盘宽度
                        }
                    },
                    splitLine: { //分割线样式（及10、20等长线样式）
                        length: 30,
                        lineStyle: { // 属性lineStyle控制线条样式
                            width: 8,
                            color: "white"

                        }
                    },
                    axisTick: { //刻度线样式（及短线样式）
                        length: 30,
                        lineStyle: { // 属性lineStyle控制线条样式
                            width: 8,
                            color: "white",
                        }
                    },
                    axisLabel: {
                        show: false
                    },
                    // pointer : { //指针样式
                    //     length: '45%'
                    // },
                    detail: {
                        show: false
                    }
                }, {
                    type: "gauge",
                    name: "风险值",
                    center: ["50%", "45%"], // 默认全局居中
                    radius: "80%",
                    startAngle: 180,
                    endAngle: -60,
                    splitNumber: 16, //刻度数量
//                    z: 33,
                    min: 0,
                    max: 30,
                    axisLine: {
                        show: true,
                        lineStyle: { // 属性lineStyle控制线条样式
                            color: [ //表盘颜色
                                [1, "white"],//0-50%处的颜色  指针和刻度背景的颜色
                            ],
                            opacity: 1,
                            width: 12,//表盘宽度

                        }
                    },
                    pointer: {  //指针样式
                        width: 3, //指针的粗细
                        length: "110%",
                    },
                    //仪表盘指针样式
                    itemStyle: {
                        normal: {
                            color: "#04FDE2",  //指针颜色，默认取数值所在的区间的颜色

                        }
                    },
                    //高亮的仪表盘指针样式
                    emphasis: {
                        itemStyle: {
                            color: "#ff0000",
                            opacity: 1
                        }

                    },

                    splitLine: { //长线样式
                        length: 16,
                        lineStyle: { // 属性lineStyle控制线条样式
                            width: 4,
                            color: "#87C9FB",
                        }
                    },
                    axisTick: { //短线样式
                        length: 10,

                        lineStyle: { // 属性lineStyle控制线条样式
                            width: 2,
                            color: "#87C9F",
                        }
                    },
                    axisLabel: { //文字样式（及“10”、“20”等文字样式）
                        show: true,  //数值不显示false
                        color: "red",
                        // distance : 5 //文字离表盘的距离
                    },
                    data: [{
                        value: 2,   //当前指示的值
                        label: {
                            textStyle: {
                                fontSize: 6,
                                color: "white"
                            }
                        }
                    }]
                }
            ]
        };
        myChart.setOption(option, window.onresize = myChart.resize);
    },
    /*
    单环，进度/占比
     */
    oneRings:function () {
        var e = 60;
        var myCharts = echarts.init(document.getElementById('oneRings'));
        option = {
            color: ["#90d4f8", "pink"],
            title: {
                show: true,
                text: e + '%',
                x: 'center',
                y: 'center',
                textStyle: {
                    fontSize: '15',
                    color: 'black',  //中间字体颜色
                    fontWeight: 'normal'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{d}%",
                show: true
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                show: false
            },
            series:
                {
                    name: '',
                    type: 'pie',
                    radius: ['65%', '85%'],
                    avoidLabelOverlap: true,
                    hoverAnimation: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        {value: e, name: ''},
                        {value: 100 - e, name: ''}
                    ]
                },

        };
        myCharts.setOption(option);
    },
    /*
    双环，占比
     */
    twoRings:function () {
        var values1 = 90, values2 = 95;
        var huanCharts = echarts.init(document.getElementById('twoRings'));
        option = {

            graphic: [
                {
                    type: "text",
                    left: "center",
                    top: "50%",
                    style: {
                        text: values1,
                        textAlign: "center",
                        fill: "#6D8EBB",   //中间数值的颜色
                        width: 30,
                        height: 30,
                        font: "22px Microsoft YaHei"
                    }
                },
                {
                    type: "text",
                    left: "center",
                    top: "40%",
                    style: {
                        text: "已完成",
                        textAlign: "center",
                        fill: "#6D8EBB",
                        width: 30,
                        height: 30
                    }
                }
            ],
            series: [
                {
                    type: "pie",
                    radius: ["70%", "80%"], //内外半径
                    itemStyle: {
                        normal: {
                            //默认样式
                            label: {
                                //饼图的标签（此处不显示）
                                show: false
                            },
                            labelLine: {
                                //标签的引导线（此处不显示）
                                show: false
                            },
                            shadowBlur: 0, //阴影模糊度
                            shadowColor: "black" //圆环的阴影色彩
                        }
                    }, //图形样式（不要标签和牵引线）
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: false
                        }
                    },

                    hoverAnimation: false, //------（鼠标悬浮拉长动画，true当鼠标悬浮，边框会变长）
                    data: [
                        {
                            //高亮部分
                            value: values1, //高亮占比
                            label: {
                                //给高亮设置文本标签
                                normal: {
                                    formatter: "{c}", //此处的formatter是模板字符串，abcd在不同类型图表是不同含义，d在pie中表示百分比
                                    position: "center", //标签居中
                                    top: 0,
                                    show: false, //显示标签
                                    textStyle: {
                                        //文字样式
                                        fontSize: "20",
                                        fontWeight: "normal",
                                        color: "#6D8EBB"
                                    }
                                }
                            },
                            itemStyle: {
                                //给高亮设置边框图形样式（颜色 阴影颜色 阴影范围）
                                normal: {
                                    color: "#009BFB",
                                    // shadowColor: 'red',
                                    shadowBlur: 10
                                }
                            },
                            hoverAnimation: false //单独给高亮设置鼠标悬浮的动画
                        },
                        {
                            //阴影部分
                            value: 100 - values1, //阴影占比 = 总 - 高亮
                            // name: 'invisible', //阴影部分的名字
                            itemStyle: {
                                normal: {
                                    //默认样式
                                    color: "#ADC5E3", // 未完成的圆环的颜色
                                    label: {
                                        //不要标签和标签牵引线
                                        show: false
                                    },
                                    labelLine: {
                                        show: false
                                    }
                                }
                            }
                        }
                    ]
                }, {
                    type: "pie",
                    radius: ["30%", "40%"], //内外半径
                    itemStyle: {
                        normal: {
                            //默认样式
                            label: {
                                //饼图的标签（此处不显示）
                                show: false
                            },
                            labelLine: {
                                //标签的引导线（此处不显示）
                                show: false
                            },
                            shadowBlur: 0, //阴影模糊度
                            shadowColor: "black" //圆环的阴影色彩
                        }
                    }, //图形样式（不要标签和牵引线）

                    hoverAnimation: false, //------（鼠标悬浮拉长动画，true当鼠标悬浮，边框会变长）
                    data: [
                        {
                            //高亮部分
                            value: values2, //高亮占比
                            label: {
                                //给高亮设置文本标签
                                normal: {
                                    formatter: "{c}", //此处的formatter是模板字符串，abcd在不同类型图表是不同含义，d在pie中表示百分比
                                    position: "center", //标签居中
                                    top: 0,
                                    show: false, //显示标签
                                    textStyle: {
                                        //文字样式
                                        fontSize: "20",
                                        fontWeight: "normal",
                                        color: "#6D8EBB"
                                    }
                                }
                            },
                            itemStyle: {
                                //给高亮设置边框图形样式（颜色 阴影颜色 阴影范围）
                                normal: {
                                    color: "#009BFB",
                                    // shadowColor: 'red',
                                    shadowBlur: 10
                                }
                            },
                            hoverAnimation: false //单独给高亮设置鼠标悬浮的动画
                        },
                        {
                            //阴影部分
                            value: 100 - values2, //阴影占比 = 总 - 高亮
                            // name: 'invisible', //阴影部分的名字
                            itemStyle: {
                                normal: {
                                    //默认样式
                                    color: "#ADC5E3", // 未完成的圆环的颜色
                                    label: {
                                        //不要标签和标签牵引线
                                        show: false
                                    },
                                    labelLine: {
                                        show: false
                                    }
                                }
                            }
                        }
                    ]
                }
            ]
        }
        huanCharts.setOption(option);
    },
    /*
   地图
    */
    map:function () {
        //地图容器
        var chart = echarts.init(document.getElementById('map'));
        var mapdata = [];
        //绘制地图
        $.getJSON('320300.json', function (data) {
            d = [];
            for (var i = 0; i < data.features.length; i++) {
                d.push({
                    name: data.features[i].properties.name
                })
            }
            mapdata = d;
            //注册地图
            echarts.registerMap('yongzhou', data);
            //绘制地图
            renderMap('yongzhou', d);
        });


        //初始化绘制永州地图配置
        var option = {
            // backgroundColor: '#000',    //地图的背景色

            title: {
                show: false
            },
            tooltip: {   //悬浮时文字的颜色
                trigger: 'item',
                formatter: '{b}',
                textStyle: {
                    color: '#159884', //地图上文字的颜色
                    fontSize: 15,
                    fontWeight: "bold",
                    textShadowColor: "#0A6B99",
                    textShadowBlur: "2px"

                },
            },
        };

        function renderMap(map, data) {
            // option.title.subtext = map;
            option.series = [
                {
                    name: map,
                    type: 'map',
                    mapType: map,
                    roam: false,
                    zoom: 1.1,   //地图的大小 缩放比例
                    nameMap: {
                        'china': '中国'
                    },
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                color: '#4FEAA6', //地图上文字的颜色
                                fontSize: 15,
                                fontWeight: "bold",
                                textShadowColor: "#0A6B99",
                                textShadowBlur: 2
                            }
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                color: '#fff',
                                fontSize: 13
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: '#0099FF',  //地图的背景色
                            borderColor: '#A2E5FD',
                            borderWidth: 2
                        },
                        emphasis: {
                            areaColor: 'darkorange'
                        }
                    },
                    // emphasis: { //地图内图形的强调样式（悬浮时样式）
                    //     backgroundColor:false
                    // },
                    data: data,

                    markPoint: {    //标记
                        symbol: "image://imgs/huagong.png",
                        symbolSize: 20, //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。

                    }
                }
            ];
            //渲染地图
            chart.setOption(option);
            //点击地图跳转对应模块
            chart.on("click", function (params) {
                console.log(params);

            });

        }
    },
    /*
    雷达图
     */
    radar:function () {
        var myChart = echarts.init(document.getElementById("radar"));
        option = {
            // title: {
            //     text: '基础雷达图'
            // },

            tooltip: {},
            // legend: {
            //     data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
            // },
            radar: {
                // shape: 'circle',
                name: {
                    textStyle: {
                        color: '#45494e',
                        fontSize: "16",

                    },
                    formatter: (text) => {  //超出字体换行显示
                        text = text.replace(/\S{4}/g, function (match) {
                            // console.log(match)
                            return match + '\n'
                        })
                        return text
                    },
                },
                indicator: [
                    {
                        text: "销售",
                        max: 100
                    },
                    {
                        text: "管理",
                        max: 100
                    },
                    {
                        text: "信息技术",
                        max: 100
                    },
                    {
                        text: "市场",
                        max: 100
                    },

                    {
                        text: "研发",
                        max: 100
                    },
                    {
                        text: "换行测试一下",
                        max: 100
                    }
                ],
                //切割区域（通用）
                splitArea: {
                    show: true,
                    // 间隔色彩的设置 可以分割区域
                    areaStyle: {
                        color: ["#EFF0F2", "#F5F6F8"]
                    }
                },
                // 切割区域的线条边
                splitLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        color: "#8D97A3"
                    }
                },
                radius: '60%',  //半径
            },

            series: [
                {
                    //标志图形 此处为none
                    symbol: "none",
                    //图形样式
                    itemStyle: {
                        //默认样式
                        normal: {
                            //填充区域
                            areaStyle: {
                                //区域填充
                                type: "default",
                                color: "#8AA4C5"
                            },
                            //区域填充线
                            lineStyle: {
                                width: 2,
                                color: "rgba(255,255,255,0.2)" //填充区域的边框颜色
                            }
                        }
                    },
                    name: "",
                    type: "radar",
                    //数据  每组数据代表一组线条
                    data: [
                        {
                            value: [60, 70, 80, 90, 20, 10],
                        }


                    ]
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

        //每次重新加载图表
        // $(window).resize(function() {
        //     myChart.resize();
        // });
        // }
    },
};
$(document).ready(function () {
    echartsExamples.init();
});