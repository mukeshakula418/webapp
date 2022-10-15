import { gql } from 'graphql-request/dist';

export const getDefaultUsers = gql`
  query getDefaultUsers {
    webapp_user {
      Name
      contact
      created_at
      email
      id
    }
  }
`;

export const getDefaultUsersbyID = gql`
  query getDefaultUsersbyID($id:Int) {
    webapp_user(where: {id: {_eq: $id}}) {
      Name
      contact
      created_at
      email
      id
    }
  }
`;

export const getProducts = gql`
    query getProducts {
        webapp_products {
            productId
            productName
            productCode
            releaseDate
            description
            price
            starRating
            imageUrl
        }
    }
`;

export const getProductsByID = gql`
  query getProductsById($id:Int) {
    webapp_products(where: {productId: {_eq: $id}}) {
      description
      imageUrl
      price
      productCode
      productId
      productName
      releaseDate
      starRating
    }
  }
`;

export const insertProduct = gql`
    mutation insert_webapp_products($object: webapp_products_insert_input!) {
      insert_webapp_products_one(object: $object) {
        productId
        productName
        productCode
        releaseDate
        price
        starRating
        description
        imageUrl
      }
    }
`;