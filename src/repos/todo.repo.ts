import AppDataSource from '../utils/database';
import { Todo } from "../entities/todo.entity";
import { TodoDto } from "../dtos/todo.dto";

export class TodoRepo {
  private static async getRepository(): Promise<any> {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    return await AppDataSource.getRepository(Todo);
  }

  static async create(data: TodoDto): Promise<Todo> {
    try {
      const todoRepository = await this.getRepository();
      const newTodo = todoRepository.create(data);
      return await todoRepository.save(newTodo);
    } catch (error) {
      throw error;
    }
  }

  static async findAll(): Promise<Todo[]> {
    try {
      const todoRepository = await this.getRepository();
      return await todoRepository.find();
    } catch (error) {
      throw error;
    }
  }

  static async findOne(id: string): Promise<Todo | null> {
    try {
      const todoRepository = await this.getRepository();
      return await todoRepository.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  static async update(id: string, data: Partial<TodoDto>): Promise<Todo> {
    try {
      const todoRepository = await this.getRepository();
      await todoRepository.update(id, data);
      return await this.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      const todoRepository = await this.getRepository();
      return await todoRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  static async clearAll(): Promise<void> {
    try {
      const todoRepository = await this.getRepository();
      await todoRepository.clear()
    } catch (error) {
      throw error;
    }
  }
}
