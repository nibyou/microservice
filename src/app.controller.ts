import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse } from '@nestjs/swagger';
import { JsonResponse } from './types/JsonResponse';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @ApiResponse({
    status: 200,
    description: 'API health check',
    type: JsonResponse,
  })
  getHealth(): JsonResponse {
    return this.appService.getHealth();
  }
}
