import { Body, Controller, Get } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from './prisma.service';

import { CreateNotificationBody } from '../create-notification-body';

@Controller('notifications')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  getHello() {
    return this.prisma.notification.findMany();
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    console.log(body);
    const { content, category, recipientId } = body;
    await this.prisma.notification.create({
      data: {
        id: randomUUID(),
        content,
        category,
        recipientId,
      },
    });
  }
}
