import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-and-network', // Fetch from cache and then refresh from network
          pollInterval: 5000, // Poll every 5 seconds (5000 milliseconds)
        },
    },    
});

export default client;