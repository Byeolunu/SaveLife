# SaveLife Project

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/byeolunu/savelife.git

2. Create a .env file in the backend directory and add the following:
```bash
    DJANGO_SECRET_KEY=your-secret-key
    DJANGO_DEBUG=True
    DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
    DJANGO_DB_NAME=db.sqlite3
    DJANGO_DB_USER=
    DJANGO_DB_PASSWORD=
    DJANGO_DB_HOST=
    DJANGO_DB_PORT=
```
3. Install Dependencies 
```bash 
    pip install -r requirements.txt
```
4. Run migrations 
```bash 
    cd donation_backend 
    python manage.py migrate
```

5. Start developpement server : 
```bash 
    python manage.py runserver
```

6. In another terminal follow these steps to run the frontend 
```bash 
    npm install
    cd donation_frontend
    npm start
```
