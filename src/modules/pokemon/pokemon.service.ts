import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Injectable()
export class PokemonService {
  constructor(private readonly prisma: PrismaService) {}

  async createOnePokemon(data: CreatePokemonDto) {
    return this.prisma.pokemon.create({
      data,
    });
  }

  async findManyPokemon() {
    return this.prisma.pokemon.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOnePokemon(id: number) {
    const pokemon = await this.prisma.pokemon.findUnique({
      where: { id },
    });

    if (!pokemon) {
      throw new NotFoundException(`Pokemon with ID ${id} not found`);
    }

    return pokemon;
  }

  async updateOnePokemon(id: number, data: UpdatePokemonDto) {
    await this.findOnePokemon(id);

    return this.prisma.pokemon.update({
      where: { id },
      data,
    });
  }

  async deleteOnePokemon(id: number) {
    await this.findOnePokemon(id);

    await this.prisma.pokemon.delete({
      where: { id },
    });

    return { message: `Pokemon with ID ${id} has been deleted` };
  }
}
