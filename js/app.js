$(function() {
	//check if I have smth in localStorage.
	let storedData = localStorage.getItem("list_data_key");
	let data = {
		tasks: []
	};
	if (storedData) {
	    data.tasks = JSON.parse(storedData);
	}

	let octopus = {
		//addTask function that push new obj to model push it as an object
		addTask: function(text) {
			let utc = (new Date()).toString().split(' ').splice(1,4).join(' ');
			data.tasks.push({
				time: utc,
				text
			})
			view.render();
			localStorage.setItem("list_data_key",  JSON.stringify(data.tasks));
			console.log(localStorage.list_data_key);
		},
		getActiveTask: function() {
			let activeTasks = data.tasks;
			return activeTasks;
		},
		removeTask: function(node) {
			data.tasks.splice(node, 1);
			view.render();
		}
	};

	let view = {
	// init function that grab btn and call octopus.addTask()
		init: function() {
			const addTaskBtn = $('.add-task');
			$("#add").keyup(function(event) {
    			if (event.keyCode === 13){
    				addTaskBtn.click();
    			}
    		});
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
			this.taskList = $('.task-list');
            this.taskTemplate = $('script[data-template="tasks"]').html();
            $('.task-list').on('click', '.remove-task', function(e) {
                //let taskId = $(this).parents('.task').attr('id');
                let nodeNb = $(this).parents('.task').index();
                octopus.removeTask(nodeNb);
                return false;
            });

		},
		render: function() {
			let taskList = this.taskList,
			taskTemplate= this.taskTemplate;
			taskList.html('');
			octopus.getActiveTask().map(function(task){
				let thisTemplate = taskTemplate.replace(/{{text}}/g, task.text)
												.replace(/{{date}}/g, task.time);
				taskList.append(thisTemplate);
			});
		}
	};
	view.init();
	view.render();
}());

