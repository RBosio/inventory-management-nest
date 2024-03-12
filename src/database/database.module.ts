import { Module } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        url: configService.get("MYSQL_URI"),
        database: configService.get("MYSQL_DATABASE"),
        entities: [],
        synchronize: configService.get("MYSQL_SYNC")
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
