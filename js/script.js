var $addButton, $input, $list, $empty, listCount, $clearBtn; 
var $empty, $countNumber, $count, $clearBtn, $task;
var incrementation = 0;

var main = function() {
    prepareDOMElements();
    prepareDOMEvents();
    toggleEmptyDiv();
}

var createListElement = function(title, priority) { 
    var $li = document.createElement('li');    
    $li.textContent = title;    
  
    var liId = 'todo' + incrementation;
    
    $li.id = liId;

    switch(priority){
        case "1":
            $li.style.background = '#db5755'
            break;
        case "2":
            $li.style.background = '#f6d063'
            break;
        default:
            $li.style.background = '#00b69d'
            break;            
    }
    
    var $span = document.createElement('span');
    $span.className = 'close';
    var $far = document.createElement('i');
    $far.className = "far fa-times-circle";
    $far.dataset.id = liId;
    $far.dataset.action = 'delete';
    
    incrementation ++;
    
    $span.append($far);    
    $li.append($span);
    return $li;    
};

var addTodo = function() {
    if ($input.value.trim() !== '') {
        var priority = document.getElementById('priority').value;
        $list.append(createListElement($input.value, priority));
        $input.value = '';
    }
    toggleEmptyDiv();
};

var deleteTodo = function(nodeElement) {
    nodeElement.remove();
    toggleEmptyDiv();
};

var listClickHandler = function(event) {
    if(event.target.dataset.action === 'delete') {
        deleteTodo($list.querySelector('#' + event.target.dataset.id));
    } else {
        event.target.className = (event.target.className === 'checked') ? '' : 'checked';
    }
};

var prepareDOMElements = function() {
    $addButton = document.getElementById('addBtn');
    $input = document.getElementById('title');
    $list = document.getElementById('list');
    $empty = document.getElementById("empty-list");    
    $countNumber = document.getElementById("countNumber");
    $count = document.getElementById("count");
    $clearBtn = document.getElementById("clearBtn");
    $task = document.getElementById("task");
};

var prepareDOMEvents = function() {
    $addButton.addEventListener('click', addTodo);
    $list.addEventListener('click', listClickHandler);
    $clearBtn.addEventListener("click", clearList);
};

function toggleEmptyDiv() {    
    var listCount = $list.childElementCount;
    if(listCount <= 0) {
        $empty.style.display = "block";
        $countNumber.style.display = "none";
    } else{
        $empty.style.display = "none";
        $countNumber.style.display = "block";
        $count.textContent = listCount; 
        if (listCount == 1){
            $task.textContent = "zadanie";
        } else if ((listCount > 1) && (listCount < 5)){
            $task.textContent = "zadania";
        } else{
            $task.textContent = "zadań";
        }
    }    
}

function clearList () {
    $list.innerHTML = '';
    $countNumber.style.display = "none";
    $empty.style.display = "block";    
}

document.addEventListener('DOMContentLoaded', main);