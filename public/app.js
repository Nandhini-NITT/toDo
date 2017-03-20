var app=angular.module('myApp',[]);
app.controller('todoCtrl',function($scope,$http){
	$http.get('/todos').then(function(response){
		$scope.toDos=response.data;
	});
	$scope.addTodo=function(){
		$http.get('/addTodo?task='+$scope.task).then(function(response){
			if(response)
				{
					$scope.message='Added Successfully';
					$scope.task=" ";
					$scope.toDos.push(response.data);
				}
		});
	}
	$scope.removeItem=function(id){

		$http.get('/deleteTodo?id='+id).then(function(response){
			if(response)
			{
				var othertoDos=[];
				$scope.message='Removed Successfully';
				angular.forEach($scope.toDos,function(value,key){
					if(value.id!=response.data)
						othertoDos.push(value);
				});
				$scope.toDos=othertoDos;
			}
		});
	}
});