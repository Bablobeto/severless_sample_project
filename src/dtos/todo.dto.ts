import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";
import { Todo } from "../entities/todo.entity";

/*
* 
  The DTO class serves as a bridge between raw data 
  (e.g., from HTTP requests) and the Todo entity, 
  ensuring data integrity and validation. 
  It provides methods to convert between plain objects and the TodoDto class, 
  as well as to convert Todo entities to plain objects. 

  This setup helps maintain clean, validated data throughout the application.
*/

export class TodoDto {
  /*
  * Validation
  */

  @IsUUID("all", { message: "Invalid ID", groups: [] })
  @IsNumber()
  id: string;

  @IsString()
  @IsNotEmpty({ message: "Title is required", groups: ["create", "update"] })
  title: string;

  @IsString()
  @IsNotEmpty({ message: "Description is required", groups: ["create", "update"] })
  description: string;

  /*
  * End of Validation
  */

  public static fromJson(data: { [key: string]: any }): TodoDto {
    const todo: TodoDto = new TodoDto();

    if (data?.id) todo.id = data.id;
    if (data?.title) todo.title = data.title;
    if (data?.description) todo.description = data.description;

    return todo;
  }

  public static toJson(todo: Todo): object {
    if (!todo) {
      return;
    }

    return {
      id: todo.id,
      name: todo.title,
      description: todo.description,
    };
  }

  public static toArray(todos: Todo[]): object[] {
    return todos.map((todo) => this.toJson(todo));
  }
}
