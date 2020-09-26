const done = 'done';

export default class HtmlService {

    constructor(todoService) {
        this.todoService = todoService;
        this.bindFormEvent();
        this.listTasks();
    }

    bindFormEvent() {
        const form = document.querySelector('form');
        form.addEventListener('submit', event => {
            event.preventDefault();
            this.addTask(form.item.value);
            form.reset();
        })
    }

    async addTask(description) {
        const task = { description, done: false };
        const taskId = await this.todoService.save(task);
        task.id = taskId;
        this.addToHtmlList(task);
    }

    async listTasks() {
        const tasks = await this.todoService.getAll();
        tasks.forEach(task => this.addToHtmlList(task));
        //console.log(tasks);
    }

    async saveTask(taskId, isDone) {
        const task = await this.todoService.getById(taskId);
        task.done = isDone;
        this.todoService.save(task);
    }


    toggleTask(li) {
        const taskId = +li.getAttribute('data-item-id');
        li.classList.toggle(done);
        const isDone = li.classList.contains(done);
        this.saveTask(taskId, isDone);
        //TODO save info
    }

    async deleteTask(li) {
        const taskId = +li.getAttribute('data-item-id');
        await this.todoService.delete(taskId);
        li.remove();        
    }

    addToHtmlList(task) {
        const ul = document.querySelector('ul');
        const liElement = document.createElement('li');
        const spanElement = document.createElement('span');
        const btnElement = document.createElement('button');

        liElement.setAttribute('data-item-id', task.id);
        liElement.addEventListener('click', () => this.toggleTask(liElement));

        spanElement.textContent = task.description;

        btnElement.textContent = 'x';
        btnElement.addEventListener('click', event => {
            event.stopPropagation();
            this.deleteTask(liElement);
        })

        if(task.done) {
            liElement.classList.add(done);

        }

        liElement.appendChild(spanElement);
        liElement.appendChild(btnElement);
        ul.appendChild(liElement);


    }

}