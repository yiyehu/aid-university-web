$(function() {
	$("#goodsJqGrid").jqGrid({
		url: baseURL + 'app/goods/list/',
		datatype: "json",
		colModel: [{
				label: 'goodsId',
				name: 'goodsId',
				index: 'goods_id',
				width: 100,
				key: true
			},
			{
				label: '分类ID',
				name: 'categoryId',
				index: 'category_id',
				width: 400
			},
			{
				label: '商品名称',
				name: 'name',
				index: 'name',
				width: 800
			}
		],
		viewrecords: true,
		height: 670,
		rowNum: 10,
		rowList: [10, 30, 50],
		rownumbers: true,
		rownumWidth: 25,
		autowidth: true,
		multiselect: false,
		pager: "#goodsJqGridPager",
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
				url: baseURL + 'app/goodsimages/list/' + row_id,
				datatype: "json",
				colModel: [{
						label: 'goodImageId',
						name: 'goodImageId',
						index: 'good_image_id',
						width: 30,
						key: true
					},
					{
						label: '图片名称',
						name: 'name',
						index: 'name',
						width: 60
					},
					{
						label: '图片类型',
						name: 'type',
						index: 'type',
						width: 30
					},
					{
						label: '图片缓存地址',
						name: 'localPath',
						index: 'local_path',
						width: 120,
						align: 'center',
						formatter: function(item, index) {
							return item == null ? '' : '<img style="height:70px;width:150px "src='+ baseURL + item + '></i>';
						},
					},
					{
						label: '云存储key',
						name: 'pathKey',
						index: 'path_key',
						align: 'center',
						width: 180
					}
				],
				viewrecords: true,
				height: 400,
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
			})
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
		height: 500,
		rowNum: 10,
		rowList: [10, 30, 50],
		rownumbers: true,
		rownumWidth: 25,
		autowidth: true,
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
		caption: "请选择对应的商品表中的一行",
		subGrid: true,
		subGridOptions: {
			"plusicon": "ui-icon-triangle-1-e",
			"minusicon": "ui-icon-triangle-1-s",
			"openicon": "ui-icon-arrowreturn-1-e",
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
				url: baseURL + 'app/goods/list/' + row_id,
				datatype: "json",
				colModel: [{
						label: 'goodsId',
						name: 'goodsId',
						index: 'goods_id',
						width: 50,
						key: true
					},
					{
						label: '用户ID',
						name: 'userId',
						index: 'user_id',
						width: 80
					},
					{
						label: '分类ID',
						name: 'categoryId',
						index: 'category_id',
						width: 80
					},
					{
						label: '商品名称',
						name: 'name',
						index: 'name',
						width: 80
					},
					{
						label: '价格',
						name: 'price',
						index: 'price',
						width: 80
					},
					{
						label: '新货价格',
						name: 'newprice',
						index: 'newprice',
						width: 80
					},
					{
						label: '添加时间',
						name: 'addtime',
						index: 'addtime',
						width: 80
					}
				],
				viewrecords: true,
				height: 385,
				rowNum: 10,
				rowList: [10, 30, 50],
				rownumbers: true,
				caption: "商品",
				rownumWidth: 25,
				autowidth: true,
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
			})
		}
	});
});
var ajaxUpload = null;
var vm = new Vue({
	el: '#rrapp',
	data: {
		q:{
			username:null,
			mobile:null
		},
		url: null,
		showList: true,
		title: null,
		goodsImages: {}
	},
	methods: {
		query: function() {
			vm.reload();
		},
		add: function() {
			vm.showList = false;
			vm.title = "新增";

			vm.goodsImages = {};
			ajaxUpload = new AjaxUpload('#imageInputFile', {
				action: baseURL + 'sys/oss/upload?token=' + token,
				name: 'file',
				autoSubmit: true,
				responseType: "json",
				onSubmit: function(file, extension) {
					if(!(extension && /^(jpg|jpeg|png|gif)$/.test(extension.toLowerCase()))) {
						alert('只支持jpg、png、gif格式的图片！');
						return false;
					}
				},
				onComplete: function(file, r) {
					if(r.code == 0) {
						vm.goodsImages.pathKey = r.pathKey;
						vm.goodsImages.localPath = r.localPath;
						vm.goodsImages.name = r.name;
						vm.goodsImages.type = r.type;
						var userId = getSelectedRowWithJqGridId("userJqGrid");
						var goodsId = getSelectedRowWithJqGridId("userJqGrid_"+userId+"_t");
						vm.goodsImages.goodsId = goodsId;
						$.ajax({
							type: "POST",
							url: baseURL + "app/goodsimages/save",
							contentType: "application/json",
							data: JSON.stringify(vm.goodsImages),
							success: function(r) {
								if(r.code === 0) {
									alert('操作成功', function(index) {
										vm.reload();
									});
								} else {
									//
								}
							}
						});
						vm.reload();
					} else {
						//alert(r.msg);
					}
				}
			});

		},
		del: function(event) {
			var goodsId = getSelectedRowWithJqGridId("goodsJqGrid");
			var goodImageJqGridId = "goodsJqGrid_"+goodsId+"_t";
			var goodImageIds = getSelectedRowsWithJqGridId(goodImageJqGridId);
			if(goodImageIds == null) {
				return;
			}

			confirm('确定要删除选中的记录？', function() {
				$.ajax({
					type: "POST",
					url: baseURL + "app/goodsimages/delete",
					contentType: "application/json",
					data: JSON.stringify(goodImageIds),
					success: function(r) {
						if(r.code == 0) {
							alert('操作成功', function(index) {
								$("#"+goodImageJqGridId).trigger("reloadGrid");
							});
						} else {
							alert(r.msg);
						}
					}
				});
			});
		},
		getInfo: function(goodImageId) {
			$.get(baseURL + "app/goodsimages/info/" + goodImageId, function(r) {
				vm.goodsImages = r.goodsImages;
			});
		},
		reload: function(event) {
			vm.showList = true;
			var page = $("#goodsJqGrid").jqGrid('getGridParam', 'page');
			$("#goodsJqGrid").jqGrid('setGridParam', {
				page: page
			}).trigger("reloadGrid");
		},
		queryByUsername:function(event){
			if(vm.q.mobile!=null&& vm.q.mobile!=""){
				if(!validator.isNumeric(vm.q.mobile)){
					alert('账号需为数字');
					return;
				} 
			}
			var page = $("#userJqGrid").jqGrid('getGridParam','page');
			$("#userJqGrid").jqGrid('setGridParam',{
				datatype:'json',
                postData:{
                	'username': vm.q.username,
                	'mobile':vm.q.mobile
                },
                page:page
            }).trigger("reloadGrid");
		}
	}
});