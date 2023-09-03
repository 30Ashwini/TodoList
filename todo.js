let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

function addTaskToDOM(task)
{
	const li=document.createElement('li');

	li.innerHTML = `
	<input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
	<label for="${task.id}"> ${task.title} </label>
	<img src="http://127.0.0.1:5500/download.jpg"  class="delete" data-id="${task.id}" />`;
	tasksList.append(li);

}




function renderList () {

tasksList.innerHTML='';

for(let i=0; i<tasks.length; i++)
{
	addTaskToDOM(tasks[i]);
}

tasksCounter.innerHTML=tasks.length;


}

function markTaskAsComplete (taskId) {
                const task = tasks.filter(function(task)
				{

                    return task.id === Number(taskId);

				});

				if (task.length>0)
				{
					   const currentTask = task[0];
					   currentTask.completed=!currentTask.completed;
					   renderList();
					   showNotification('Toggled successfully');
					   return;
				}

}

function deleteTask(taskId) {
 tasks = tasks.filter(function (task) {
    return task.id != taskId;
  });

  

  renderList();
  showNotification('Task deleted successfully');
}

function addTask (task) {
     if(task)
	{
		tasks.push(task);
		renderList();
		showNotification('Task added successfully');
		return;

	}
		showNotification('Task cannot be added');

}

function showNotification(text) {
	alert(text);
}


function handleClickListener(e){
	const target=e.target;

	if(target.className =='delete')
	{
		const taskId= target.dataset.id;
		deleteTask(taskId);
		return;
	}
	else if(target.className == 'custom-checkbox')
	{
		const taskId=e.target.id;
		markTaskAsComplete(taskId);    
		return;
	}

}


function addEventHandlerToTask(e)
{

	     if(e.key=='Enter')
	     {
	     	const text=e.target.value;

	     	if(!text)
	     	{

	     		showNotification('Task  cannot be empty');
	     		return;
	     	}

	     	const task={title:text,
	     	            id:Date.now(),
	     	            completed:false
	     }

	     	addTask(task);
	     }
}



function initializeApp(){


addTaskInput.addEventListener('keyup', addEventHandlerToTask);
document.addEventListener('click',handleClickListener );
//document.addEventListener('click',handleClickListener);
}


initializeApp();