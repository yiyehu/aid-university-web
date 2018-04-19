$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'app/order/list',
        datatype: "json",
        colModel: [			
			{ label: 'orderId', name: 'orderId', index: 'order_id', width: 50, key: true },
			{ label: '收货人姓名', name: 'userName', index: 'user_name', width: 80 },
			{ label: '商品ID', name: 'goodsId', index: 'goods_id', width: 80 ,hidden:true},
			{ label: '评价ID', name: 'commentId', index: 'comment_id', width: 80 ,hidden:true}, 			
			{ label: '收货地址ID', name: 'addressId', index: 'address_id', width: 80,hidden:true}, 			
			{ label: '用户ID', name: 'userId', index: 'user_id', width: 80 ,hidden:true}, 			
			{ label: '是否评价', name: 'isComment', index: 'is_comment', width: 80 ,formatter:function(item, index){
				return item == 0 ? '<span class="badge bg-red">未评价</span>' : 
							item == 1 ? '<span class="badge bg-green">已评价</span>' : '未知';
			}}, 			
			{ label: '订单状态', name: 'status', index: 'status', width: 80 ,formatter:function(item, index){
				return item == 0 ? '待确认' : 
							item == 1 ? '待付款' : 
								item == 2 ? '待发货' : 
									item == 3 ? '待收货' : 
										item == 4 ? '待评价' : 
											item == 5 ? '交易成功' : 
												item == 6 ? '退款申请中' : 
													item == 7 ? '退款成功' : 
														item == 8 ? '交易关闭' : '未知';
			}},
			{ label: '下单时间', name: 'createTime', index: 'create_time', width: 80 }, 			
			{ label: '备注', name: 'remark', index: 'remark', width: 80 }, 			
			{ label: '商品金额', name: 'goodsMoney', index: 'goods_money', width: 80 }, 			
			{ label: '收货方式', name: 'deliverType', index: 'deliver_type', width: 80 }, 			
			{ label: '快递费用', name: 'deliverMoney', index: 'deliver_money', width: 80 }, 			
			{ label: '订单总金额', name: 'totalMoney', index: 'total_money', width: 80 }, 			
			{ label: '实际订单总金额', name: 'realTotalMoney', index: 'real_total_money', width: 80 }, 			
			{ label: '付费方式', name: 'paytype', index: 'payType', width: 80 ,formatter:function(item, index){
				return item == 0 ? '<span class="badge badge bg-yellow">货到付款</span>' : 
							item == 1 ? '<span class="badge badge bg-light-blue">网上支付</span>' : '未知';
			}}, 			
			{ label: '支付来源', name: 'payfrom', index: 'payFrom', width: 80 ,formatter:function(item, index){
				return item == 0 ? '支付宝' : 
							tem == 1 ? '微信' : '未知';
			}},
			{ label: '收货人地址', name: 'userAdress', index: 'user_adress', width: 80 }, 			
			{ label: '收货人手机', name: 'userMobile', index: 'user_mobile', width: 80 }			
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
});

var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
		title: null,
		order: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.order = {};
		},
		update: function (event) {
			var orderId = getSelectedRow();
			if(orderId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(orderId)
		},
		saveOrUpdate: function (event) {
			var url = vm.order.orderId == null ? "app/order/save" : "app/order/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.order),
			    success: function(r){
			    	if(r.code === 0){
						alert('操作成功', function(index){
							vm.reload();
						});
					}else{
						alert(r.msg);
					}
				}
			});
		},
		del: function (event) {
			var orderIds = getSelectedRows();
			if(orderIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "app/order/delete",
                    contentType: "application/json",
				    data: JSON.stringify(orderIds),
				    success: function(r){
						if(r.code == 0){
							alert('操作成功', function(index){
								$("#jqGrid").trigger("reloadGrid");
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		getInfo: function(orderId){
			$.get(baseURL + "app/order/info/"+orderId, function(r){
                vm.order = r.order;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                page:page
            }).trigger("reloadGrid");
		}
	}
});