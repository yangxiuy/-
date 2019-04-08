var dataDetail = dataDetail || {}, curMenu = null, zTree_Menu = null;
dataDetail = {
    setting: {
        view: {
            showLine: false,
            showIcon: false,
            selectedMulti: false,
            dblClickExpand: false, //双击节点时，是否自动展开父节点的标识
            addDiyDom: addDiyDom
        },
        data: {
            simpleData: {
                enable: true,
                // idKey: "id", // id编号命名 默认
                // pIdKey: "id",// 父id编号命名 默认
                // rootPId: 0 // 用于修正根节点父节点数据，即 pIdKey 指定的属性值
            }
        },
        callback: {
            beforeClick: function (treeId, treeNode) {
                if (treeNode.children.length != 0) {
                    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                    zTree.expandNode(treeNode);
                    var zTree = $.fn.zTree.getZTreeObj("treeDemo");   //获取ztree对象
                    var nodeList = zTree.getNodes();   //获取根节点个数,getNodes获取的是根节点的集合
                    //如果二级菜单没有子菜单，则不显示箭头
                    $.each(treeNode.children, function (key, value) {
                        if (value.children.length === 0) {
                            // $("#" + value.tId + "_switch").addClass("hidden");
                            $("#"+value.tId+"_switch").css("visibility","hidden");
                        }
                    });

                    for (var i = 0; i < nodeList.length; i++) {
                        if (nodeList[i].open) {
                            $(".ztree.showIcon li a span.button.switch").parent().css({"font-size": "17px"});
                            $(".ztree li span.button.noline_close").parent().css({"font-size": "17px"});
                            $(".ztree li a.level0 .noline_open").parent().css({
                                "background-color": "#0692FE",
                                "color": "white",
                            });
                            $(".ztree li a.level0 span").css({"border": "none"});
                        } else {
                            $(".ztree li a.level0 .noline_close").parent().css({
                                "background-color": "#F3F8FB",
                                "color": "gray",
                                "border": "1px solid #E4E4E4"
                            });
                            // $(".ztree li a.level0 span").parent().css({"background-color":"#F3F8FB"});
                        }
                    }
                    return false;
                }
                return true;
            },
            // beforeExpand: zTreeBeforeExpand,
            onClick: function (event, treeId, treeNode) {
                if (treeNode.children.length == 0) {
                    //无法重复添加标签
                    var lis = $(".mainRight-top li").length;
                    if (lis > 0) {
                        var isShow = true;
                        $(".mainRight-top li").each(function (index,value) {
                            $(value).removeClass("addLi-chose");

                            if ($(value).data("nodename") === $(".curSelectedNode").attr("title")) {
                                isShow = false;
                                return false;
                            }
                        });
                        if (isShow == true) {
                            $('<li class="addLi addLi-chose" data-nodename="' + treeNode.name + '">' +
                                '<div class="addLi-txt" data-name="' + treeNode.name + '" title="' + treeNode.name + '" data-src="' +
                                treeNode.link + '">' + treeNode.name + '</div><div class="addLi-close"></div></li>'
                            ).appendTo($(".mainRight-top"));
                            $(".addLi").parent().css("width", $(".mainRight-top li").length * 130 + "px");
                        }
                    } else {
                        $('<li class="addLi addLi-chose" data-nodename="' + treeNode.name + '">' +
                            '<div class="addLi-txt" data-name="' + treeNode.name + '" title="' + treeNode.name + '" data-src="' +
                            treeNode.link + '">' + treeNode.name + '</div><div class="addLi-close"></div> </li>'
                        ).appendTo($(".mainRight-top"));

                        $(".addLi").parent().css("width", $(".mainRight-top li").length * 130 + "px");
                    }

                }
                //iframe地址
                // var srcs = treeNode.link + "?nakedLayout=1";
                // $(".iframeBox").attr("src", srcs);   //修改iframe的地址
                // $(".addLi-txt").click(function (event) {
                //     $(".iframeBox").attr("src", $(event.target).data("src"));
                // });

                //点击关闭标签关闭
                $(".addLi-close").off("click").on("click", function (e) {
                    if (!$(this).parent().is(".addLi-chose")) {   //如果不是选中的状态，直接删除父级
                        $(this).parent().remove();
                    }
                    if ($(this).parent().is(".addLi-chose")) {   //如果是选中的状态，判断是否有前一个兄弟，有就显示前一个，无就显示后一个
                        if ($(this).parent().prev().is(".addLi")) {
                            $(this).parent().prev().addClass("addLi-chose");
                            // $(".iframeBox").attr("src", $(this).parent().prev().children().eq(0).data("src"));
                            var liName = $(this).parent().prev().attr("data-nodename");
                            var zTree = $.fn.zTree.getZTreeObj("treeDemo");//treeDemo界面中加载ztree的div
                            var selectNodes = zTree.getSelectedNodes();  //获取所有选中的节点
                            zTree.cancelSelectedNode();//先取消所有的选中状态
                            var node = zTree.getNodeByParam("name", liName);
                            zTree.selectNode(node, true);//将指定name的节点选中
                            $(this).parent().remove();

                        } else {
                            $(this).parent().next().addClass("addLi-chose");
                            // $(".iframeBox").attr("src", $(this).parent().next().children().eq(0).data("src"));
                            var liName = $(this).parent().next().attr("data-nodename");
                            var zTree = $.fn.zTree.getZTreeObj("treeDemo");//treeDemo界面中加载ztree的div
                            var selectNodes = zTree.getSelectedNodes();  //获取所有选中的节点
                            zTree.cancelSelectedNode();//先取消所有的选中状态
                            var node = zTree.getNodeByParam("name", liName);
                            zTree.selectNode(node, true);//将指定name的节点选中
                            $(this).parent().remove();
                        }
                    }

                    //所有标签关闭后，默认展开第一个
                    if ($(".mainRight-top li").length == 0) {
                        // 设置默认第一级展开
                        var zTree = $.fn.zTree.getZTreeObj("treeDemo");   //获取ztree对象
                        var nodeList = zTree.getNodes();   //获取根节点个数,getNodes获取的是根节点的集合
                        zTree.expandNode(nodeList[0], true);   //展开第一个根节点

                        //默认展开第一个根节点的第一个子节点
                        setTimeout(function () {
                            var firstNode;//获取第一个子节点
                            if (nodeList[0].children[0].children[0]) {
                                firstNode = nodeList[0].children[0].children[0];
                            } else {
                                firstNode = nodeList[0].children[0];
                            }
                            zTree.selectNode(firstNode);//选择点
                            zTree.setting.callback.onClick(null, zTree.setting.treeId, firstNode);//调用事件
                        }, 800);
                    }
                    ;
                });
                //切换标签
                $(".addLi").click(function () {
                    $(this).addClass("addLi-chose").siblings().removeClass("addLi-chose"); //本标签高亮
                    //切换标签，对应的树的子节点高亮
                    var liName = $(this).attr("data-nodename");
                    var zTree = $.fn.zTree.getZTreeObj("treeDemo");//treeDemo界面中加载ztree的div
                    var selectNodes = zTree.getSelectedNodes();  //获取所有选中的节点
                    zTree.cancelSelectedNode();//先取消所有的选中状态
                    var node = zTree.getNodeByParam("name", liName);
                    zTree.selectNode(node, true);//将指定name的节点选中
                });
                //点击关闭所有tab标签
                $(".closeTab").off("click").click(function () {
                    $(".mainRight-top li").remove();
                    //所有标签关闭后，默认展开第一个
                    if ($(".mainRight-top li").length == 0) {
                        // 设置默认第一级展开
                        var zTree = $.fn.zTree.getZTreeObj("treeDemo");   //获取ztree对象
                        var nodeList = zTree.getNodes();   //获取根节点个数,getNodes获取的是根节点的集合
                        zTree.expandNode(nodeList[0], true);   //展开第一个根节点

                        //默认展开第一个根节点的第一个子节点
                        setTimeout(function () {
                            var firstNode;//获取第一个子节点
                            if (nodeList[0].children[0].children[0]) {
                                firstNode = nodeList[0].children[0].children[0];
                            } else {
                                firstNode = nodeList[0].children[0];
                            }
                            zTree.selectNode(firstNode);//选择点
                            zTree.setting.callback.onClick(null, zTree.setting.treeId, firstNode);//调用事件
                        }, 800);
                    };
                });
                return true;
            },
            onNodeCreated: function (event, treeId, treeNode) {
                if (treeNode.parent == 0) {
                    // $(`#${treeNode.tId + "_a"}`).addClass(`fa fa-${treeNode.icon_name}`).css("color", "#688CBD");//添加左侧栏图标项目
                    $('#' + treeNode.tId + "_a").addClass('fa fa-' + treeNode.icon_name).css("color", "#688CBD");//添加左侧栏图标项目
                }
            },

        }
    },
    init: function () {
        var _this = this,
            treeObj = $("#treeDemo"),
            zNodes = _this.getNodes();
        $.fn.zTree.init(treeObj, _this.setting, zNodes);
        zTree_Menu = $.fn.zTree.getZTreeObj("treeDemo");

        curMenu = zTree_Menu.getNodes()[0].children[0];
        zTree_Menu.selectNode(curMenu);

        _this.addJantou();
        _this.moren();
    },
    //获取数据
    getNodes: function () {
        var nodes = [];
        $.ajax({
            type: "get",
            url: "../alashan.json",
            async: false,
            dataType: "json",
            success: function (data) {
                nodes = data.result;

            },
        });
        return nodes;
    },
    //添加箭头
    addJantou: function () {
        var treeObj = $("#treeDemo");
        if (!treeObj.hasClass("showIcon")) {
            treeObj.addClass("showIcon");
        } else {
            treeObj.removeClass("showIcon");
        }
    },
    //默认展开第一个跟节点的第一个子节点{
    moren: function () {
        // 设置默认第一级展开
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");   //获取ztree对象
        var nodeList = zTree.getNodes();   //获取根节点个数,getNodes获取的是根节点的集合
        zTree.expandNode(nodeList[0], true);   //展开第一个根节点
        //如果二级菜单没有子菜单，则不显示箭头
        $.each(nodeList[0].children, function (key, value) {
            if(value.children){
                if (value.children.length === 0) {
                    // $("#" + value.tId + "_switch").addClass("hidden");
                    $("#" + value.tId + "_switch").removeClass("noline_close");
                }
            }

        });


        //默认展开第一个根节点的第一个子节点
        setTimeout(function () {
            var firstNode;
                if (nodeList[0].children[0]) {
                    firstNode = nodeList[0].children[0];
                }else {
                    firstNode = nodeList[0];
                }

            //获取第一个子节点
            zTree.selectNode(firstNode);//选择点
            zTree.setting.callback.onClick(null, zTree.setting.treeId, firstNode);//调用事件
        }, 800);


        //修改样式

        function nodesStyle() {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");   //获取ztree对象
            var nodeList = zTree.getNodes();   //获取根节点个数,getNodes获取的是根节点的集合

            //如果二级菜单没有子菜单，则不显示箭头
            // $.each(nodeList.children, function (key, value) {
            //     if (value.children.length === 0) {
            //         $("#" + value.tId + "_switch").addClass("hidden");
            //         // $("#"+value.tId+"_switch").css("visibility","hidden");
            //     }
            // });
            for (var i = 0; i < nodeList.length; i++) {
                if (nodeList[i].open === true) {
                    $(".ztree.showIcon li a span.button.switch").parent().css({"font-size": "17px"});
                    $(".ztree li span.button.noline_close").parent().css({"font-size": "17px"});
                    $(".ztree li a.level0 .noline_open").parent().css({
                        "background-color": "#0692FE",
                        "color": "white",
                        "border": "none"
                    });
                    $(".ztree li a.level0 span").css({"border": "none"});

                } else {
                    $(".ztree li a.level0 .noline_close").parent().css({
                        "background-color": "#F3F8FB",
                        "color": "gray"
                    });
                }
            }
        };
        nodesStyle();

    },
};
$(document).ready(function () {
    var bigWidth = $(window).width(),
        bigHeight = $(window).height();
    $(".bigBox").css({"width": bigWidth, "height": bigHeight});
    dataDetail.init();
});

function addDiyDom(treeId, treeNode) {
    var spaceWidth = 5;
    var switchObj = $("#" + treeNode.tId + "_switch"),
        icoObj = $("#" + treeNode.tId + "_ico");
    switchObj.remove();
    icoObj.before(switchObj);
}

