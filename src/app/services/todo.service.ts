import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../models/Todo';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todosLimit = '_limit=5';
  todosUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todosUrl}?${this.todosLimit}`)
  }

  toggleCompleted(todo: Todo): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }

  deleteTodo(todo: Todo): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions)
  }

  addTodo(todo: Todo): Observable<any> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }

}
