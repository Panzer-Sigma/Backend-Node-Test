import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Resolver('Pokemon')
export class PokemonResolver {
  constructor(private readonly pokemonService: PokemonService) {}

  @Mutation('createOnePokemon')
  async createOnePokemon(@Args('data') data: CreatePokemonDto) {
    return this.pokemonService.createOnePokemon(data);
  }

  @Query('findManyPokemon')
  async findManyPokemon() {
    return this.pokemonService.findManyPokemon();
  }

  @Query('findOnePokemon')
  async findOnePokemon(@Args('id') id: number) {
    return this.pokemonService.findOnePokemon(id);
  }

  @Mutation('updateOnePokemon')
  async updateOnePokemon(
    @Args('id') id: number,
    @Args('data') data: UpdatePokemonDto,
  ) {
    return this.pokemonService.updateOnePokemon(id, data);
  }

  @Mutation('deleteOnePokemon')
  async deleteOnePokemon(@Args('id') id: number) {
    return this.pokemonService.deleteOnePokemon(id);
  }
}
