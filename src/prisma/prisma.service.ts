import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

    //create a connection to PostgreSQL
    constructor() {
        super({               // initializing PrismaClient
            adapter: new PrismaPg({                     // use PostgreSQL as the DB and connect it to using adapter
                connectionString: process.env.DATABASE_URL!,  // ! defines that this value is not null or undefined
            }),
        });
    }

    //Connect to database when app starts 
    async onModuleInit() {
        await this.$connect();  //Connect Prisma Client to the database
    }
}
