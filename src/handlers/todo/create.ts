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
import AppDataSource from "../../utils/database";

export const handler = Middleware.use(
  [validator(TodoDto, "create")],
  async (
    event: APIGatewayProxyEvent,
    _context: Context
  ): Promise<APIGatewayProxyResult> => {
    try {
      const data = TodoDto.fromJson(JSON.parse(event.body!));
      const user = await TodoRepo.create(data);
      return response.success("Todo created successfully.", TodoDto.toJson(user));
    } catch (error: any) {
      return response.error("Todo not created!", error.message);
    }
    finally {
      if (AppDataSource.isInitialized) {
        await AppDataSource.destroy();
      }
    }
  }
);
