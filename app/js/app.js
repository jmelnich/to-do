$(function() {
	//check if I have smth in localStorage.
	let storedData = localStorage.getItem("list_tasks");
	let data = {
		tasks: [],
		id: 0
	};
	if (storedData) {
	console.log(storedData);
	    data.tasks = JSON.parse(storedData);
	    data.id = data.tasks.length;
	}

	let octopus = {
		//addTask function that push new obj to model push it as an object
		addTask: function(text) {
			let utc = (new Date()).toString().split(' ').splice(1,4).join(' ');
			data.tasks.push({
				uid: data.id++,
				time: utc,
				text
			});
			view.render();
			localStorage.setItem("list_tasks",  JSON.stringify(data.tasks));
			//console.log(localStorage.list_data_key);
		},
		getActiveTask: function() {
			let activeTasks = data.tasks;
			return activeTasks;
		},
		removeTask: function(id) {
			let elem = data.tasks.map(obj => obj.uid == id);
			let posInArr = elem.indexOf(true);
			data.tasks.splice(posInArr, 1);
			localStorage.setItem("list_tasks",  JSON.stringify(data.tasks));
			view.render();
		}
	};

	let view = {
		init: function() {
			const addTaskBtn = $('.add-task');
			$("#add").keyup(function(event) {
    			if (event.keyCode === 13){
    				addTaskBtn.click();
    			}
    		});
			//add task event handle
			addTaskBtn.click(function() {
			let inputFiledVal = $('#task-input').val();
				if (inputFiledVal == ""){
					$('.input-add').append("<p>This field cannot be empty</p>");
				}
				else{
					$('p').html("");
					octopus.addTask(inputFiledVal);
				}
				$('#task-input').val("");
			});
			//remove task event handle
			this.taskList = $('.task-list');
            this.taskTemplate = $('script[data-template="tasks"]').html();
            $('.task-list').on('click', '.remove-task', function(e) {
                let taskId = $(this).parents('.task').attr('id');
                //let nodeNb = $(this).parents('.task').index();
                octopus.removeTask(taskId);
                return false;
            });

		},
		render: function() {
			let taskList = this.taskList,
			taskTemplate= this.taskTemplate;
			taskList.html('');
			if (data.tasks){
				octopus.getActiveTask().map(function(task){
					let thisTemplate = taskTemplate.replace(/{{text}}/g, task.text)
													.replace(/{{date}}/g, task.time)
													.replace(/{{id}}/g, task.uid);
					taskList.append(thisTemplate);
				});
			}
		}
	};
	view.init();
	view.render();
}());

