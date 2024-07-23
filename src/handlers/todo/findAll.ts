import "reflect-metadata";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { response } from "../../middlewares";
import { TodoDto } from "../../dtos/todo.dto";
import { TodoRepo } from "../../repos/todo.repo";
import AppDataSource from "../../utils/database";

export const handler = async (
  event: APIGatewayProxyEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    const todos = await TodoRepo.findAll(); 
    return response.success("All todos fetched.", TodoDto.toArray(todos));
  } catch (error: any) {
    return response.error("Todos not found!", error.message);
  }
  finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
};
