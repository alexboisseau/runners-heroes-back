import { PrismaClient } from '@prisma/client';
import * as seedData from './seeds';

const prisma = new PrismaClient();
const models = ['user'];

const main = async () => {
  process.stdout.write('\n');
  console.log(`🚜 Starting seeds...`);
  process.stdout.write('\n');

  try {
    for (const model of models) {
      if (seedData[model].length > 0) {
        console.log(
          `🎯 Starting generate ${seedData[model].length} ${model}...`,
        );

        for (const value of seedData[model]) {
          await prisma[model].upsert({
            where: {
              id: value.id,
            },
            create: value,
            update: {},
          });
        }

        console.log(
          `🔥 ${seedData[model].length} elements in ${model} inserted.`,
        );
        process.stdout.write('\n');
      }
    }
  } catch (error) {
    throw error;
  }
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
