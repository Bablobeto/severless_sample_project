import "reflect-metadata";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { response } from "../../middlewares";
import { TodoDto } from "../../dtos/todo.dto";
import { TodoRepo } from "../../repos/todo.repo";

export const handler = async (
  event: APIGatewayProxyEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    const todo = await TodoRepo.findOne(event.pathParameters.todoId);
    return response.success("Todo details.", TodoDto.toJson(todo));
  } catch (error: any) {
    return response.error("Todo not found!", error.message);
  }
};
