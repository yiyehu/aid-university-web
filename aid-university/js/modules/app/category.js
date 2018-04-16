$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'app/category/list',
        datatype: "json",
        colModel: [			
			{ label: 'categoryId', name: 'categoryId', index: 'category_id', width: 50, key: true },
			{ label: '分类名', name: 'name', index: 'name', width: 80 }, 			
			{ label: '父类ID', name: 'parentId', index: 'parent_id', width: 80 }, 			
			{ label: 'url路径', name: 'urlname', index: 'urlname', width: 80 }, 			
			{ label: '等级', name: 'level', index: 'level', width: 80 }, 			
			{ label: '图标', name: 'icon', index: 'icon', width: 80 ,formatter:function(cellvalue, options, rowdata) {
        return rowdata.icon == null ? '' : '<i class="'+rowdata.icon+' fa-lg"></i>';
    }}, 			
			{ label: '描述', name: 'description', index: 'description', width: 80 }, 			
			{ label: '关键字', name: 'keywords', index: 'keywords', width: 80 }			
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
		category: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.category = {};
		},
		update: function (event) {
			var categoryId = getSelectedRow();
			if(categoryId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(categoryId)
		},
		saveOrUpdate: function (event) {
			var url = vm.category.categoryId == null ? "app/category/save" : "app/category/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.category),
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
			var categoryIds = getSelectedRows();
			if(categoryIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "app/category/delete",
                    contentType: "application/json",
				    data: JSON.stringify(categoryIds),
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
		getInfo: function(categoryId){
			$.get(baseURL + "app/category/info/"+categoryId, function(r){
                vm.category = r.category;
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