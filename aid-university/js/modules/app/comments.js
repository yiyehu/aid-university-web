$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'app/comments/list',
        datatype: "json",
        colModel: [			
			{ label: 'commentId', name: 'commentId', index: 'comment_id', width: 50, key: true },
			{ label: '评价内容', name: 'content', index: 'content', width: 80 }, 			
			{ label: '星级', name: 'star', index: 'star', width: 80 }, 			
			{ label: '是否匿名', name: 'isAnon', index: 'is_anon', width: 80 }, 			
			{ label: '添加时间', name: 'createTime', index: 'create_time', width: 80 }			
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
		comments: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.comments = {};
		},
		update: function (event) {
			var commentId = getSelectedRow();
			if(commentId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(commentId)
		},
		saveOrUpdate: function (event) {
			var url = vm.comments.commentId == null ? "app/comments/save" : "app/comments/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.comments),
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
			var commentIds = getSelectedRows();
			if(commentIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "app/comments/delete",
                    contentType: "application/json",
				    data: JSON.stringify(commentIds),
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
		getInfo: function(commentId){
			$.get(baseURL + "app/comments/info/"+commentId, function(r){
                vm.comments = r.comments;
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