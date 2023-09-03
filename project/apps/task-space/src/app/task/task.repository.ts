import { CRUDRepository } from '@project/util/util-types';
import { TaskEntity } from './task.entity';
import { TaskInterface } from '@project/shared/app-types';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TaskQuery } from './query/task.query';

@Injectable()
export class TaskRepository implements CRUDRepository<TaskEntity, number, TaskInterface> {
  constructor(
    private readonly prisma: PrismaService
  ) {
  }

  public async create(entity: TaskEntity): Promise<TaskInterface> {
    const entityData = entity.toObject();
    return this.prisma.task.create({
      data: {
        ...entityData,
        comments: { connect: [] },
        tags: {
          connect: entityData.tags.map(({ tagId }) => ({ tagId }))
        },
        category: {
          connect: {
            categoryId: entityData.category.categoryId
          }
        }
      },
      include: {
        comments: true,
        category: true,
        tags: true
      }
    });
  }

  public async findById(id: number): Promise<TaskInterface | null> {
    return this.prisma.task.findFirst({
      where: {
        taskId: id
      },
      include: {
        comments: true,
        category: true,
        tags: true
      }
    });
  }

  public async remove(id: number): Promise<void> {
    await this.prisma.task.delete({
      where: {
        taskId: id
      }
    });
  }

  public async update(_id: number, _entity: TaskEntity): Promise<TaskInterface> {
    return Promise.resolve(undefined);
  }

  public async find({ limit, page, sortDirection }: TaskQuery): Promise<TaskInterface[]> {
    return this.prisma.task.findMany({
      include: {
        comments: true,
        category: true,
        tags: true
      },
      take: limit,
      orderBy: [
        { createdAt: sortDirection }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }
}
