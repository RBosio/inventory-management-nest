import { Module } from "@nestjs/common"
import { DatabaseModule } from "./database/database.module"
import { ConfigModule } from "@nestjs/config"
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    DatabaseModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
