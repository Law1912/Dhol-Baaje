import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ShankhnaadModule } from '@dhol-baaje/shankhnaad-gen';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      driver: ApolloDriver,
    }),
    ShankhnaadModule,
  ],
  providers: [],
})
export class AppModule {}
