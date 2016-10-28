var app = angular.module('todos',[]);
app.directive('myLi',[function() {
  return {
    restrict:'AE',
    template:'<li class="lis {{v.theme}}" ng-repeat="v in lists" ng-click="setcurrent(v)"><div class="lislogo"><span class="lis-logo"></span></div><span class="lis-name">{{v.title}}</span><input type="text" value={{v.title}} class="lis-input" ng-model="v.title"></li>',
    replace:true,
    link:function(el){
      $('.li li').on('mousedown',false);
      $('.li').on('dblclick','li',function(){
          $(this).addClass('bianji');
          var input = $(this).find('.lis-input');
          input.val(input.val()).focus();
      });
      $('.li').on('click','li',function(){
        $('.li li').removeClass('active');
        $(this).addClass('active')
      });
      $('.li').on('blur','li input',function(){
        $(this).closest('li').removeClass('bianji');
      });
    }
  }
}]);

app.controller('mainCtrl',['$scope',function ($scope) {

  $scope.lists=[
    {id:1,theme:'logo1',title:'默认',todos:[
      {id:1001,title:'买房',state:1},
      {id:1002,title:'买车',state:0}
    ]},
    {id:2,theme:'logo2',title:'新列表2',todos:[]},
    {id:3,theme:'logo3',title:'新列表3',todos:[]},
    {id:4,theme:'logo4',title:'新列表4',todos:[]}
  ];
  $scope.colors=['logo1','logo2','logo3','logo4','logo5','logo6','logo7'];

  $scope.cols=['col1','col2','col3','col4','col5','col6','col7'];
  $scope.spans=['li1','li2','li3','li4','li5','li6','li7'];
  $scope.list={'li1':'col1','li2':'col2','li3':'col3','li4':'col4','li5':'col5','li6':'col6','li7':'col7'};
  $scope.colos={'li1':'logo1','li2':'logo2','li3':'logo3','li4':'logo4','li5':'logo5','li6':'logo6','li7':'logo7'};


  $scope.add=function(){
    var maxid = -Infinity;
    $scope.lists.forEach(function(v){
      if(maxid<v.id){
        maxid = v.id;
      }
    });
    var item={
      id:maxid+1,
      theme:$scope.colors[$scope.lists.length % $scope.colors.length],
      title:'新列表'+($scope.lists.length+1),
      todos:[]
    };
    $scope.lists.push(item);
  };

  $scope.current=$scope.lists[0];

  $scope.setcurrent=function(v){
    $scope.current=v
  };

  $scope.delete=function(id){
    $scope.current.todos=$scope.current.todos.filter(function(v){
        return v.id != id;
    })
  };

  $scope.addtodos=function(e){
    if(e.keyCode == 13){
      var maxid = -Infinity;
      $scope.current.todos.forEach(function(v){
        if(maxid<v.id){
          maxid = v.id;
        }
      });
      var item={
        id:maxid+1,
        title:$scope.titles,
        state:0
      };
      $scope.current.todos.push(item);
      $scope.titles='';
    }
  };

  $scope.change=function(x){
    $scope.cols.forEach(function(v){
      $('.box').removeClass(v);
    })
    $('.box').addClass($scope.list[x]);
    $scope.current.theme = $scope.colos[x];
  }

  $scope.makeNew=function(){
      var maxid = -Infinity;
      $scope.current.todos.forEach(function(v){
        if(maxid<v.id){
          maxid = v.id;
        }
      });
      var item={
        id:maxid+1,
        title:$scope.titles,
        state:0
      };
    $scope.current.todos.push(item);
  }

  $scope.dele=function(id){
    var a =0;
    $scope.lists.forEach(function(v,i){
      if (id == v.id){
        a = i
      }
    });
    $scope.lists = $scope.lists.filter(function(v){
      return v.id !== id
    });
    $scope.current = $scope.lists[a];
  }
}]);

$(function(){

  //选项的弹出及隐藏
  $('.option').on('click',function(){
    $(this).next().toggle('show')
  });
  $('.list-can').on('click',function() {
    // $(this).closest('.new-list').hide();
    var arr = ['col1','col2','col3','col4','col5','col6','col7'];
    $(arr).each(function(i,v){
      $('.box').removeClass(v)
    })
  });
  $('.list-colors .inset').on('click',function(){
    $('.li-cir').addClass('active');
    $(this).closest('.li-cir').removeClass('active');
  });
  $('.list-com').on('click',function(){
    $(this).closest('.new-list').hide();

  })
  //已完成列表和未完成列表的点击修改事件
  $('.list').on('dblclick','.thing',function(){
    $(this).closest('li').addClass('bian');
    var str = $(this).next().val();
    $(this).next().val(str).focus();
  });

  $('.list').on('blur','.thing-input',function(){
    var str = $(this).val();
    if(str){
      $(this).closest('li').removeClass('bian')
    }else{
      $(this).closest('li').remove()
    }

  });
  $('.al-list').on('dblclick','.al-thing',function(){
    $(this).closest('li').addClass('bian');
    var str = $(this).next().val();
    $(this).next().val(str).focus();
  });
  $('.al-list ').on('blur','.al-thing-input',function(){
    $(this).closest('li').removeClass('bian')
  });

//“新选项”的点击事件
// $('.new').on('click',function(){
//   $('.list li:last').addClass('bian').find('.thing-input').focus();
// })

})
