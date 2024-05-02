import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ImageModule } from './modules/images/images.module';
import { MulterModule } from '@nestjs/platform-express';
import { CategoryModule } from './modules/categories/category.module';
import { BooksModule } from './modules/books/books.module';
import { AuthorModule } from './modules/authors/author.module';
import { PostModule } from './modules/posts/post.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StaticFilesModule } from './modules/staticfiles/staticfile.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://127.0.0.1/mern-db"),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
    }),
    CategoryModule,
    BooksModule,
    AuthorModule,
    UserModule,
    AuthModule,
    ImageModule,
    PostModule,
    StaticFilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
