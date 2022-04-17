import {ApolloClient, InMemoryCache} from '@apollo/client'

const client = new ApolloClient({
    url : 'https://nice-jay-24.hasura.app/v1/graphql',
    cache : new InMemoryCache(),
    headers : {
        'x-hasura-admin-secret' :
            'QchsgVIiFbztsTAHwnBi0GaVsdB1oyThpDHlaAjdpbMv4f4p00jZklL8pXl9JI26',
    },
});

export default client