import { Prisma } from '@prisma/client';

export const user: Prisma.UserCreateManyInput[] = [
  {
    id: 'cjld2cjxh0000qzrmn831i7rn',
    email: 'john@doe.com',
    password: '$2b$10$qtzUoXUYKhu9qSZbHwRqxecsYwi6h0pHgFSUgV.haeuBR2Phyov7W', // = password
    firstname: 'John',
    lastname: 'Doe',
  },
];
