# REGISTRASI

### **Endpoint :**

- **api/auth/register**

### **Request :**

- Method : **POST**
- Request Header : -
- Request Body :
    
    | key | Data Type | Mandatory | Desc |
    | --- | --- | --- | --- |
    | fullname | String | Yes | required, min 3 char, max 128 char |
    | email | String | Yes | required, unique, must be an email |
    | password | String | yes | required, min 6 characters  |
    | password_confirmation | String | yes | required, password same |

### **Response :**

### **Success response :**

- Status Code : 201
    
    ```jsx
        {
           "status": true,
           "message": "Pendaftaran User Baru Berhasil.",
           "email": "tes@gmail.com"
        }
    ```
    

### **Failed response :**

- Status Code : 422
    - Validation form: not sent with the valid data request.
        
        ```jsx
           {
            "status": false,
            "message": "Data yang diberikan tidak valid",
            "errors": [
                {
                    "msg": "Fullname wajib diisi",
                    "param": "fullname",
                    "location": "body"
                },
                {
                    "msg": "Email wajib diisi",
                    "param": "email",
                    "location": "body"
                },
                {
                    "msg": "Password wajib diisi",
                    "param": "password",
                    "location": "body"
                },
                {
                    "msg": "Password Confirmation wajib diisi",
                    "param": "password_confirmation",
                    "location": "body"
                },
                {
                    "msg": "Password Wajib 6 karakter",
                    "param": "password",
                    "location": "body"
                },
               
            ]
        }
        ```
        
- Status Code : 409 (unexpected failed)
    
    ```jsx
       {
        "status": false,
        "message": "registrasi gagal"
       }
    ```
    
    
---------------
    
    
# **Login**

### Endpoint :
**api/auth/login**

### Request :
- Method : **POST**
- request header : -
- Request Body :

### Response :

### Success response :

- Status Code : 200
    - `access_token` used to access feature with authentication, valid 1 days
    
    ```json
    
        "status": true,
        "access_token": "eyJ0eXAiOiJKV1QiL........",
        "user": {
    				"id"        : ..dataUser,
            "fullname"  : ..dataUser,
            "email"     : ..dataUser,
            "role"      : ..dataUser
         }
    }
    ```
    

### Failed response :

- Status Code : 422
    - Bad request: when something problem is in the account. eg: email not registered, the wrong password etc
        
        ```jsx
        
         {
            "status": false,
            "message": "Email Tidak Terdaftar."
        }
        ```
        
    - Bad request: when form input not filled
        
        ```jsx
        
           {
            "status": false,
            "message": "Email wajib diisi"
        }
        ```
        
        ```jsx
        
        {
            "status": false,
            "message": "password wajib diisi"
        }
        ```
        
- status Code : 409 (unexpected failed)
    
    ```jsx
    {
        "status": false,
        "message": "gagal Login."
    }
    ```
    
    
    
    
    
    
    
    
    
--------
#  **Kategori Course**

## **Get All Kategori**

(**hanya bisa di access oleh admin)**

### Endpoint :

- api/all-kategori/

### Request :

- Method : get
- Request Header :

| key | Data Type | Mandatory | Desc | Example |
| --- | --- | --- | --- | --- |
| Authorization | String | Yes | the token that get from login | Bearer eyJ0eXAiOiJKV1QiL.....… |
- Request Body : -

### Response :

### Success response :

- Status code : 200

```jsx
{
	status: true,
	data: 
		[
        {
            "nama": "Seni Rupa",
            "gambar": "https://i.ibb.co/HB6F66x/Rectangle-1274.png",
            "url": "seni-rupa"
        },
        {
            "nama": "Seni Tari",
            "gambar": "https://i.ibb.co/8shkccZ/Rectangle-1273.png",
            "url": "seni-tari"
        },
        {
            "nama": "Seni Sastra",
            "gambar": "https://i.ibb.co/DLkpRGp/Rectangle-1274.png",
            "url": "seni-sastra"
        },
        {
            "nama": "Seni Musik",
            "gambar": "https://i.ibb.co/1qg8Bpm/Rectangle-1274.png",
            "url": "seni-musik"
        },
        {
            "nama": "Seni Pertujukan",
            "gambar": "https://i.ibb.co/rfhLtpY/Rectangle-1274.png",
            "url": "seni-pertunjukan"
        }
    ]
}
```

### Failed response :

- status code : 401)
    
    ```jsx
    {
        "status": false,
        "message": 'Unauthorized access.'
    }
    ```
    
- status code : 403 (the token is not sent in the header)
    
    ```jsx
    {
        "status": false,
    		"message"   : "No token provided."
    }
    ```
    
- Status code : 409
    
    ```jsx
    {
    	status: false,
    	message: "Data gagal didapatkan"
    }
    ```
    

# Find **Kategori By URL**

### Endpoint :

- api/all-kategori/{url}

### Request :

- Method : get
- Request Header :

| key | Data Type | Mandatory | Desc | Example |
| --- | --- | --- | --- | --- |
| Authorization | String | Yes | the token that get from login | Bearer eyJ0eXAiOiJKV1QiL.....… |
- Request Body : -

### Response :

### Success response :

- Status code : 200
- When Kategori  **has no relation to sub categories and relation course**

```jsx
{
	status: true,
	data: 
	{
    "status": true,
    "data": {
      "nama": "Seni Musik",
        "gambar": "https://i.ibb.co/1qg8Bpm/Rectangle-1274.png",
        "deskripsi": null,
        "url": "seni-musik",
        "sub_kategoris": []  // -> relasi sub kategori
    }
	}
}
```

- When Kategori  **has no  relation course**

```jsx
{
    "status": true,
    "data": {
        "nama": "Seni Musik",
        "gambar": "https://i.ibb.co/1qg8Bpm/Rectangle-1274.png",
        "deskripsi": null,
        "url": "seni-musik",
        "sub_kategoris": [
            {
                "nama": "gitar",
                "gambar": "asdadada",
                "url": "gitar",
                "courses": [] // -> relasi sub kategori
            },
            {
                "nama": "biola",
                "gambar": "asdada",
                "url": "biola",
                "courses": [] // -> relasi sub kategori
            }
        ]
    }
}
```

- When Kategori  Complete

```jsx
{
    "status": true,
    "data": {
        "nama": "Seni Musik", // label 
        "gambar": "https://i.ibb.co/1qg8Bpm/Rectangle-1274.png",
        "deskripsi": null,
        "url": "seni-musik",
        "sub_kategoris": [
            {
                "nama": "gitar",
                "gambar": "asdadada",
                "url": "gitar",
                "courses": [
                    {
                        "nama": "Trik Jitu Belajar Gitar ",
                        "created_by": "riski",
                        "thumbnail": "thumbnail",
                        "url": "Trik-Jitu-Belajar-Gitar "
                    },
                    {
                        "nama": "Teknik Dasar Gitar Untuk Pemula",
                        "created_by": "riski",
                        "thumbnail": "asdada",
                        "url": "Teknik-Dasar-Gitar-Untuk-Pemula"
                    }
                ]
            },
            {
                "nama": "biola",
                "gambar": "asdada",
                "url": "biola",
                "courses": [
                    {
                        "nama": "Teknik Dasar Memainkan Biola Dengan Mudah",
                        "created_by": "riski",
                        "thumbnail": "asdad",
                        "url": "Teknik-Dasar-Memainkan-Biola-Dengan-Mudah"
                    }
                ]
            }
        ]
    }
}
```

### Failed response :

- status code : 401 (Unauthorized)
    
    ```jsx
    {
        "status": false,
        "message": 'Unauthorized access.'
    }
    ```
    
- status code : 403 (the token is not sent in the header)
    
    ```jsx
    {
        "status": false,
    		"message"   : "No token provided."
    }
    ```
    
- Status code : 409
    
    ```jsx
    {
    	status: false,
    	message: "Data gagal didapatkan"
    }
    ```
    

# Add Kategori Course

(**hanya bisa di access oleh admin)**

- api/kategori/

### Endpoint :

- Request :
- Method : **POST**
- Request Header :

| key | Data Type | Mandatory | Desc | Example |
| --- | --- | --- | --- | --- |
| Authorization | String | Yes | the token that get from login | Bearer eyJ0eXAiOiJKV1QiL.....… |
- Request Body :

| key | Data Type | Mandatory | Desc |
| --- | --- | --- | --- |
| nama | String | Yes | required, min 5char, unique |
| gambar | String | Yes | requirel |
| deskripsi | String | yes | required |

### Response :

### Success response :

- Status code : 201
    
    ```jsx
    {
        "status": true,
        "message": 'Kategori berhasil ditambahkan'
    }
    ```
    

### Failed response :

- status code : 401 (Unauthorized) when the access token sent data is bad or not the same
    
    ```jsx
    {
        "status": false,
        "message": 'Unauthorized access.'
    }
    ```
    
- status code : 403 (the token is not sent in the header) when does not find the access token
    
    ```jsx
    {
        "status": false,
    		"message"   : "No token provided."
    }
    ```
    
- Status code : 409 (there was an error in the back end which probably failed to get the data from the database)
    
    ```jsx
    {
    	status: false,
    	message: "Data gagal ditambahkan."
    }
    ```
    
- Status code : 422
    
    ```jsx
    {
        "status": false,
        "message": "Data yang diberikan tidak valid",
        "errors": [
                {
                    "msg": "Nama wajib diisi",
                    "param": "nama",
                    "location": "body"
                },
                {
                    "msg": "must be at least 5 chars long",
                    "param": "nama",
                    "location": "body"
                },
                {
                    "msg": "Gambar wajib diisi",
                    "param": "gambar",
                    "location": "body"
                },
                {
                    "msg": "deskripsi wajib diisi",
                    "param": "deskripsi",
                    "location": "body"
                },
                {
                    "msg": "WHERE parameter \"nama\" has invalid \"undefined\" value",
                    "param": "nama",
                    "location": "body"
                }
           ]
        
    }
    ```
    
- Status code : 401 ( when doesn't have access to the hit endpoint / role access is not met )
    
    ```jsx
    {
        "status": false,
        "message": "You Dont have Permission"
    }
    ```
    

# Update Kategori Course :

(**hanya bisa di access oleh admin)**

## Endpoint :

- /api/kategori/{id}

## Request :

- Method : **PUT**
- Request Header :

| key | Data Type | Mandatory | Desc | Example |
| --- | --- | --- | --- | --- |
| Authorization | String | Yes | the token that get from login | Bearer eyJ0eXAiOiJKV1QiL.....… |
- Request Body :

| key | Data Type | Mandatory | Desc |
| --- | --- | --- | --- |
| nama | String | Yes | required, min 5char, unique |
| gambar | String | Yes | required |
| deskripsi | String | yes | required |

## Response :

## Succsess response :

- Status code : 200

```jsx
{
	status: true,
	message: "Data berhasil di update"
}
```

## Failed response :

- status code : 400 (Not Fount) when id kategori unrecognizable
    
    ```jsx
    {
        "status": false,
       "message" : `kategori not found`
    }
    ```
    
- status code : 401 (Unauthorized) when the access token sent data is bad or not the same
    
    ```jsx
    {
        "status": false,
        "message": 'Unauthorized access.'
    }
    ```
    
- status code : 403 (the token is not sent in the header) when does not find the access token
    
    ```jsx
    {
        "status": false,
    		"message"   : "No token provided."
    }
    ```
    
- Status code : 409 (there was an error in the back end which probably failed to get the data from the database)
    
    ```jsx
    {
    	status: false,
    	"message": "Data gagal Diupdate.",
    }
    ```
    
- Status code : 422
    
    ```jsx
    {
        "status": false,
        "message": "Data yang diberikan tidak valid",
        "errors": [
                {
                    "msg": "Nama wajib diisi",
                    "param": "nama",
                    "location": "body"
                },
                {
                    "msg": "must be at least 5 chars long",
                    "param": "nama",
                    "location": "body"
                },
                {
                    "msg": "Gambar wajib diisi",
                    "param": "gambar",
                    "location": "body"
                },
                {
                    "msg": "deskripsi wajib diisi",
                    "param": "deskripsi",
                    "location": "body"
                },
                {
                    "msg": "WHERE parameter \"nama\" has invalid \"undefined\" value",
                    "param": "nama",
                    "location": "body"
                }
           ]
        
    }
    ```
    
- Status code : 401 ( when doesn't have access to the hit endpoint / role access is not met )
    
    ```jsx
    {
        "status": false,
        "message": "You Dont have Permission"
    }
    ```
    

# Delete Kategori Course :

(**hanya bisa di access oleh admin)**

## Endpoint :

- /api/kategori/{id}

## Request :

- Method : DELETE
- Request Header :

| key | Data Type | Mandatory | Desc | Example |
| --- | --- | --- | --- | --- |
| Authorization | String | Yes | the token that get from login | Bearer eyJ0eXAiOiJKV1QiL.....… |
- Request Body : -

## Response :

## Succsess response :

- Status code : 200

```jsx
{
	status: true,
  message : "Kategori berhasil Dihapus"
}
```

## Failed response :

- status code : 400 (Not Fount) when id kategori unrecognizable
    
    ```jsx
    {
        "status": false,
       "message" : `kategori not found`
    }
    ```
    
- status code : 401 (Unauthorized) when the access token sent data is bad or not the same
    
    ```jsx
    {
        "status": false,
        "message": 'Unauthorized access.'
    }
    ```
    
- status code : 403 (the token is not sent in the header) when does not find the access token
    
    ```jsx
    {
        "status": false,
    		"message"   : "No token provided."
    }
    ```
    
- Status code : 409 (there was an error in the back end which probably failed to get the data from the database)
    
    ```jsx
    {
    	status: false,
    	message : "Data gagal Dihapus",
    }
    ```
    
- Status code : 401 ( when doesn't have access to the hit endpoint / role access is not met )
    
    ```jsx
    {
        "status": false,
        "message": "You Dont have Permission"
    }
    ```
# **Get All Kategori**

(**hanya bisa di access oleh admin)**

### Endpoint :

- api/all-kategori/

### Request :

- Method : get
- Request Header :

| key | Data Type | Mandatory | Desc | Example |
| --- | --- | --- | --- | --- |
| Authorization | String | Yes | the token that get from login | Bearer eyJ0eXAiOiJKV1QiL.....… |
- Request Body : -

### Response :

### Success response :

- Status code : 200

```jsx
{
	status: true,
	data: 
		[
        {
            "nama": "Seni Rupa",
            "gambar": "https://i.ibb.co/HB6F66x/Rectangle-1274.png",
            "url": "seni-rupa"
        },
        {
            "nama": "Seni Tari",
            "gambar": "https://i.ibb.co/8shkccZ/Rectangle-1273.png",
            "url": "seni-tari"
        },
        {
            "nama": "Seni Sastra",
            "gambar": "https://i.ibb.co/DLkpRGp/Rectangle-1274.png",
            "url": "seni-sastra"
        },
        {
            "nama": "Seni Musik",
            "gambar": "https://i.ibb.co/1qg8Bpm/Rectangle-1274.png",
            "url": "seni-musik"
        },
        {
            "nama": "Seni Pertujukan",
            "gambar": "https://i.ibb.co/rfhLtpY/Rectangle-1274.png",
            "url": "seni-pertunjukan"
        }
    ]
}
```

### Failed response :

- status code : 401 t)
    
    ```jsx
    {
        "status": false,
        "message": 'Unauthorized access.'
    }
    ```
    
- status code : 403 (the token is not sent in the header)
    
    ```jsx
    {
        "status": false,
    		"message"   : "No token provided."
    }
    ```
    
- Status code : 409
    
    ```jsx
    {
    	status: false,
    	message: "Data gagal didapatkan"
    }
    ```
    

# Find **Kategori By URL**

### Endpoint :

- api/all-kategori/{url}

### Request :

- Method : get
- Request Header :

| key | Data Type | Mandatory | Desc | Example |
| --- | --- | --- | --- | --- |
| Authorization | String | Yes | the token that get from login | Bearer eyJ0eXAiOiJKV1QiL.....… |
- Request Body : -

### Response :

### Success response :

- Status code : 200
- When Kategori  **has no relation to sub categories and relation course**

```jsx
{
	status: true,
	data: 
	{
    "status": true,
    "data": {
      "nama": "Seni Musik",
        "gambar": "https://i.ibb.co/1qg8Bpm/Rectangle-1274.png",
        "deskripsi": null,
        "url": "seni-musik",
        "sub_kategoris": []  // -> relasi sub kategori
    }
	}
}
```

- When Kategori  **has no  relation course**

```jsx
{
    "status": true,
    "data": {
        "nama": "Seni Musik",
        "gambar": "https://i.ibb.co/1qg8Bpm/Rectangle-1274.png",
        "deskripsi": null,
        "url": "seni-musik",
        "sub_kategoris": [
            {
                "nama": "gitar",
                "gambar": "asdadada",
                "url": "gitar",
                "courses": [] // -> relasi sub kategori
            },
            {
                "nama": "biola",
                "gambar": "asdada",
                "url": "biola",
                "courses": [] // -> relasi sub kategori
            }
        ]
    }
}
```

- When Kategori  Complete

```jsx
{
    "status": true,
    "data": {
        "nama": "Seni Musik", // label 
        "gambar": "https://i.ibb.co/1qg8Bpm/Rectangle-1274.png",
        "deskripsi": null,
        "url": "seni-musik",
        "sub_kategoris": [
            {
                "nama": "gitar",
                "gambar": "asdadada",
                "url": "gitar",
                "courses": [
                    {
                        "nama": "Trik Jitu Belajar Gitar ",
                        "created_by": "riski",
                        "thumbnail": "thumbnail",
                        "url": "Trik-Jitu-Belajar-Gitar "
                    },
                    {
                        "nama": "Teknik Dasar Gitar Untuk Pemula",
                        "created_by": "riski",
                        "thumbnail": "asdada",
                        "url": "Teknik-Dasar-Gitar-Untuk-Pemula"
                    }
                ]
            },
            {
                "nama": "biola",
                "gambar": "asdada",
                "url": "biola",
                "courses": [
                    {
                        "nama": "Teknik Dasar Memainkan Biola Dengan Mudah",
                        "created_by": "riski",
                        "thumbnail": "asdad",
                        "url": "Teknik-Dasar-Memainkan-Biola-Dengan-Mudah"
                    }
                ]
            }
        ]
    }
}
```

### Failed response :

- status code : 401 (Unauthorized)
    
    ```jsx
    {
        "status": false,
        "message": 'Unauthorized access.'
    }
    ```
    
- status code : 403 (the token is not sent in the header)
    
    ```jsx
    {
        "status": false,
    		"message"   : "No token provided."
    }
    ```
    
- Status code : 409
    
    ```jsx
    {
    	status: false,
    	message: "Data gagal didapatkan"
    }
    ```
    

# Add Kategori Course

(**hanya bisa di access oleh admin)**

- api/kategori/

### Endpoint :

- Request :
- Method : **POST**
- Request Header :

| key | Data Type | Mandatory | Desc | Example |
| --- | --- | --- | --- | --- |
| Authorization | String | Yes | the token that get from login | Bearer eyJ0eXAiOiJKV1QiL.....… |
- Request Body :

| key | Data Type | Mandatory | Desc |
| --- | --- | --- | --- |
| nama | String | Yes | required, min 5char, unique |
| gambar | String | Yes | requirel |
| deskripsi | String | yes | required |

### Response :

### Success response :

- Status code : 201
    
    ```jsx
    {
        "status": true,
        "message": 'Kategori berhasil ditambahkan'
    }
    ```
    

### Failed response :

- status code : 401 (Unauthorized) when the access token sent data is bad or not the same
    
    ```jsx
    {
        "status": false,
        "message": 'Unauthorized access.'
    }
    ```
    
- status code : 403 (the token is not sent in the header) when does not find the access token
    
    ```jsx
    {
        "status": false,
    		"message"   : "No token provided."
    }
    ```
    
- Status code : 409 (there was an error in the back end which probably failed to get the data from the database)
    
    ```jsx
    {
    	status: false,
    	message: "Data gagal ditambahkan."
    }
    ```
    
- Status code : 422
    
    ```jsx
    {
        "status": false,
        "message": "Data yang diberikan tidak valid",
        "errors": [
                {
                    "msg": "Nama wajib diisi",
                    "param": "nama",
                    "location": "body"
                },
                {
                    "msg": "must be at least 5 chars long",
                    "param": "nama",
                    "location": "body"
                },
                {
                    "msg": "Gambar wajib diisi",
                    "param": "gambar",
                    "location": "body"
                },
                {
                    "msg": "deskripsi wajib diisi",
                    "param": "deskripsi",
                    "location": "body"
                },
                {
                    "msg": "WHERE parameter \"nama\" has invalid \"undefined\" value",
                    "param": "nama",
                    "location": "body"
                }
           ]
        
    }
    ```
    
- Status code : 401 ( when doesn't have access to the hit endpoint / role access is not met )
    
    ```jsx
    {
        "status": false,
        "message": "You Dont have Permission"
    }
    ```
    

# Update Kategori Course :

(**hanya bisa di access oleh admin)**

## Endpoint :

- /api/kategori/{id}

## Request :

- Method : **PUT**
- Request Header :

| key | Data Type | Mandatory | Desc | Example |
| --- | --- | --- | --- | --- |
| Authorization | String | Yes | the token that get from login | Bearer eyJ0eXAiOiJKV1QiL.....… |
- Request Body :

| key | Data Type | Mandatory | Desc |
| --- | --- | --- | --- |
| nama | String | Yes | required, min 5char, unique |
| gambar | String | Yes | required |
| deskripsi | String | yes | required |

## Response :

## Succsess response :

- Status code : 200

```jsx
{
	status: true,
	message: "Data berhasil di update"
}
```

## Failed response :

- status code : 400 (Not Fount) when id kategori unrecognizable
    
    ```jsx
    {
        "status": false,
       "message" : `kategori not found`
    }
    ```
    
- status code : 401 (Unauthorized) when the access token sent data is bad or not the same
    
    ```jsx
    {
        "status": false,
        "message": 'Unauthorized access.'
    }
    ```
    
- status code : 403 (the token is not sent in the header) when does not find the access token
    
    ```jsx
    {
        "status": false,
    		"message"   : "No token provided."
    }
    ```
    
- Status code : 409 (there was an error in the back end which probably failed to get the data from the database)
    
    ```jsx
    {
    	status: false,
    	"message": "Data gagal Diupdate.",
    }
    ```
    
- Status code : 422
    
    ```jsx
    {
        "status": false,
        "message": "Data yang diberikan tidak valid",
        "errors": [
                {
                    "msg": "Nama wajib diisi",
                    "param": "nama",
                    "location": "body"
                },
                {
                    "msg": "must be at least 5 chars long",
                    "param": "nama",
                    "location": "body"
                },
                {
                    "msg": "Gambar wajib diisi",
                    "param": "gambar",
                    "location": "body"
                },
                {
                    "msg": "deskripsi wajib diisi",
                    "param": "deskripsi",
                    "location": "body"
                },
                {
                    "msg": "WHERE parameter \"nama\" has invalid \"undefined\" value",
                    "param": "nama",
                    "location": "body"
                }
           ]
        
    }
    ```
    
- Status code : 401 ( when doesn't have access to the hit endpoint / role access is not met )
    
    ```jsx
    {
        "status": false,
        "message": "You Dont have Permission"
    }
    ```
    

# Delete Kategori Course :

(**hanya bisa di access oleh admin)**

## Endpoint :

- /api/kategori/{id}

## Request :

- Method : DELETE
- Request Header :

| key | Data Type | Mandatory | Desc | Example |
| --- | --- | --- | --- | --- |
| Authorization | String | Yes | the token that get from login | Bearer eyJ0eXAiOiJKV1QiL.....… |
- Request Body : -

## Response :

## Succsess response :

- Status code : 200

```jsx
{
	status: true,
  message : "Kategori berhasil Dihapus"
}
```

## Failed response :

- status code : 400 (Not Fount) when id kategori unrecognizable
    
    ```jsx
    {
        "status": false,
       "message" : `kategori not found`
    }
    ```
    
- status code : 401 (Unauthorized) when the access token sent data is bad or not the same
    
    ```jsx
    {
        "status": false,
        "message": 'Unauthorized access.'
    }
    ```
    
- status code : 403 (the token is not sent in the header) when does not find the access token
    
    ```jsx
    {
        "status": false,
    		"message"   : "No token provided."
    }
    ```
    
- Status code : 409 (there was an error in the back end which probably failed to get the data from the database)
    
    ```jsx
    {
    	status: false,
    	message : "Data gagal Dihapus",
    }
    ```
    
- Status code : 401 ( when doesn't have access to the hit endpoint / role access is not met )
    
    ```jsx
    {
        "status": false,
        "message": "You Dont have Permission"
    }
    ```
--------------------------------
# **Sub kategori Course** 
### **Get All Sub kategori**

(**hanya bisa di access oleh admin)**

### Endpoint :

- api/all-kategori/

### Request :

- Method : get
- Request Header :

| key | Data Type | Mandatory | Desc | Example |
| --- | --- | --- | --- | --- |
| Authorization | String | Yes | the token that get from login | Bearer eyJ0eXAiOiJKV1QiL.....… |
- Request Body : -

### Response :

### Success response :

- Status code : 200

```jsx
{
    "status": true,
    "data": [
        {
            "nama": "gitar",
            "gambar": "asdadada",
            "deskripsi": "asdadadad",
            "url": "gitar"
        },
        {
            "nama": "biola",
            "gambar": "asdada",
            "deskripsi": "asdadad",
            "url": "biola"
        }
    ]
}
```

### Failed response :

- status code : 401 (Unauthorized) when the access token sent data is bad or not the same
    
    ```jsx
    {
        "status": false,
        "message": 'Unauthorized access.'
    }
    ```
    
- status code : 403 (the token is not sent in the header) when does not find the access token
    
    ```jsx
    {
        "status": false,
    		"message"   : "No token provided."
    }
    ```
    
- Status code : 409 (there was an error in the back end which probably failed to get the data from the database)
    
    ```jsx
    {
    	status: false,
    	message: "Data gagal ditambahkan."
    }
    ```
    
- Status code : 401 ( when doesn't have access to the hit endpoint / role access is not met )
    
    ```jsx
    {
        "status": false,
        "message": "You Dont have Permission"
    }
    ```
    

# Find Sub **Kategori By URL**

### Endpoint :

- api/sub-kategori/{url}

### Request :

- Method : get
- Request Header :
- Request Body : -

### Response :

### Success response :

- Status code : 200
- When Kategori  **has no relation course**

```jsx
{
    "status": true,
    "data": {
        "id_kategori": 4,
        "nama": "gitar",
        "gambar": "asdadada",
        "deskripsi": "asdadadad",
        "url": "gitar",
        "courses": [] // relation course
    }
}
```

- When Kategori  **has no  relation course**

```jsx
{
    "status": true,
    "data": {
        "id_kategori": 4,
        "nama": "gitar",
        "gambar": "asdadada",
        "deskripsi": "asdadadad",
        "url": "gitar",
        "courses": [
            {
                "nama": "Trik Jitu Belajar Gitar ",
                "created_by": "riski",
                "thumbnail": "thumbnail",
                "url": "Trik-Jitu-Belajar-Gitar "
            },
            {
                "nama": "Teknik Dasar Gitar Untuk Pemula",
                "created_by": "riski",
                "thumbnail": "asdada",
                "url": "Teknik-Dasar-Gitar-Untuk-Pemula"
            }
        ]
    }
}
```

### Failed response :

- status code : 401 (Unauthorized)
    
    ```jsx
    {
        "status": false,
        "message": 'Unauthorized access.'
    }
    ```
    
- status code : 403 (the token is not sent in the header)
    
    ```jsx
    {
        "status": false,
    		"message"   : "No token provided."
    }
    ```
    
- Status code : 409
    
    ```jsx
    {
    	status: false,
    	message: "Data gagal didapatkan"
    }
    ```
    

# Add Sub Kategori Course

(**hanya bisa di access oleh admin)**

### Endpoint :

- api/sub-kategori/
- Request :
- Method : **POST**
- Request Header :

| key | Data Type | Mandatory | Desc | Example |
| --- | --- | --- | --- | --- |
| Authorization | String | Yes | the token that get from login | Bearer eyJ0eXAiOiJKV1QiL.....… |
- Request Body :

| key | Data Type | Mandatory | Desc |
| --- | --- | --- | --- |
| id_kategori | integer | yes | required, unique |
| nama | String | Yes | required, min 5char, unique |
| gambar | String | Yes | required |
| deskripsi | String | yes | required |
|  |  |  |  |
|  |  |  |  |

### Response :

### Success response :

- Status code : 201
    
    ```jsx
    {
        "status": true,
     "messange": "Sub Kategori berhasil ditambahkan",
    }
    ```
    

### Failed response :

- status code : 401 (Unauthorized) when the access token sent data is bad or not the same
    
    ```jsx
    {
        "status": false,
        "message": 'Unauthorized access.'
    }
    ```
    
- status code : 403 (the token is not sent in the header) when does not find the access token
    
    ```jsx
    {
        "status": false,
    		"message"   : "No token provided."
    }
    ```
    
- Status code : 409 (there was an error in the back end which probably failed to get the data from the database)
    
    ```jsx
    {
    	status: false,
    	message: "Data gagal ditambahkan."
    }
    ```
    
- Status code : 422
    
    ```jsx
    {
        "status": false,
        "message": "Data yang diberikan tidak valid",
        "errors": [
                {
                    "msg": "Nama wajib diisi",
                    "param": "nama",
                    "location": "body"
                },
                {
                    "msg": "must be at least 5 chars long",
                    "param": "nama",
                    "location": "body"
                },
                {
                    "msg": "Gambar wajib diisi",
                    "param": "gambar",
                    "location": "body"
                },
                {
                    "msg": "deskripsi wajib diisi",
                    "param": "deskripsi",
                    "location": "body"
                },
                {
                    "msg": "WHERE parameter \"nama\" has invalid \"undefined\" value",
                    "param": "nama",
                    "location": "body"
                }
           ]
        
    }
    ```
    
- Status code : 401 ( when doesn't have access to the hit endpoint / role access is not met )
    
    ```jsx
    {
        "status": false,
        "message": "You Dont have Permission"
    }
    ```
    

# Update Sub Kategori Course :

(**hanya bisa di access oleh admin)**

## Endpoint :

- /api/kategori/{id}

## Request :

- Method : **PUT**
- Request Header :

| key | Data Type | Mandatory | Desc | Example |
| --- | --- | --- | --- | --- |
| Authorization | String | Yes | the token that get from login | Bearer eyJ0eXAiOiJKV1QiL.....… |
- Request Body :

| key | Data Type | Mandatory | Desc |
| --- | --- | --- | --- |
| id_kategori | integer | yes | required, unique |
| nama | String | Yes | required, min 5char, unique |
| gambar | String | Yes | required |
| deskripsi | String | yes | required |

## Response :

## Succsess response :

- Status code : 200

```jsx
{
	status: true,
	message: "Data berhasil di update"
}
```

## Failed response :

- status code : 400 (Not Fount) when id kategori unrecognizable
    
    ```jsx
    {
        "status": false,
       "message" : `kategori not found`
    }
    ```
    
- status code : 401 (Unauthorized) when the access token sent data is bad or not the same
    
    ```jsx
    {
        "status": false,
        "message": 'Unauthorized access.'
    }
    ```
    
- status code : 403 (the token is not sent in the header) when does not find the access token
    
    ```jsx
    {
        "status": false,
    		"message"   : "No token provided."
    }
    ```
    
- Status code : 409 (there was an error in the back end which probably failed to get the data from the database)
    
    ```jsx
    {
    	status: false,
    	"message": "Data gagal Diupdate.",
    }
    ```
    
- Status code : 422
    
    ```jsx
    {
        "status": false,
        "message": "Data yang diberikan tidak valid",
        "errors": [
                {
                    "msg": "Nama wajib diisi",
                    "param": "nama",
                    "location": "body"
                },
                {
                    "msg": "must be at least 5 chars long",
                    "param": "nama",
                    "location": "body"
                },
                {
                    "msg": "Gambar wajib diisi",
                    "param": "gambar",
                    "location": "body"
                },
                {
                    "msg": "deskripsi wajib diisi",
                    "param": "deskripsi",
                    "location": "body"
                },
                {
                    "msg": "WHERE parameter \"nama\" has invalid \"undefined\" value",
                    "param": "nama",
                    "location": "body"
                }
           ]
        
    }
    ```
    
- Status code : 401 ( when doesn't have access to the hit endpoint / role access is not met )
    
    ```jsx
    {
        "status": false,
        "message": "You Dont have Permission"
    }
    ```
    

# Delete Sub Kategori Course :

(**hanya bisa di access oleh admin)**

## Endpoint :

- /api/kategori/{id}

## Request :

- Method : DELETE
- Request Header :

| key | Data Type | Mandatory | Desc | Example |
| --- | --- | --- | --- | --- |
| Authorization | String | Yes | the token that get from login | Bearer eyJ0eXAiOiJKV1QiL.....… |
- Request Body : -

## Response :

## Succsess response :

- Status code : 200

```jsx
{
	status: true,
  message : "Kategori berhasil Dihapus"
}
```

## Failed response :

- status code : 400 (Not Fount) when id kategori unrecognizable
    
    ```jsx
    {
        "status": false,
       "message" : `kategori not found`
    }
    ```
    
- status code : 401 (Unauthorized) when the access token sent data is bad or not the same
    
    ```jsx
    {
        "status": false,
        "message": 'Unauthorized access.'
    }
    ```
    
- status code : 403 (the token is not sent in the header) when does not find the access token
    
    ```jsx
    {
        "status": false,
    		"message"   : "No token provided."
    }
    ```
    
- Status code : 409 (there was an error in the back end which probably failed to get the data from the database)
    
    ```jsx
    {
    	status: false,
    	message : "Data gagal Dihapus",
    }
    ```
    
- Status code : 401 ( when doesn't have access to the hit endpoint / role access is not met )
    
    ```jsx
    {
        "status": false,
        "message": "You Dont have Permission"
    }
    ```

----------------

# **Course**
### **Get course Find by url**

### Endpoint :

- api/course/{url}

### Request :

- Method : get
- Request Header :

| key | Data Type | Mandatory | Desc | Example |
| --- | --- | --- | --- | --- |
| Authorization | String | Yes | the token that get from login | Bearer eyJ0eXAiOiJKV1QiL.....… |
- Request Body : -

### Response :

### Success response :

- Status code : 200

```jsx
{
    "status": true,
    "data": {
        "id_sub_kategori": 1,
        "nama": "Trik Jitu Belajar Gitar ",
        "created_by": "riski",
        "url": "Trik-Jitu-Belajar-Gitar ",
        "course_sections": [
            {
                "title": "Mempelajari Dasar-Dasarnya",
                "deskripsi": "1. Pastikan Gitar Nyaman Dipegang\n\nKenali bagian-bagian gitar. Baik Anda memainkan yang elektrik atau akustik, gitar terbuat dari logam serta kayu. Senar-senar gitar yang dilapisi tembaga akan bergetar untuk menghasilkan suara. Tubuh kayunya meresonansikan suara ini untuk menghasilkan nada-nada hangat yang identik dengan gitar.\n\nSenar akan melewati bagian kepala gitar, dan kemudian dipasangkan di kenop penyetop yang bisa diputar untuk mengencangkan serta melonggarkannya. Senar juga akan melewati bagian bridge untuk dipasangkan ke tubuh gitar. Pada gitar akustik, senar ini dipasangkan ke bridge dengan menggunakan pasak tidak tetap. Untuk gitar listrik, senar biasanya dimasukkan melalui lubang kecil.\nBagian leher gitar berupa kayu panjang, yang rata di satu sisi (disebut dengan istilah papan fret) dan melengkung di sisi lainnya. Papan fret ini dibatasi dengan garis-garis metal (yang disebut fret) untuk menandai berbagai nada.\nGitar akustik memiliki lubang suara di tubuhnya. Lubang ini akan menjadi tempat suara beresonansi. Pada gitar listrik, ada tiga elemen pickup magnetis yang akan menyalurkan suara ke amplifier.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n 2. Pastikan Gitar Nyaman Dipegang\n\nSebelum Anda mulai membunyikannya seperti Jimi Hendrix, pastikan Anda sudah memegang gitar dengan benar. Bila Anda tidak kidal, mainkan gitar dengan menggosok senarnya kira-kira pada posisi setengah di antara lubang suara serta bridge dengan tangan kanan, dan menekan senar-senar pada leher gitar dengan tangan kiri.\n\nUntuk memainkan gitar, Anda harus duduk pada bangku atau kursi dengan sandaran yang lurus. Saat Anda mengatur orientasi gitar terhadap tubuh, senar tertipis harus mengarah ke lantai dan senar tertebal harus mengarah ke langit-langit. Pegang bagian belakangnya agar gitar menyentuh perut dan dada serta bersandar pada kaki dominan Anda.\nLetakkan gitar di paha Anda, lalu pangku dengan tubuh Anda. Gunakan tangan kiri untuk menstabilkan leher dan memetik senar, dan tahan leher dengan jempol dan telunjuk berbentuk V. Niscaya, Anda akan dapat menggerakkan tangan kiri ke atas dan bawah leher gitar tanpa perlu memegangnya.\nBahkan bila Anda memegang gitar dengan benar, Anda mungkin mengalami sedikit rasa tidak nyaman saat berlatih memainkannya. Jangan putus asa jika bahu, leher, lengan, dan tangan Anda sakit. Pada akhirnya Anda akan terbiasa.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n3. \nSetem gitar\n\nMemainkan gitar yang sumbang adalah hal yang tidak menyenangkan. Selain itu, Anda akan mengembangkan kebiasaan buruk jika Anda seorang pemula. Penyeteman rutin juga akan membiasakan Anda dengan kombinasi fret serta senar yang berkorespondensi terhadap suatu nada.\n\nPelajari nama setiap senar. Nama-namanya adalah E, A, D, G, B, dan E (dimulai dari senar tertipis yang menghasilkan nada tertinggi hingga ke senar tertebal yang menghasilkan nada terendah). Gunakan sistem mnemonik untuk mengingat urutan ini, misalnya \"Edi Ada Di Gunung Batur Edo!\"\nPenyetem elektrik mudah digunakan dan sangat akurat. Tempelkan ke gitar dan petik senar E tinggi. Penyetem akan memberitahu apakah bunyinya \"sharp\" (nadanya terlalu tinggi) atau \"flat\" (terlalu rendah). Bunyikan setiap nada dan kencangkan senar untuk meninggikannya, atau longgarkan untuk merendahkannya. Pastikan ruangan tenang saat Anda menggunakan penyetem karena mikrofonnya bisa menyerap suara-suara lain.\nBila Anda tidak mampu membeli penyetem, Anda juga bisa menyetem manual. Lakukan dengan mencocokkan bunyi setiap nada dengan nada yang sama di piano.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n4. \nBerlatihlah menekan fret pada semua senar. \n\nFret adalah area yang dibatasi oleh setrip logam. Setrip ini berbentuk tegak lurus untuk menandai setiap nada. Untuk membunyikan sebuah nada, tekan jari di antara setrip-setrip logam (bukan di atasnya). Memainkan fret ketiga berarti Anda meletakkan jari pada senar di antara celah fret kedua dan ketiga. Selain itu, pastikan jari Anda lebih dekat dengan fret yang lebih rendah untuk menghindari suara berdengung. Tahan senarnya dengan kuat agar senar hanya bergetar di antara jari dan tangan Anda yang memetik. Tekan senar hanya dengan ujung jari.\n\nSetiap kali Anda berpindah dari satu fret ke lainnya, nada yang dihasilkan akan setengah lebih tinggi bila Anda mengarah ke tubuh gitar. Semakin Anda mendekati leher/kepala gitar, nada yang dihasilkan akan setengah lebih rendah. Berlatihlah memindahkan jari di sepanjang papan fret. Tekan setiap fret dan biasakan diri agar Anda dapat memainkan sebuah nada.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n5. \n\nPakai pick\n\nPick, atau plektrum, adalah benda plastik kecil yang digunakan untuk membunyikan nada-nada tunggal serta mengocok gitar. Harganya murah dan tersedia di semua toko musik. Meski Anda tidak wajib mempelajari cara bermain gitar dengan pick, biasanya orang-orang memulainya dari sini.\n\nKepalkan tangan dominan Anda. Tempelkan jempol ke jari-jari yang menekuk. Pegang pick dengan menggenggamnya secara tegak lurus terhadap kepalan, di antara jempol dan jari telunjuk. Sisakan hanya beberapa cm bagian yang menonjol dari tangan Anda.",
                "content_course": {
                    "link": "link",
                    "type": "image"
                }
            },
            {
                "title": "Memainkan Kunci Gitar",
                "deskripsi": "Kunci adalah kelompok setidaknya tiga nada yang berbunyi dalam sebuah harmoni. Ada dua jenis kunci standar yang harus Anda pelajari untuk memulai bermain gitar: kunci biasa dan kunci batang. Kunci biasa bisa dimainkan dengan kombinasi senar yang ditekan serta dibuka (tidak ditekan) pada tiga fret pertama di leher gitar.\r\n\r\nKunci-kunci penting yang utama adalah C Mayor, A Mayor, G mayor, E mayor, D mayor.\r\nSetelah Anda menguasai bentuk-bentuk semua kunci ini, berlatihlah mengganti kunci secepat mungkin. Tuliskan susunan acak kunci-kunci yang Anda mainkan dan pindahkan jari-jari Anda secepat mungkin setelah Anda membunyikannya.\r\nMake sure you play the appropriate notes. In A Major, for example, the low E string is not strummed. They'll be marked on the tablature with an \"X\". Develop good habits now for success in the long run.\r\n",
                "content_course": {
                    "link": "link",
                    "type": "video"
                }
            }
        ]
    }
}
```

## Failed response :

- status code : 401 (Unauthorized) when the access token sent data is bad or not the same
    
    ```jsx
    {
        "status": false,
        "message": 'Unauthorized access.'
    }
    ```
    
- status code : 403 (the token is not sent in the header) when does not find the access token
    
    ```jsx
    {
        "status": false,
    		"message"   : "No token provided."
    }
    ```
    
- Status code : 409 (there was an error in the back end which probably failed to get the data from the database)
    
    ```jsx
    {
    	status: false,
    	message: "Data gagal ditambahkan."
    }
    ```
    
- Status code : 401 ( when doesn't have access to the hit endpoint / role access is not met )
    
    ```jsx
    {
        "status": false,
        "message": "You Dont have Permission"
    }
    ```
    

# **Get All Course**

(**hanya bisa di access oleh admin)**

### Endpoint :

- api/all-course/

### Request :

- Method : get
- Request Header :
- Request Body : -

### Response :

### Success response :

- Status code : 200

```jsx
{
    "status": true,
    "data": [
        {
            "nama": "gitar",
            "gambar": "asdadada",
            "deskripsi": "asdadadad",
            "url": "gitar"
        },
        {
            "nama": "biola",
            "gambar": "asdada",
            "deskripsi": "asdadad",
            "url": "biola"
        }
    ]
}
```

### Failed response :

- status code : 401 (Unauthorized) when the access token sent data is bad or not the same
    
    ```jsx
    {
        "status": false,
        "message": 'Unauthorized access.'
    }
    ```
    
- status code : 403 (the token is not sent in the header) when does not find the access token
    
    ```jsx
    {
        "status": false,
    		"message"   : "No token provided."
    }
    ```
    
- Status code : 409 (there was an error in the back end which probably failed to get the data from the database)
    
    ```jsx
    {
    	status: false,
    	message: "Data gagal didapatkan."
    }
    ```
    
- Status code : 401 ( when doesn't have access to the hit endpoint / role access is not met )

```jsx
{
    "status": false,
    "message": "You Dont have Permission"
}
```

# Add  Course

(**hanya bisa di access oleh admin)**

### Endpoint :

- api/course/
- Request :
- Method : **POST**
- Request Header :

| key | Data Type | Mandatory | Desc | Example |
| --- | --- | --- | --- | --- |
| Authorization | String | Yes | the token that get from login | Bearer eyJ0eXAiOiJKV1QiL.....… |
- Request Body :

| key | Data Type | Mandatory | Desc |
| --- | --- | --- | --- |
| id_sub_kategori | integer | yes | required, unique |
| nama | String | Yes | required, min 5char, unique |
| created_by | String | Yes | required |
| title | String | yes | required |
| deskripsi | Text | yes | required |
| type | enum(”image”,”video”) | yes | required |
| link | string | yes | required |
| id_kategori | integer | yes | required |
| thumbnail | text | yes | required |

### Response :

### Success response :

- Status code : 201
    
    ```jsx
    {
        "status": true,
    		"messange": "Kategori berhasil ditambahkan",
    }
    ```
    

### Failed response :

- status code : 401 (Unauthorized) when the access token sent data is bad or not the same
    
    ```jsx
    {
        "status": false,
        "message": 'Unauthorized access.'
    }
    ```
    
- status code : 403 (the token is not sent in the header) when does not find the access token
    
    ```jsx
    {
        "status": false,
    		"message"   : "No token provided."
    }
    ```
    
- Status code : 409 (there was an error in the back end which probably failed to get the data from the database)
    
    ```jsx
    {
    	status: false,
    	message: "Data gagal ditambahkan."
    }
    ```
    
- Status code : 422
    
    ```jsx
    {
        "status": false,
        "message": "Data yang diberikan tidak valid",
        "errors": [
                {
                    "msg": "Nama wajib diisi",
                    "param": "nama",
                    "location": "body"
                },
                {
                    "msg": "must be at least 5 chars long",
                    "param": "nama",
                    "location": "body"
                },
                {
                    "msg": "Gambar wajib diisi",
                    "param": "gambar",
                    "location": "body"
                },
                {
                    "msg": "deskripsi wajib diisi",
                    "param": "deskripsi",
                    "location": "body"
                },
                {
                    "msg": "WHERE parameter \"nama\" has invalid \"undefined\" value",
                    "param": "nama",
                    "location": "body"
                }
           ]
        
    }
    ```
    
- Status code : 401 ( when doesn't have access to the hit endpoint / role access is not met )

```jsx
{
    "status": false,
    "message": "You Dont have Permission"
}
```

----------


# **User**
## **Get All Users**

### Endpoint :

- api/user/

### Request :

- Method : get
- Request Header :

### Response :

### Success response :

- Status code : 200

```jsx
{
	status: true,
	message: "data user berhasil ditemukan",
	data: [
		{
			"id": 1,
	    "name": "TestApp",
	    "email": "test@gmail.com",
			"tgl_lahir":
			"alamat":
	    "password": "",
	    "createdAt": "2022-11-24T13:13:25.000Z",
	    "updatedAt": "2022-11-24T13:13:25.000Z"
		},
		{
			"id": 2,
	    "name": "TestApp",
	    "email": "test@gmail.com",
			"tgl_lahir":
			"alamat":
	    "password": "",
	    "createdAt": "2022-11-24T13:13:25.000Z",
	    "updatedAt": "2022-11-24T13:13:25.000Z"
		},
		{
			"id": 3,
	    "name": "TestApp",
	    "email": "test@gmail.com",
			"tgl_lahir":
			"alamat":
	    "password": "",
	    "createdAt": "2022-11-24T13:13:25.000Z",
	    "updatedAt": "2022-11-24T13:13:25.000Z"
		},
	]
}
```

### Failed response :

- Status code : 409

```jsx
{
	status: false,
	message: "data user tidak dapat ditemukan"
}
```

# Get User By ID

### Endpoint :

- /api/user/:id

### Request :

- Method : **GET**
- Request Header :
- Request Body :

### Response :

### Success response :

- Status code : 200

```jsx
{
	status: true,
	message: "data user berhasil ditemukan"
	data: {
    "id": 1,
	    "name": "TestApp",
	    "email": "test@gmail.com",
			"tgl_lahir":
			"alamat":
	    "password": "",
	    "createdAt": "2022-11-24T13:13:25.000Z",
	    "updatedAt": "2022-11-24T13:13:25.000Z"
  }
}
```

### Failed response :

- Status code : 409

```jsx
{
	status: false,
	message: "data user tidak dapat ditemukan"
}
```

# Update User :

## Endpoint :

- /api/user/update/{id}

## Request :

- Method : **PUT**
- Request Header :
- Request Body :
    
    
    | Key | Data Type | Mandatory | Desc |
    | --- | --- | --- | --- |
    | fullname | STRING | Yes |  |
    | tgl_lahir |  | Yes |  |
    | alamat | STRING | Yes |  |

## Response :

## Succsess response :

- Status code : 201

```jsx
{
	status: true,
	message: "data user berhasil di update"
}
```

## Failed response :

- Status code : 422
    - Validation : not sent with the valid data request.
- Request Body :

```jsx
{
  "status": false,
  "message": "Data yang diberikan tidak valid",
  "errors": [
    {
      "fullname": "fullname wajib diisi",
    },
    {
      "tgl_lahir": "Tanggal Lahir wajib diisi",
    },
    {
      "alamat": "Alamat wajib diisi"
    }
  ]
}
```

- Status code : 409

```jsx
{
	status: false,
	message: "data user gagal di update"
}
```
--------------
# Logout

### Endpoint :

- **/api/auth/logout**

### Request :

- Method : **POST**
- Request Body : -
- Request Header :

| key | Data Type | Mandatory | Desc | Example |
| --- | --- | --- | --- | --- |
| Authorization | String | Yes | the token that get from login | Bearer eyJ0eXAiOiJKV1QiL.....… |

### Response :

### Success response :

- Status Code : 200

```jsx
{
    "status": true,
    "message": "User logged out successfully."
}
```

Failed response 

- status code : 401 (Unauthorized)
    
    ```jsx
    {
        "status": false,
        "message": 'Unauthorized access.'
    }
    ```
    
- status code : 403 (the token is not sent in the header)
    
    ```jsx
    {
        "status": false,
    		"message"   : "No token provided."
    }
    ```
    
-------------------------

#Daerah

## Get list Daerah

### Endpoint :

- **/api/all-daerah**

### Request :

- Method : **GET**
- request header : -
- Request Body : -

### Response :

### Success response :

- Status Code : 200
    
    ```json
    
        "status": true,
        "data": [
    			{
    				"id"   : 1
    				"name" : "medan"
    				"thumbnail" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5LAWdxSsdamwEWiIv4bLTtflFls6MQChvLgcmGnMgPw&s",
    				"url" : "medan"
    			},
    			{
    				"id"   : 2
    				"name" : "bali"
    				"thumbnail" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5LAWdxSsdamwEWiIv4bLTtflFls6MQChvLgcmGnMgPw&s",
    				"url" : "bali"		
    			},
    			{
    				"id"   : 3
    				"name" : "Jawa timur"
    				"thumbnail" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5LAWdxSsdamwEWiIv4bLTtflFls6MQChvLgcmGnMgPw&s"
    				"url" : "Jawa-timur"			
    			}
    		]
    ```
    

### Failed response :

- status Code : 409 (unexpected failed)
    
    ```jsx
    {
        "status": false,
        "message": "Something problem"
    }
    ```
    

# Find Daerah **By URL**

### Endpoint :

- api/daerah/{url}

### Request :

- Method : get
- Request Header :
- Request Body : -

### Response :

### Success response :

- Status code : 200

```jsx
{
    "status": true,
    "data": {
        
    }
}
```

### Failed response :

- status code : 401 (Unauthorized)
    
    ```jsx
    {
        "status": false,
        "message": 'Unauthorized access.'
    }
    ```
    
- status code : 403 (the token is not sent in the header)
    
    ```jsx
    {
        "status": false,
    		"message"   : "No token provided."
    }
    ```
    
- Status code : 409
    
    ```jsx
    {
    	status: false,
    	message: "Data gagal didapatkan"
    }
    ```
    

# Add Daerah

(**hanya bisa di access oleh admin)**

- api/kategori/

### Endpoint :

- Request :
- Method : **POST**
- Request Header :
- Request Body :
- 

| key | Data Type | Mandatory | Desc |
| --- | --- | --- | --- |
| nama | String | Yes | required, min 5char, unique |
| image | String | Yes | requirel |
| thumbnail | String | yes | required |
| descripsi | String |  | required |

### Response :

### Success response :

- Status code : 201
    
    ```jsx
    {
        "status": true,
        "message": 'Kategori berhasil ditambahkan'
    }
    ```
    

### Failed response :

- status code : 401 (Unauthorized) when the access token sent data is bad or not the same
    
    ```jsx
    {
        "status": false,
        "message": 'Unauthorized access.'
    }
    ```
    
- status code : 403 (the token is not sent in the header) when does not find the access token
    
    ```jsx
    {
        "status": false,
    		"message"   : "No token provided."
    }
    ```
    
- Status code : 409 (there was an error in the back end which probably failed to get the data from the database)
    
    ```jsx
    {
    	status: false,
    	message: "Data gagal ditambahkan."
    }
    ```
    
- Status code : 422
    
    ```jsx
    {
        "status": false,
        "message": "Data yang diberikan tidak valid",
        "errors": [
                {
                    "msg": "Nama wajib diisi",
                    "param": "nama",
                    "location": "body"
                },
                {
                    "msg": "must be at least 5 chars long",
                    "param": "nama",
                    "location": "body"
                },
                {
                    "msg": "Gambar wajib diisi",
                    "param": "gambar",
                    "location": "body"
                },
                {
                    "msg": "deskripsi wajib diisi",
                    "param": "deskripsi",
                    "location": "body"
                },
                {
                    "msg": "WHERE parameter \"nama\" has invalid \"undefined\" value",
                    "param": "nama",
                    "location": "body"
                }
           ]
        
    }
    ```
    
- Status code : 401 ( when doesn't have access to the hit endpoint / role access is not met )
    
    ```jsx
    {
        "status": false,
        "message": "You Dont have Permission"
    }
    ```
    

# Update Daerah :

(**hanya bisa di access oleh admin)**

## Endpoint :

- /api/daerah/{id}

## Request :

- Method : **PUT**
- Request Header :
- Request Body :

| key | Data Type | Mandatory | Desc |
| --- | --- | --- | --- |
| nama | String | Yes | required, min 5char, unique |
| image | String | Yes | requirel |
| thumbnail | String | yes | required |
| descripsi | String |  | required |

## Response :

## Succsess response :

- Status code : 200

```jsx
{
	status: true,
	message: "Data berhasil di update"
}
```

## Failed response :

- status code : 400 (Not Fount) when id kategori unrecognizable
    
    ```jsx
    {
        "status": false,
       "message" : `kategori not found`
    }
    ```
    
- status code : 401 (Unauthorized) when the access token sent data is bad or not the same
    
    ```jsx
    {
        "status": false,
        "message": 'Unauthorized access.'
    }
    ```
    
- status code : 403 (the token is not sent in the header) when does not find the access token
    
    ```jsx
    {
        "status": false,
    		"message"   : "No token provided."
    }
    ```
    
- Status code : 409 (there was an error in the back end which probably failed to get the data from the database)
    
    ```jsx
    {
    	status: false,
    	"message": "Data gagal Diupdate.",
    }
    ```
    
- Status code : 422
    
    ```jsx
    {
        "status": false,
        "message": "Data yang diberikan tidak valid",
        "errors": [
                {
                    "msg": "Nama wajib diisi",
                    "param": "nama",
                    "location": "body"
                },
                {
                    "msg": "must be at least 5 chars long",
                    "param": "nama",
                    "location": "body"
                },
                {
                    "msg": "Gambar wajib diisi",
                    "param": "gambar",
                    "location": "body"
                },
                {
                    "msg": "deskripsi wajib diisi",
                    "param": "deskripsi",
                    "location": "body"
                },
                {
                    "msg": "WHERE parameter \"nama\" has invalid \"undefined\" value",
                    "param": "nama",
                    "location": "body"
                }
           ]
        
    }
    ```
    
- Status code : 401 ( when doesn't have access to the hit endpoint / role access is not met )
    
    ```jsx
    {
        "status": false,
        "message": "You Dont have Permission"
    }
    ```
    

# Delete Daerah :

(**hanya bisa di access oleh admin)**

## Endpoint :

- /api/daerah/{id}

## Request :

- Method : DELETE
- Request Header :
- Request Body : -

## Response :

## Succsess response :

- Status code : 200

```jsx
{
	status: true,
  message : "Kategori berhasil Dihapus"
}
```

## Failed response :

- status code : 400 (Not Fount) when id kategori unrecognizable
    
    ```jsx
    {
        "status": false,
       "message" : `kategori not found`
    }
    ```
    
- status code : 401 (Unauthorized) when the access token sent data is bad or not the same
    
    ```jsx
    {
        "status": false,
        "message": 'Unauthorized access.'
    }
    ```
    
- status code : 403 (the token is not sent in the header) when does not find the access token
    
    ```jsx
    {
        "status": false,
    		"message"   : "No token provided."
    }
    ```
    
- Status code : 409 (there was an error in the back end which probably failed to get the data from the database)
    
    ```jsx
    {
    	status: false,
    	message : "Data gagal Dihapus",
    }
    ```
    
- Status code : 401 ( when doesn't have access to the hit endpoint / role access is not met )
    
    ```jsx
    {
        "status": false,
        "message": "You Dont have Permission"
    }
    ```
