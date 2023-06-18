import { gql } from 'graphql-request/dist';

export const getDefaultUsers = gql`
    query getDefaultUsers {
        users {
            user_id
            username
            email
            contact
            enrolled_dt
        }
    }
`;

export const getDefaultUsersbyID = gql`
  query getDefaultUsersbyID($id:bigint) {
    users (where: {user_id: {_eq: $id}}) {
        user_id
        username
        email
        contact
        enrolled_dt
    }
  }
`;

export const getProducts = gql`
    query getProducts {
        products {
            productId
            productName
            productCode
            releaseDate
            productDescription
            price
            starRating
            imageUrl
        }
    }
`;

export const getProductsByID = gql`
  query getProductsById($id:Int) {
    products(where: {productId: {_eq: $id}}) {
        productId
        productName
        productCode
        releaseDate
        productDescription
        price
        starRating
        imageUrl
    }
  }
`;

export const insertProduct = gql`
    mutation insert_products($object: products_insert_input!) {
      insert_products_one(object: $object) {
        productId
        productName
        productCode
        releaseDate
        productDescription
        price
        starRating
        imageUrl
      }
    }
`;
