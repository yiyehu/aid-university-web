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
				width: 80,
				formatter: function(item, index) {
					return item == 0 ? '默认' : '其他';
				}
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
		sortname: 'name',
		grouping: true,
		groupingView: {
			groupField: ['name']
		},
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
				width: 426
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
		caption: "请选择用户，用以指定用户ID、用户姓名"
	});
	$("#userJqGrid").jqGrid('navGrid', "#userJqGridPager", {
		edit: false,
		add: false,
		del: false,
		search: true,
		searchicon: 'fa fa-search',
		searchtext: '查找'
	});
	$("#provinceJqGrid").jqGrid({
		url: baseURL + 'sys/province/list',
		datatype: "json",
		colModel: [{
				label: 'provinceId',
				name: 'provinceId',
				index: 'province_id',
				width: 500,
				key: true
			},
			{
				label: '省份名称',
				name: 'name',
				index: 'name',
				width: 800
			}
		],
		viewrecords: true,
		height: 370,
		rowNum: 10,
		rowList: [10, 30, 50],
		rownumbers: true,
		caption: '请选择省份、城市、县区，用以指定省份ID、省份名称、城市ID、城市名称、县区ID、县区名称',
		rownumWidth: 25,
		autowidth: true,
		multiselect: false,
		pager: "#provinceJqGridPager",
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
			$("#provinceJqGrid").closest(".ui-jqgrid-bdiv").css({
				"overflow-x": "hidden"
			});
		},
		subGrid: true,
		subGridOptions: {
			"plusicon": "fa fa-angle-double-right ",
			"minusicon": "fa fa-angle-double-down",
			"openicon": "fa fa-angle-left",
			// load the subgrid data only once
			// and the just show/hide
			"reloadOnExpand": false,
			// select the row when the expand column is clicked
			"selectOnExpand": true,
		},
		subGridRowExpanded: function(subgrid_id, row_id) {
			var subgrid_table_id, pager_id;
			subgrid_table_id = subgrid_id + "_t";
			pager_id = "p_" + subgrid_table_id;
			$("#" + subgrid_id).html("<table id='" + subgrid_table_id + "'></table><div id='" + pager_id + "'></div>");
			jQuery("#" + subgrid_table_id).jqGrid({
				url: baseURL + 'sys/city/list/' + row_id,
				datatype: "json",
				colModel: [{
						label: 'cityId',
						name: 'cityId',
						index: 'city_id',
						width: 50,
						key: true
					},
					{
						label: '省份ID',
						name: 'provinceId',
						index: 'province_id',
						width: 80,
						hidden: true
					},
					{
						label: '城市名称',
						name: 'name',
						index: 'name',
						width: 80
					},
					{
						label: '邮政编码',
						name: 'zipcode',
						index: 'zipcode',
						width: 80
					}
				],
				viewrecords: true,
				height: 580,
				rowNum: 10,
				rowList: [10, 30, 50],
				rownumbers: true,
				rownumWidth: 25,
				autowidth: true,
				multiselect: false,
				pager: "#" + pager_id,
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
					$("#" + subgrid_table_id).closest(".ui-jqgrid-bdiv").css({
						"overflow-x": "hidden"
					});
				},

				subGrid: true,
				subGridOptions: {
					"plusicon": "fa fa-angle-double-right ",
					"minusicon": "fa fa-angle-double-down",
					"openicon": "fa fa-angle-left",
					// load the subgrid data only once
					// and the just show/hide
					"reloadOnExpand": false,
					// select the row when the expand column is clicked
					"selectOnExpand": true
				},
				subGridRowExpanded: function(subgrid_id, row_id) {
					var subgrid_table_id, pager_id;
					subgrid_table_id = subgrid_id + "_t";
					pager_id = "p_" + subgrid_table_id;
					$("#" + subgrid_id).html("<table id='" + subgrid_table_id + "'></table><div id='" + pager_id + "'></div>");
					jQuery("#" + subgrid_table_id).jqGrid({
						url: baseURL + 'sys/region/list/' + row_id,
						datatype: "json",
						colModel: [{
								label: 'regionId',
								name: 'regionId',
								index: 'region_id',
								width: 50,
								key: true
							},
							{
								label: '城市ID',
								name: 'cityId',
								index: 'city_id',
								width: 80,
								hidden: true
							},
							{
								label: '县区名称',
								name: 'name',
								index: 'name',
								width: 80
							}
						],
						viewrecords: true,
						height: 375,
						rowNum: 10,
						rowList: [10, 30, 50],
						rownumbers: true,
						rownumWidth: 25,
						caption: "商品图片",
						autowidth: true,
						multiselect: false,
						pager: "#" + pager_id,
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
							$("#" + subgrid_table_id).closest(".ui-jqgrid-bdiv").css({
								"overflow-x": "hidden"
							});
						}
					});
					jQuery("#" + subgrid_table_id).jqGrid('navGrid', "#" + pager_id, {
						edit: false,
						add: false,
						del: false
					});
				}
			});
			jQuery("#" + subgrid_table_id).jqGrid('navGrid', "#" + pager_id, {
				edit: false,
				add: false,
				del: false
			})
		}
	});

});

var vm = new Vue({
	el: '#rrapp',
	data: {
		showList: true,
		title: null,
		userAddress: {},
		list: [{
			value: 0
		}, {
			value: 1
		}]
	},
	methods: {
		query: function() {
			vm.reload();
		},
		add: function() {
			vm.showList = false;
			vm.title = "新增";
			vm.userAddress = {};
			$("#userJqGrid").jqGrid('setGridParam', {
				page: 1
			}).trigger("reloadGrid");
		},
		update: function(event) {
			var addressId = getSelectedRow();
			if(addressId == null) {
				return;
			}
			vm.showList = false;
			vm.title = "修改";
			vm.userAddress = $("#jqGrid").jqGrid('getRowData', addressId);
			vm.getInfo(addressId);
			$("#userJqGrid").jqGrid('setSelection', vm.userAddress.userId);
			//			$("#provinceJqGrid").jqGrid('setSelection',vm.userAddress.provinceId);
			//			$("#provinceJqGrid_" + vm.userAddress.provinceId + "_t").jqGrid('setSelection',vm.userAddress.cityId);
			//			$("#provinceJqGrid_" + vm.userAddress.provinceId + "_t_" + vm.userAddress.cityId + "_t").jqGrid('setSelection',vm.userAddress.regionId);

		},
		saveOrUpdate: function(event) {
			var userId = getSelectedRowWithJqGridId("userJqGrid");
			vm.userAddress.userId = userId;
			vm.userAddress.name = $("#userJqGrid").jqGrid('getRowData', userId).username;

			var provinceId = getSelectedRowWithJqGridId("provinceJqGrid");
			vm.userAddress.provinceId = provinceId;
			vm.userAddress.provinceName = $("#provinceJqGrid").jqGrid('getRowData', provinceId).name;

			var cityId = getSelectedRowWithJqGridId("provinceJqGrid_" + provinceId + "_t");
			vm.userAddress.cityId = cityId;
			vm.userAddress.cityName = $("#provinceJqGrid_" + provinceId + "_t").jqGrid('getRowData', cityId).name;

			var regionId = getSelectedRowWithJqGridId("provinceJqGrid_" + provinceId + "_t_" + cityId + "_t");
			vm.userAddress.regionId = regionId;
			vm.userAddress.regionName = $("#provinceJqGrid_" + provinceId + "_t_" + cityId + "_t").jqGrid('getRowData', regionId).name;

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