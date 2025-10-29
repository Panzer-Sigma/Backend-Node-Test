import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  async createOnePokemon(
    @Body(ValidationPipe) createPokemonDto: CreatePokemonDto,
  ) {
    return this.pokemonService.createOnePokemon(createPokemonDto);
  }

  @Get()
  async findManyPokemon() {
    return this.pokemonService.findManyPokemon();
  }

  @Get(':id')
  async findOnePokemon(@Param('id', ParseIntPipe) id: number) {
    return this.pokemonService.findOnePokemon(id);
  }

  @Put(':id')
  async updateOnePokemon(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updatePokemonDto: UpdatePokemonDto,
  ) {
    return this.pokemonService.updateOnePokemon(id, updatePokemonDto);
  }

  @Delete(':id')
  async deleteOnePokemon(@Param('id', ParseIntPipe) id: number) {
    return this.pokemonService.deleteOnePokemon(id);
  }
}
