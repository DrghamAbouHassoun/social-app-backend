import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthorInput } from 'src/interfaces/author.interface';
import { Author } from 'src/schemas/author.schema';

@Injectable()
export class AuthorService {
  constructor(@InjectModel(Author.name) private authorModel: Model<Author>) {}

  async getAuthors(): Promise<Author[]> {
    return await this.authorModel.find();
  }

  async addAuthor(author: AuthorInput) {
    return this.authorModel.create({
      name: author.name,
      bio: author.bio,
    });
  }

  async getSingleAuthor(): Promise<Author> {
    return await this.authorModel.findOne();
  }
}
