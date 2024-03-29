import { NestFactory } from "@nestjs/core"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { AppModule } from "./app.module"
import { ConfigService } from "@nestjs/config"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)
  const PORT = configService.get("PORT") || 3000

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("Inventory management")
    .setVersion("1.0")
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)

  await app.listen(PORT)
  console.log("app listen on port:", PORT)
}
bootstrap()
