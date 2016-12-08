var app=angular.module('ti',[]);
app.controller('nei',['$scope',function($scope){
	$scope.lists=[
	   {id:1001,name:'新列表',theme:'purple',themee:'purple1'},
       {id:1002,name:'新列表2',theme:'green',themee:'green1'},
       {id:1003,name:'新列表3',theme:'blue',themee:'blue1'}
	];
	$scope.colors=['purple','green','blue','yellow','brown','red','org'];
	// $scope.colorss=['purple1','green1','blue1','yellow1','brown1','red1','org1'];
	if(localStorage.reminder){
		$scope.lists=JSON.parse(localStorage.reminder);
	}else{
		$scope.lists=[
		   {id:1001,name:'买书列表',theme:'blue',todos:[{id:2001,name:'西游记',status:1},{id:2001,name:'红楼梦',status:0}]}
		];
	}
	$scope.addCla=function(){
		$scope.lists[$scope.cu].todos.forEach(function(v,i){
			if(v.status){
				$('.circle').addClass('piao_'+$scope.lists[$scope.cu].theme+'');
				console.log('piao_'+$scope.lists[$scope.cu].theme+'')
			}
		});
	}
	$scope.count=function(){
		var r=0;
		$scope.lists[$scope.cu].todos.forEach(function(v,i){
			if(v.status===1){
				r++;
			}
		});
		return r;
	}
	$scope.clear=function(){
		var newarr=[];
		$scope.lists[$scope.cu].todos.forEach(function(v,i){
			if(v.status===0){
				newarr.push(v);
			}
		});
		$scope.lists[$scope.cu].todos=newarr;
	}
	$scope.save2local=function(){
		localStorage.reminder=JSON.stringify($scope.lists);
	}
	$scope.creatList=function(cu){
		var c={
           id:maxIdn(cu)+1,
           name:'',
           status:0
		}
		$scope.lists[cu].todos.push(c);
		$scope.save2local();
	}
	$scope.addList=function(){
		var l=$scope.lists.length;
		// console.log(l)
		var index=l%7;
		var v={
           id:maxId()+1,
           name:'新列表'+(l+1),
           theme:$scope.colors[index],
           todos:[]
		};
		$scope.lists.push(v);
		$scope.save2local();
	};
	function maxIdn(cu){
		var max=-Infinity;
		for(var i=0;i<$scope.lists[cu].todos.length;i++){
			var v=$scope.lists[cu].todos[i];
			if(v.id>max){
				max=v.id;
			}
		}
		return (max===-Infinity)?2000:max;
	}
	function maxId(){
		var max=-Infinity;
		for(var i=0;i<$scope.lists.length;i++){
			var v=$scope.lists[i];
			if(v.id>max){
				max=v.id;
			}
		}
		return (max===-Infinity)?1000:max;
	}
	$scope.cu=0;
	$scope.delete=function(){
		$scope.lists.splice($scope.cu,1);
		$scope.save2local();
	}
}]);
app.directive('myUl',[function(){
	return {
		restrict:'A',
		replace:true,
		transclude:true,
		template:'<ul><div ng-transclude></div></ul>',
		link:function($scope,el){
			$(el).on('click','li',function(){
				$(el).find('li').removeClass('ing');
				$(this).addClass('ing');
				var self=this;
				$scope.$apply(function(){
					$scope.cu=$(self).index();
				});
			});
			$(el).on('keyup','li',false);
			$(document).on('keyup',function(e){
				if(e.keyCode===8){
					var index=$('.ing').index();
					if(index===-1){
						return;
					}
					$scope.$apply(function(){
						$scope.lists.splice(index,1);
						$scope.save2local();
					});					
				}
			});
			$(el).on('click','.wifi',function(){
				$(this).closest('li').find('.wifi-yin').toggleClass('wifi-xian');
				return false;
			});
			$(el).on('click','.wifi-yin',false);
			$(document).on('click',function(){
	          $(".wifi-yin").removeClass('wifi-xian');
	        });
		}
	}
}]);
app.directive('myXuan',[function(){
	return{
		restrict:'A',
		replace:true,
		transclude:true,
		template:'<div class="xuan"><div ng-transclude></div></div>',
		link:function($scope,el){
			$(document).on('keyup','input',false);
			$(el).on('click',function(){
				$('.xuan-yin').toggle();
				return false;
			});
			$(".xuan-yin").on('click',false);
			$(document).on('click',function(){
				$('.xuan-yin').hide();
			});
		}
	}
}]);
app.directive('mySe',[function(){
	return{
		restrict:'A',
		replace:true,
		transclude:true,
		template:'<span class="icloud"><div ng-transclude></div></span>',
		link:function($scope,el){
			$(el).on('click',function(){
				$('.yin').toggle();
				$('.san').toggle();
				return false;
			});
			$(".yin").on('click',false);
			$(document).on('click',function(){
				$('.xuan-yin').hide();
			});
		}
	}
}]);
app.directive('myYi',[function(){
	return{
		restrict:'A',
		replace:true,
		transclude:true,
		template:'<div><div ng-transclude></div></div>',
		link:function($scope,el){
			$(el).on('click','.cheng',function(){
				$(el).find('.cheng').removeClass('zhong');
				$(this).addClass('zhong');
				// var self=this;
				// $scope.$apply(function(){
				// 	$scope.su=$(self).index();
				// 	console.log($scope.cu)
				// });
			});
			$(el).on('keyup','.cheng',false);
            $(document).on('keyup',function(e){
				if(e.keyCode===8){
					var index=$('.zhong').index();
					console.log(index)
					if(index===-1){
						return;
					}
					$scope.$apply(function(){
						$scope.lists[$scope.cu].todos.splice(index,1);
						$scope.save2local();
					});					
				}
			});
		}
	}
}]);
app.directive('myCo',[function(){
	return {
		restrict:'A',
		replace:true,
		transclude:true,
		template:'<ul><div ng-transclude></div></ul>',
		link:function($scope,el){
			// $(el).find('li:nth($scope.cu)').addClass('colorb_'+$scope.lists[$scope.cu].theme+'');
			$(el).on('click','li',function(){
				$(el).find('li').removeClass('colorb_purple').removeClass('colorb_green').removeClass('colorb_blue').removeClass('colorb_yellow').removeClass('colorb_brown').removeClass('colorb_red').removeClass('colorb_org');
				$(this).addClass('colorb_'+$scope.lists[$scope.cu].theme+'');
			});
	    }		
	}
}]);