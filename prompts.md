Bu proje charmmate isminde bir SAAS web uygulaması olacak.

Kullanıcılar sisteme üye olarak, benim sağladığım içerikleri seçerek, belirtecekleri belirli özellikler, başlangıç ve bitiş tarihleri arasında kendi web sayfalarında gösterimlerini sağlayacaklar.

Projeyi oluştururken senden fazlaca yardım alacağım.

Bu web uygulaması NextJS ile geliştirilecek ve direkt olarak veritabanı kullanmak yerine contentmate-webservice isimli web servisimizi kullanacak.
Web serviste gereken tüm iş zekası yer almakta. Restfull bir yapıya sahip. Seni bilgilendirmek adına, aşağıda sana birkaç örnek endpoint veriyorum.

// Register
POST http://localhost:3000/v1/auth/register
Content-Type: application/json

{
    "firstname": "test_user",
    "lastname": "test_user_lastname",
    "email": "test@local.com",
    "password": "password1.X"
}

// Login
POST http://localhost:3000/v1/auth/login
Content-Type: application/json

{
    "email": "test@local.com",
    "password": "password1.X"
}

// Verifying Email
GET http://localhost:3000/auth/verify-email/f0ff4193-ca5e-4369-96b7-8dbf90fa5498

// Forgot Password
POST http://localhost:3000/v1/auth/forgot-password
Content-Type: application/json

{
    "email": "email@local.com"
}

// Reset Password
POST http://localhost:3000/auth/reset-password/c8467a47-a46e-4f16-937b-8e1817220005
Content-Type: application/json

{
    "password": "password1.X"
}

// Users
GET http://localhost:3000/v1/user/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidGVzdEBsb2NhbC5jb20iLCJpYXQiOjE3MzQ5NjQ4MDYsImV4cCI6MTczNDk2ODQwNn0.MeJHt6JughGl3DQXNj9tZ4rCarkwdF92dn07wcnofFc

// Get Content
GET http://localhost:3000/v1/content
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidGVzdEBsb2NhbC5jb20iLCJpYXQiOjE3MzQ4Njg1ODgsImV4cCI6MTczNDg3MjE4OH0.r449MW_KI2hsVNH1vo3yR1BWU6Vv7EJG9hc9O71khJk

// Get Content by PublisherKey
GET http://localhost:3000/v1/content/publisher/642e16f1-aad0-4ef8-a815-3a5fd40f8bb0
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsImVtYWlsIjoidGVzdEBsb2NhbC5jb20iLCJpYXQiOjE3MzQ3ODUxMjksImV4cCI6MTczNDc4ODcyOX0.e8EETJsyeEzCpUoY9s3bn817M2l2XmXJbUcrY2EmCbQ

// Post Content
POST http://localhost:3000/v1/content
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidGVzdEBsb2NhbC5jb20iLCJpYXQiOjE3MzQ5NjU2MTAsImV4cCI6MTczNDk2OTIxMH0._DVny8MtbOiy99BNZ9Xn4wnAODx5UuOJQrtUeueamg0
Content-Type: application/json

{
  "startAt": "2025-03-19T14:30:00.000Z",
  "endAt": "2025-03-19T14:30:00.000Z",
  "title": "Sample Content",
  "isActive": true,
  "domain": "localhost",
  "userId": 1,
  "displayTrigger": "immediate",
  "publisherKeyId": 1,
  "script": "console.log('Hello World')",
  "style": "canvas{pointer-events:none;position:fixed;top:0;left:0;width:100vw;height:400px}"
}

// Delete Content
DELETE http://localhost:3000/v1/content/12
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidGVzdEBsb2NhbC5jb20iLCJpYXQiOjE3MzQ3MTAxMjgsImV4cCI6MTczNDcxMzcyOH0.gzW9vMuBBePq1MGPjzQ5AL5zNc_qtOs3vb5HUOMcrSk

// Get Publisher-Key
GET http://localhost:3000/v1/publisher-key
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidGVzdEBsb2NhbC5jb20iLCJpYXQiOjE3MzQ5NjU2MTAsImV4cCI6MTczNDk2OTIxMH0._DVny8MtbOiy99BNZ9Xn4wnAODx5UuOJQrtUeueamg0

// Post Publisher-Key
POST http://localhost:3000/v1/publisher-key
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidGVzdEBsb2NhbC5jb20iLCJpYXQiOjE3MzQ4MTQ1MDksImV4cCI6MTczNDgxODEwOX0.ibG434PoX-6rTMlCpvXbhq-zgNI6fptcTK8zOhZLz-Q
Content-Type: application/json

{
  "key": "f0025967-045d-4538-be50-89ecb1ac6126",
  "isActive": true,
  "limit": 0,
  "isPublic": true
}

örnek cevaplar ise şu şekilde olacak:

// Register
// 204 Created

// Login
// 201 Created
{
    "access_token": "token_string"
}

// Verifying Email
// 200 OK
{
    "message": "Email verified"
}

Yazacağın kodlar için birkaç kısıtlama getirmek istiyorum. Bu kısıtlamaları aşağıda sıralıyorum.

1. Tüm veri tipleri için types klasörü altında bir type dosyası olmalı. ve interface yerine type kuullanılmalı. dosya isimleri T ön eki ile başlamalı.

2. Enum kullanacağın yerlerde yine enums klasörü olmalı ve enumlar bu klasör altına kaydedilmeli. dosyas isimlerinin başında E ön eki olmalı.

3. tüm kodlar best practise kurallarına uygun olmalı.

4. tüm kodlar test edilebilir olmalı.

5. NextJS in app router yapısı ile çalıştığımı belirtmek isterim. Ayrıca pojemde default olarak src klasörü kullanmıyorum kodları buna göre yazmalısın.

6. kodlar modüler olmalı. mesela auth diye bir klasör oluşturup içerisine register, login, verify-email, forgot-password, reset-password dosyalarını oluşturduysan eğer, mutlaka types kulasöründe de bir auth dosyası olmalı ve içerisinde tüm auth işlemleri için gerekli olan type tanımlamaları olmalı.