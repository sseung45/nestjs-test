import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entity/cats.entity';
import { getConnection, Repository } from 'typeorm';
import { updateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
    constructor(
        @InjectRepository(Cat)
        private catsRepository: Repository<Cat>
    ) {}

    findAll(): Promise<Cat []> {
        return this.catsRepository.find();
    }

    findOne(id: number): Promise<Cat> {
        return this.catsRepository.findOne({where:{id}});
    }

    async create(cat: Cat): Promise<void> {
        await this.catsRepository.save(cat);
    }

    async remove(id: number): Promise<void> {
        await this.catsRepository.delete(id)
    }

    async update(id: number, updateCatDto: updateCatDto): Promise<void> {
        const cat = await this.catsRepository.findOne({where:{id}});

        if (!cat) {
            throw new Error('cat not found!');
        }
        Object.assign(cat, updateCatDto);
        await this.catsRepository.save(cat);

        // if (existedCat) {
        //     await getConnection()
        //         .createQueryBuilder()
        //         .update(Cat)
        //         .set({
        //             name: updateCatDto.name,
        //             age: updateCatDto.age,
        //             breed: updateCatDto.breed
        //         })
        //         .where("id = :id", {id})
        //         .execute()
        // }
    }
}
