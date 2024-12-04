exports.handler = async () => {
    const users = [
          {
            "name": {
              "en": "John Doe",
              "ar": "جون دو"
            },
            "phone_number": "00966558864248",
            "address": "Main St.",
            "email": "john.doe1@example.com",
            "password": "securepassword",
            "password_confirmation": "securepassword",
            "role": 2,
            "id": "0022"
          },
          {
            "name": {
              "en": "Mike Doe",
              "ar": "مايك دو"
            },
            "phone_number": "00966558863135",
            "address": "Down Town",
            "email": "Mike.doe1@example.com",
            "password": "securepassword",
            "password_confirmation": "securepassword",
            "role": 2,
            "id": "c4f6"
          },
          {
            "name": {
              "en": "Mike Doe",
              "ar": "مايك دو"
            },
            "phone_number": "00966558863135",
            "address": "Down Town",
            "email": "Mike.doe1@example.com",
            "password": "securepassword",
            "password_confirmation": "securepassword",
            "role": 2,
            "id": "wert"
          }
        ]
   
    return {
      statusCode: 200,
      body: JSON.stringify(users),
    };
  };
  