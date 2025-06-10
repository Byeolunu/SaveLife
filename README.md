# SaveLife Project

SaveLife is a web application designed to empower individuals and organizations to create, manage, and contribute to campaigns aimed at making a positive impact in the world. Whether it's raising funds for disaster relief, supporting education initiatives, or helping communities access clean water, SaveLife provides a platform to connect donors with meaningful causes.

### **Features**
- **Campaign Management**: Users can create and manage campaigns with detailed descriptions, goals, and images.
- **Donation System**: Donors can contribute to campaigns securely and track progress toward goals.
- **User Profiles**: Personalized profiles for individuals and organizations to manage their activities.
- **Inspiring Stories**: A section dedicated to showcasing impactful stories that inspire action.
- **Authentication**: Secure login and registration system with JWT-based authentication.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Frontend**: Built with React and TailwindCSS for a modern and responsive user interface.
- **Backend**: Powered by Django REST Framework for robust API functionality.

### **Technologies Used**
- **Frontend**: React, TailwindCSS, Axios, Framer Motion
- **Backend**: Django, Django REST Framework, SimpleJWT
- **Database**: SQLite (development), configurable for production databases
- **Version Control**: Git and GitHub

### **Purpose**
SaveLife aims to simplify the process of fundraising and connecting donors with causes that matter. By providing a user-friendly interface and secure backend, SaveLife ensures transparency and trust in the donation process.

### **How It Works**
1. **Organizations**: Create campaigns with detailed descriptions, goals, and images.
2. **Donors**: Browse campaigns, read inspiring stories, and contribute to causes.
3. **Progress Tracking**: Monitor campaign progress and celebrate milestones.
4. **Stories**: Share impactful stories to inspire others to take action.

### **Contributing**
We welcome contributions to improve SaveLife! Feel free to fork the repository, create pull requests, or report issues.

### **License**
This project is licensed under the MIT License. See the LICENSE file for details.

<<<<<<< HEAD
=======
SaveLife is a web application designed to empower individuals and organizations to create, manage, and contribute to campaigns aimed at making a positive impact in the world. Whether it's raising funds for disaster relief, supporting education initiatives, or helping communities access clean water, SaveLife provides a platform to connect donors with meaningful causes.

### **Features**
- **Campaign Management**: Users can create and manage campaigns with detailed descriptions, goals, and images.
- **Donation System**: Donors can contribute to campaigns securely and track progress toward goals.
- **User Profiles**: Personalized profiles for individuals and organizations to manage their activities.
- **Inspiring Stories**: A section dedicated to showcasing impactful stories that inspire action.
- **Authentication**: Secure login and registration system with JWT-based authentication.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Frontend**: Built with React and TailwindCSS for a modern and responsive user interface.
- **Backend**: Powered by Django REST Framework for robust API functionality.

### **Technologies Used**
- **Frontend**: React, TailwindCSS, Axios, Framer Motion
- **Backend**: Django, Django REST Framework, SimpleJWT
- **Database**: SQLite (development), configurable for production databases
- **Version Control**: Git and GitHub

### **Purpose**
SaveLife aims to simplify the process of fundraising and connecting donors with causes that matter. By providing a user-friendly interface and secure backend, SaveLife ensures transparency and trust in the donation process.

### **How It Works**
1. **Organizations**: Create campaigns with detailed descriptions, goals, and images.
2. **Donors**: Browse campaigns, read inspiring stories, and contribute to causes.
3. **Progress Tracking**: Monitor campaign progress and celebrate milestones.
4. **Stories**: Share impactful stories to inspire others to take action.

### **Contributing**
We welcome contributions to improve SaveLife! Feel free to fork the repository, create pull requests, or report issues.



>>>>>>> 2cc49e67fb08fcbcf60e5c5d5b6324bbad6819a3
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
🔴 you can get your secret key using this command in a python file : 
```bash 
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
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
<<<<<<< HEAD
=======


## Authentication Tokens

- Access tokens and refresh tokens are dynamically generated during user login and securely stored in the browser's `localStorage`.
- If you encounter issues with authentication, clear the tokens using the browser's Developer Tools and refresh the page.
>>>>>>> 2cc49e67fb08fcbcf60e5c5d5b6324bbad6819a3
