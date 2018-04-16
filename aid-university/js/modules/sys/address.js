$(function() {
	$("#provinceJqGrid").jqGrid({
		url: baseURL + 'sys/province/list',
		datatype: "json",
		colModel: [{
				label: 'provinceId',
				name: 'provinceId',
				index: 'province_id',
				width: 50,
				key: true
			},
			{
				label: '省份名称',
				name: 'name',
				index: 'name',
				width: 80
			}
		],
		viewrecords: true,
		height: 680,
		rowNum: 10,
		rowList: [10, 30, 50],
		rownumbers: true,
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
			"selectOnExpand": true
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
				caption: "商品图片",
				autowidth: true,
				multiselect: true,
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
						multiselect: true,
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
		province: {}
	},
	methods: {
		query: function() {
			vm.reload();
		},
		getInfo: function(provinceId) {
			$.get(baseURL + "app/province/info/" + provinceId, function(r) {
				vm.province = r.province;
			});
		},
		reload: function(event) {
			vm.showList = true;
			var page = $("#provinceJqGrid").jqGrid('getGridParam', 'page');
			$("#provinceJqGrid").jqGrid('setGridParam', {
				page: page
			}).trigger("reloadGrid");
		}
	}
});