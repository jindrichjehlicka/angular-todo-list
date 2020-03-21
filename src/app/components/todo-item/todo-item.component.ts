import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from './../../models/Todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) { }

  ngOnInit(): void { }

  setClasses = () => ({
    todo: true,
    'is-completed': this.todo.completed
  })
  // UI toggle
  onToggle = (todo: Todo) => {
    // UI toggle
    todo.completed = !todo.completed;
    // Server toggle
    this.todoService.toggleCompleted(todo).subscribe(todo => console.log(todo));
  }

  onDelete = (todo: Todo) => this.deleteTodo.emit(todo);
}
