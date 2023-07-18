

# API Documentation for Ecommerce Project API with Node.js and Express

Welcome to the documentation for the Ecommerce Project API! This API provides a set of endpoints and functionalities to interact with our eCommerce platform programmatically. With this API, you can build applications, integrations, and automate various tasks related to our online store.

**Base URL**: `http://localhost:5454`

## Authentication

All protected endpoints require the `Authorization` header with a valid token.

## Endpoints

### Update Cart Item

- **URL**: `/api/cart_items/{cartItemId}`
- **Method**: PUT
- **Tags**: cart-item-controller
- **Request Parameters**:
  - `cartItemId` (integer, int64, required)
- **Request Headers**:
  - `Authorization` (string, required)
- **Request Body**:
  ```json
  {
    "$ref": "#/components/schemas/CartItem"
  }
  ```
- **Responses**:
  - 200 OK
    ```json
    {
      "$ref": "#/components/schemas/CartItem"
    }
    ```

### Delete Cart Item

- **URL**: `/api/cart_items/{cartItemId}`
- **Method**: DELETE
- **Tags**: cart-item-controller
- **Request Parameters**:
  - `cartItemId` (integer, int64, required)
- **Request Headers**:
  - `Authorization` (string, required)
- **Responses**:
  - 200 OK
    ```json
    {
      "$ref": "#/components/schemas/ApiResponse"
    }
    ```

### Add Item to Cart

- **URL**: `/api/cart/add`
- **Method**: PUT
- **Tags**: cart-controller
- **Request Headers**:
  - `Authorization` (string, required)
- **Request Body**:
  ```json
  {
    "$ref": "#/components/schemas/AddItemRequest"
  }
  ```
- **Responses**:
  - 200 OK
    ```json
    {
      "$ref": "#/components/schemas/ApiResponse"
    }
    ```

... (continue documenting other endpoints)

## Components

### Schemas

- CartItem
- ApiResponse
- AddItemRequest
- Product
- Order
- User
- AuthResponse
- ReviewRequest
- Review
- RatingRequest
- Rating
- PaymentLinkResponse
- Address
- CreateProductRequest
- PageProduct

## Servers

- Server 1:
  - URL: `http://localhost:5454`
  - Description: Generated server URL

## Contact

For any queries or issues, please contact **Code With Zosh** at `codewithzosh`.

## License

This API is licensed under **Code With Zosh**.

Please note that this is just a template for the documentation, and you can customize it according to your specific needs. You can use the Swagger UI or ReDoc libraries to render this documentation using the OpenAPI specification. Also, don't forget to include relevant descriptions for the request/response payloads and any additional information that users may need to understand and use your API effectively.
