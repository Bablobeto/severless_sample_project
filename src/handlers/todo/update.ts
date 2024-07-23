import "reflect-metadata";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { response, validator } from "../../middlewares";
import { TodoDto } from "../../dtos/todo.dto";
import { TodoRepo } from "../../repos/todo.repo";
import { Middleware } from "../../services/middleware";

export const handler = Middleware.use(
  [validator(TodoDto, "update")],
  async (
    event: APIGatewayProxyEvent,
    _context: Context
  ): Promise<APIGatewayProxyResult> => {
    try {
      const data = TodoDto.fromJson(JSON.parse(event.body!));
      const todo = await TodoRepo.update(event.pathParameters.todoId, data);
      return response.success("Todo updated successfully.", TodoDto.toJson(todo));
    } catch (error: any) {
      return response.error("Todo not updated!", error.message);
    }
  }
);
