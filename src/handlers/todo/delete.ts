import "reflect-metadata";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { response } from "../../middlewares";
import { TodoRepo } from "../../repos/todo.repo";

export const handler = async (
  event: APIGatewayProxyEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
    try {
      await TodoRepo.delete(event.pathParameters.todoId);
      return response.success("Todo deleted.");
    } catch (error: any) {
      return response.error("Todo not deleted!", error.message);
    }
};
