var fileSys = {
	view : '',
	files : {},
	reback : '',
	down : function(file){
		file = decodeURIComponent(file);
		$.post('/list',{source:file},function(data){
			if(data.startsWith('down')){
				window.location.href='http://localhost:8080/down?fileName='+encodeURIComponent(file);
				return;
			}
			files = eval ('('+data+')');
			view = '';
			view = '<ul>'
			for(v in files){
				if(v == 'upper'){
					reback = files[v];
					continue;
				}
				view += '<li><a href=javascript:void(0) onclick=down(\''+encodeURIComponent(files[v])+'\')>'+files[v]+'</a></li>';
			}
			view = view + '</ul>';
			$('.view').html('');
			$('.view').html(view);
		});
	},
	list : function(path){
		if(path == 'back'){
			path = reback
		}
		$.ajax({
			type : 'POST',
			data : {source:path},
			url : '/list',
			success : function(data){
				files = eval ('('+data+')');
				view = '';
				view = '<ul>'
				for(v in files){
					if(v == 'upper'){
						reback = files[v];
						continue;
					}
					view += '<li><a href=javascript:void(0) onclick=down(\''+encodeURIComponent(files[v])+'\')>'+files[v]+'</a></li>';
				}
				view = view + '</ul>';
				$('.view').html('');
				$('.view').html(view);
			}
		});
	},
	init : function(){
		fileSys.list('F:/');
	}
};

fileSys.init();

var list = fileSys.list;

var down = fileSys.down;


/*var view = '';
var reback = '';
var files = {};

//下载文件
function down(v){
	$.post('/list',{source:files[v]},function(data){
		if(data.startsWith('down')){
			window.location.href='/down?fileName='+encodeURIComponent(files[v]);
			return;
		}
		files = eval ('('+data+')');
		view = '';
		view = '<ul>'
		for(v in files){
			if(v == 'upper'){
				reback = files[v];
				continue;
			}
			view += '<li><a href=javascript:void(0) onclick=down(\''+v+'\')>'+files[v]+'</a></li>';
		}
		view = view + '</ul>';
		$('.view').html('');
		$('.view').html(view);
	});
}
//文件列表
function list(path){
	if(path == 'back'){
		path = reback;
	}
	$.ajax({
		type : 'POST',
		data : {source:path},
		url : '/list',
		success : function(data){
			files = eval ('('+data+')');
			view = '';
			view = '<ul>'
			for(v in files){
				if(v == 'upper'){
					reback = files[v];
					continue;
				}
				view += '<li><a href=javascript:void(0) onclick=down(\''+v+'\')>'+files[v]+'</a></li>';
			}
			view = view + '</ul>';
			$('.view').html('');
			$('.view').html(view);
		}
	});
}*/
