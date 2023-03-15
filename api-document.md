# FITFOOD API

URL: `https://api.fitfood.kd14.me/api/`\
TOKEN: `headers: authorization: Bearer ` <**token**>

## Response Format

Object

```json
{
  "status": "string",
  "data": "any"
}
```

Example

```json
{
  "status": 200,
  "data": [
    {
      "ProductTypeID": 1,
      "Name": "Đồ uống"
    },
    {
      "ProductTypeID": 2,
      "Name": "Đồ ăn"
    }
  ]
}
```

---

## Error Response Format

<details>
 <summary><code>See all</code></code></summary>

### Route Invalid || Token Invalid

Example
status: `<status>`

```json
{
  "message": "${Error Message}"
}
```

### Other Errors

```json
{
  "status": "status",
  "message": "${Error Message}"
}
```

</details>

---

## Authentication & Authorization: `/auth`

<details>
 <summary><code>POST (/login)</code></code></summary>

### Request

#### Url: `/auth/login`

#### Body

```json
{
  "Username": "duytran@gmail.com",
  "Password": "123123"
}
```

### Responses

```json
{
  "data": {
    "Username": "duytran@gmail.com",
    "Role": 2,
    "IsActive": 2,
    "Name": "Khánh Duy",
    "DayOfBirth": "2000-09-01",
    "PhoneNumber": "0333121131",
    "Gender": 1,
    "Province": "79",
    "District": "773",
    "Ward": "27283",
    "Address": "Ho Chi Minh",
    "Avatar": null,
    "AccessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6ImR1eXRyYW5AZ21haWwuY29tIiwiUm9sZSI6MiwiSXNBY3RpdmUiOjIsImlhdCI6MTY3ODg2MDY2NSwiZXhwIjoxNjc4ODYwOTY1fQ._qs3n7r9jgTYq1MYw8q50hbQpjtkOU4aUemLkGeVjp4"
  },
  "status": 200
}
```

</details>

<details>
 <summary><code>POST (/register)</code></code></summary>

### Request

#### Url: `/auth/register`

#### Body

```json
{
  "Username": "test@gmail.com",
  "Password": "123123",
  "Role": "2",
  "IsActive": "2",
  "Name": "Khánh Duy Nè",
  "DayOfBirth": "1995-12-10",
  "PhoneNumber": "0333333312",
  "Gender": 1,
  "Province": 79,
  "District": 767,
  "Ward": 27022,
  "Address": "423 Điện biên phủ",
  "Avatar": "EmployeeAvatar_3.png"
}
```

### Responses

```json
{
  "data": {
    "Username": "test@gmail.com",
    "IsValid": 1,
    "AccessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InRlc3RAZ21haWwuY29tIiwiUm9sZSI6IjIiLCJJc0FjdGl2ZSI6IjIiLCJpYXQiOjE2Nzg4NjE0OTMsImV4cCI6MTY3ODg2MTc5M30.4zM9qC75362xGl70mQ5UL7Xsq-NyTT6VNSzf-Bv7BpA"
  },
  "status": 201
}
```

</details>

<details>
 <summary><code>POST (/logout)</code></code></summary>

### Request

#### Url: `/auth/logout`

### Responses

```json
{
  "status": 200,
  "message": "Logout Successfully"
}
```

</details>

<details>
 <summary><code>POST (/send-email-verify)</code></code></summary>

### Request

#### Url: `/auth/send-email-verify`

### Responses

```json
{
  "status": 200,
  "message": "Gửi Email thành công!"
}
```

</details>

<details>
 <summary><code>POST (/verify-email)</code></code></summary>

### Request

#### Url: `/auth/verify-email`

#### Body:

```json
{
  "code": "123124"
}
```

### Responses

```json
{
  "status": 400,
  "message": "Gửi Email thành công!"
}
```

</details>

<details>
 <summary><code>GET (/refresh)</code></code></summary>

### Request

#### Url: `/products/refresh`

### Responses

```json
{
  "status": 200,
  "data": {
    "AccessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6ImR1eXRyYW5AZ21haWwuY29tIiwiUm9sZSI6MiwiSXNBY3RpdmUiOjIsImlhdCI6MTY3ODg2MTc4NSwiZXhwIjoxNjc4ODYyMDg1fQ.eSKG0jFrUG6kVo7_JVl6En1CjhDLSPRjN8Oja6MaDpQ"
  }
}
```

</details>

---

## User: `/user`

<details>
 <summary><code>GET (/me)</code></code></summary>

### Request

#### Url: `/user/me`

### Responses

```json
{
  "data": {
    "Username": "duytran@gmail.com",
    "Role": 2,
    "IsActive": 2,
    "Name": "Khánh Duy",
    "DayOfBirth": "2000-09-01",
    "PhoneNumber": "0333121131",
    "Gender": 1,
    "Province": "79",
    "District": "773",
    "Ward": "27283",
    "Address": "Ho Chi Minh",
    "Avatar": null
  },
  "status": 200
}
```

</details>

<details>
 <summary><code>PUT (/update)</code></code></summary>

### Request

#### Url: `/user/update`

#### Body (FormData):

```json
{
  "Name": "Khánh Duy2",
  "UserAvatar": "/Users/daiquocviet4/Downloads/about-6.png",
  "DayOfBirth": "2001/11/13",
  "PhoneNumber": "0333122111",
  "Gender": 1,
  "Province": 79,
  "District": 767,
  "Ward": 27022,
  "Address": "Ho Chi Minh"
}
```

### Responses

```json
{
  "status": 200,
  "message": "Cập nhật thành công"
}
```

</details>

<details>
 <summary><code>POST (/update-password)</code></code></summary>

### Request

#### Body (FormData):

```json
{
  "password": "123123",
  "newPassword": "1231231"
}
```

### Responses

```json
{
  "status": 200,
  "message": "Đổi mật khẩu thành công"
}
```

 </details>

---

## Products: `/products`

<details>
 <summary><code>GET</code></code></summary>

### Request

#### Url: `products?page=1&limit=30`

#### Query Params:

- `page`: number (Default: 1)
- `limit`: number. (Default: 5)
- `search`: string.
- `order`:'DESC' || 'ASC' (Default: DESC)
- `order_field`: string (Default: "SoldQuantity")
- `order_field`: string (Default: "SoldQuantity")
- `price_max`: number
- `price_min`: number
- `high_light`: number
- `rating`: number (Default: 0)

### Responses

```json
{
  "status": 200,
  "data": {
    "data": [
      {
        "ProductID": 2,
        "Name": "FITFOOD JUICE SWEETIE",
        "Price": 200000,
        "Quantity": 21353,
        "Avatar": "http://api.fitfood.kd14.me/images/ProductAvatar_2.png",
        "Unit": "Chai",
        "Highlight": 2,
        "ProductTypeID": 1,
        "ProductTypeName": "Đồ uống",
        "SoldQuantity": "448346",
        "Rating": 4.8
      }
    ],
    "pagesize": 1
  }
}
```

</details>

<details>
 <summary><code>GET (/:product-id)</code></code></summary>

### Request

#### Url: `/products/<ProductID>`

### Responses

```json
{
  "status": 200,
  "data": {
    "ProductID": 2,
    "Name": "FITFOOD JUICE SWEETIE",
    "Price": 200000,
    "Quantity": 21353,
    "Avatar": "http://api.fitfood.kd14.me/images/ProductAvatar_2.png",
    "Unit": "Chai",
    "Highlight": 2,
    "ProductTypeID": 1,
    "ProductTypeName": "Đồ uống",
    "SoldQuantity": "448346",
    "Rating": 4.8
  }
}
```

</details>

<details>
 <summary><code>POST</code></code></summary>

### Request

#### Body (FormData):

```json
{
  "Name": "string",
  "Price": "number",
  "Quantity": "number",
  "Avatar": "URL Avatar (jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)",
  "Unit": "string",
  "Highlight": "number",
  "ProductTypeID": "number"
}
```

### Responses

```json
{
  "status": 200,
  "message": "Thêm thành công"
}
```

 </details>

<details>
 <summary><code>PUT</code></code></summary>

### Request

#### Url: `/products/<ProductID>`

#### Body (FormData):

```json
{
  "Name": "string",
  "Price": "number",
  "Quantity": "number",
  "Avatar": "URL Avatar (jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)",
  "Unit": "string",
  "Highlight": "number",
  "ProductTypeID": "number"
}
```

### Responses

````json
```json
{
  "status": 200,
  "message": "Cập nhật thành công"
}
````

 </details>

 </details>

<details>
 <summary><code>DELETE</code></code></summary>

### Request

#### Url: `/products/<ProductID>`

### Responses

````json
```json
{
  "status": 200,
  "message": "Xóa thành công"
}
````

 </details>

---

## ProductTypes: `/product-type`

<details>
 <summary><code>GET</code></code></summary>

### Responses

```json
{
  "status": 200,
  "data": [
    {
      "ProductTypeID": 1,
      "Name": "Đồ uống"
    },
    {
      "ProductTypeID": 2,
      "Name": "Đồ ăn"
    }
  ]
}
```

</details>

---

## Purchase: `/purchase`

<details>
 <summary><code>GET</code></code></summary>

### Request

#### Url: `/products?state=-1`

#### State:

- `-1`: Get purchases in cart.

- `1`: Get purchases in order state.
- `2`: Get purchases in success state.

### Responses

```json
{
    "status": 200,
    "data": {
        "data": [
            {
                "BillID": 3,
                "Date": "2021-10-11",
                "State": 1,
                "CustomerName": "Duy",
                "PhoneNumber": "0333122222",
                "Address": "An Hòa Đông",
                "Price": 38739630000,
                "Products": [
                    {
                        "ProductID": 12,
                        "Quantity": 239892,
                        "Name": "Biscotti vị trà xanh ",
                        "Unit": "Hộp",
                        "Avatar": "http://api.fitfood.kd14.me/images/ProductAvatar_12.png",
                        "SalePrice": 150000
                    },
                    {
                        "ProductID": 13,
                        "Quantity": 13123,
                        "Name": "Biscotti vị truyền thống",
                        "Unit": "Hộp",
                        "Avatar": "http://api.fitfood.kd14.me/images/ProductAvatar_13.png",
                        "SalePrice": 210000
                    }
                ]
            },
}
```

</details>

<details>
 <summary><code>POST (/add-to-cart)</code></code></summary>

### Request

#### Url: `/purchase/add-to-cart`

#### Body:

```json
{
  "ProductID": "9",
  "Quantity": "1"
}
```

### Responses

```json
{
  "status": 201,
  "message": "Thêm vào giỏ hàng thành công"
}
```

 </details>

 <details>
 <summary><code>POST (/buy-products)</code></code></summary>

### Request

#### Url: `/purchase/buy-products`

#### Body:

```json
{
  "State": "2",
  "Date": "2020-10-11",
  "Name": "Duy",
  "PhoneNumber": "0333111222",
  "Address": "Quận 3",
  "Products": [
    {
      "ProductID": "1",
      "Quantity": "2",
      "SalePrice": "13000"
    },
    {
      "ProductID": "3",
      "Quantity": "4",
      "SalePrice": "15000"
    }
  ]
}
```

### Responses

```json
{
  "status": 200,
  "message": "Đặt hàng thành công"
}
```

 </details>

<details>
 <summary><code>PUT (/update-cart)</code></code></summary>

### Request

#### Example: `/purchase/update-cart`

#### Body (FormData):

```json
{
  "ProductID": "5",
  "Quantity": "5"
}
```

### Responses

````json
```json
{
    "status": 200,
    "message": "Cập nhật giỏ hàng thành công"
}
````

 </details>

 </details>

<details>
 <summary><code>DELETE (Delete Products in Cart)</code></code></summary>

### Request

#### Body:

- option 1: `[]`: Delete all
- option 2: `['ProductID1','ProductID2',...]`:

```json
["9", "1"]
```

### Responses

````json
```json
{
    "status": 200,
    "message": "Xoá sản phẩm thành công"
}
````

 </details>
