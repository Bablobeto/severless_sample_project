import "reflect-metadata";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { response, validator } from "../../middlewares";
import { TodoRepo } from "../../repos/todo.repo";

export const handler = async (
    event: APIGatewayProxyEvent,
    _context: Context
  ): Promise<APIGatewayProxyResult> => {
    try {
      await TodoRepo.clearAll();
      return response.success("Todo cleared successfully.");
    } catch (error: any) {
      return response.error("Todo not cleared!", error.message);
    }
  };
