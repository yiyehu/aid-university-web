$(function() {
	$("#jqGrid").jqGrid({
		url: baseURL + 'app/useraddress/list',
		datatype: "json",
		colModel: [{
				label: 'addressId',
				name: 'addressId',
				index: 'address_id',
				width: 50,
				key: true
			},
			{
				label: '用户ID',
				name: 'userId',
				index: 'user_id',
				width: 80,
				hidden: true
			},
			{
				label: '用户姓名',
				name: 'name',
				index: 'name',
				width: 80
			},
			{
				label: '省份ID',
				name: 'provinceId',
				index: 'province_id',
				width: 80,
				hidden: true
			},
			{
				label: '城市ID',
				name: 'cityId',
				index: 'city_id',
				width: 80,
				hidden: true
			},
			{
				label: '县区ID',
				name: 'regionId',
				index: 'region_id',
				width: 80,
				hidden: true
			},
			{
				label: '城镇ID',
				name: 'townId',
				index: 'town_id',
				width: 80,
				hidden: true
			},
			{
				label: '省份名称',
				name: 'provinceName',
				index: 'province_name',
				width: 80
			},
			{
				label: '城市名称',
				name: 'cityName',
				index: 'city_name',
				width: 80
			},
			{
				label: '县区名称',
				name: 'regionName',
				index: 'region_name',
				width: 80
			},
			{
				label: '城镇名称',
				name: 'townName',
				index: 'town_name',
				width: 80
			},
			{
				label: '详细地址',
				name: 'address',
				index: 'address',
				width: 80
			},
			{
				label: '电话号',
				name: 'telephone',
				index: 'telephone',
				width: 80
			},
			{
				label: '手机号',
				name: 'mobile',
				index: 'mobile',
				width: 80
			},
			{
				label: '是否为默认地址',
				name: 'defaultAddr',
				index: 'default_addr',
				width: 80
			}
		],
		viewrecords: true,
		height: 375,
		rowNum: 10,
		rowList: [10, 30, 50],
		rownumbers: true,
		rownumWidth: 25,
		autowidth: true,
		multiselect: true,
		pager: "#jqGridPager",
		jsonReader: {
			root: "page.list",
			page: "page.currPage",
			total: "page.totalPage",
			records: "page.totalCount"
		},
		prmNames: {
			page: "page",
			rows: "limit",
			order: "order"
		},
		gridComplete: function() {
			//隐藏grid底部滚动条
			$("#jqGrid").closest(".ui-jqgrid-bdiv").css({
				"overflow-x": "hidden"
			});
		}
	});
	$("#userJqGrid").jqGrid({
		url: baseURL + 'app/user/list',
		datatype: "json",
		colModel: [{
				label: 'userId',
				name: 'userId',
				index: 'user_id',
				width: 100,
				key: true
			},
			{
				label: '用户姓名',
				name: 'username',
				index: 'username',
				width: 800
			},
			{
				label: '手机号',
				name: 'mobile',
				index: 'mobile',
				width: 400
			}
		],
		viewrecords: true,
		height: 220,
		rowNum: 5,
		rowList: [5, 10, 30],
		rownumbers: true,
		rownumWidth: 25,
		autowidth: true,
		selectOnExpand: true,
		multiselect: false,
		pager: "#userJqGridPager",
		jsonReader: {
			root: "page.list",
			page: "page.currPage",
			total: "page.totalPage",
			records: "page.totalCount"
		},
		prmNames: {
			page: "page",
			rows: "limit",
			order: "order"
		},
		gridComplete: function() {
			//隐藏grid底部滚动条
			$("#goodsJqGrid").closest(".ui-jqgrid-bdiv").css({
				"overflow-x": "hidden"
			});
		},
		caption: "请选择对应的商品表中的一行"
	});
	$("#userJqGrid").jqGrid('navGrid', "#userJqGridPager", {
		edit: false,
		add: false,
		del: false,
		search: true,
		searchicon: 'fa fa-search',
		searchtext: '查找'
//		searchfunc:function (){
//			var page = $("#userJqGrid").jqGrid('getGridParam','page');
//			$("#userJqGrid").jqGrid('setGridParam',{
//				datatype:'json',
//              postData:{
////              	'username': data.username,
////              	'mobile':data.mobile,
////              	'userId':data.user_id
//              },
//              page:page
//          }).trigger("reloadGrid");
//		}
	})

});

var vm = new Vue({
	el: '#rrapp',
	data: {
		showList: true,
		title: null,
		userAddress: {}
	},
	methods: {
		query: function() {
			vm.reload();
		},
		add: function() {
			vm.showList = false;
			vm.title = "新增";
			vm.userAddress = {};
		},
		update: function(event) {
			var addressId = getSelectedRow();
			if(addressId == null) {
				return;
			}
			vm.showList = false;
			vm.title = "修改";

			vm.getInfo(addressId)
		},
		saveOrUpdate: function(event) {
			var url = vm.userAddress.addressId == null ? "app/useraddress/save" : "app/useraddress/update";
			$.ajax({
				type: "POST",
				url: baseURL + url,
				contentType: "application/json",
				data: JSON.stringify(vm.userAddress),
				success: function(r) {
					if(r.code === 0) {
						alert('操作成功', function(index) {
							vm.reload();
						});
					} else {
						alert(r.msg);
					}
				}
			});
		},
		del: function(event) {
			var addressIds = getSelectedRows();
			if(addressIds == null) {
				return;
			}

			confirm('确定要删除选中的记录？', function() {
				$.ajax({
					type: "POST",
					url: baseURL + "app/useraddress/delete",
					contentType: "application/json",
					data: JSON.stringify(addressIds),
					success: function(r) {
						if(r.code == 0) {
							alert('操作成功', function(index) {
								$("#jqGrid").trigger("reloadGrid");
							});
						} else {
							alert(r.msg);
						}
					}
				});
			});
		},
		getInfo: function(addressId) {
			$.get(baseURL + "app/useraddress/info/" + addressId, function(r) {
				vm.userAddress = r.userAddress;
			});
		},
		reload: function(event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam', 'page');
			$("#jqGrid").jqGrid('setGridParam', {
				page: page
			}).trigger("reloadGrid");
		}
	}
});