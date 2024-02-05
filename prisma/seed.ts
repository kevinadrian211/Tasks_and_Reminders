import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  // Seed Users
  const user1 = await prisma.user.create({
    data: {
      username: 'john_doe',
      email: 'john@example.com',
      password: 'securepassword', // Ajusta esto según tus necesidades de autenticación
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'jane_doe',
      email: 'jane@example.com',
      password: 'securepassword', // Ajusta esto según tus necesidades de autenticación
    },
  });

  // Seed Tasks
  const task1 = await prisma.task.create({
    data: {
      userId: user1.id,
      title: 'Task 1',
      description: 'Description for Task 1',
      dueDate: new Date('2024-02-01'),
      status: 'Pending',
    },
  });

  const task2 = await prisma.task.create({
    data: {
      userId: user2.id,
      title: 'Task 2',
      description: 'Description for Task 2',
      dueDate: new Date('2024-02-15'),
      status: 'InProgress',
    },
  });

  // Seed Reminders
  await prisma.reminder.createMany({
    data: [
      {
        taskId: task1.id,
        message: 'Reminder for Task 1',
        reminderDate: new Date('2024-01-31'),
      },
      {
        taskId: task2.id,
        message: 'Reminder for Task 2',
        reminderDate: new Date('2024-02-10'),
      },
    ],
  });

  console.log('Seed data inserted successfully');
}

seed()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
