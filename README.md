#Mini Search Engine with Authentication -
A full-stack mini search engine that allows authenticated users to upload image-based documents and perform fast keyword searches using inverted indexing.
The application includes secure authentication, protected routes, and per-user search history.

#Features
-User authentication using JWT
-Role-based access control(User & Admin)
-Password hashing
-Secure protected routes
-Upload and index JPG/PNG documents
-Fast keyword-based search using inverted indexing
-Search history stored per user
-Admin-only protected routes for specific operations
-Clean and responsive UI
-Proper error and edge-case handling

#Authorization and Access Control
-Users are assigned roles(User/Admin) , by default User
-JWT middleware protects all private routes
-Admin only routes for privileged actions such as : 
-Viewing all documents uploaded by the users for moderation and safety checks
-Deleting inappropiate or unsafe content

#Admin Assignment
-Admin roles are assigned manually at the database level 
-This approach is intentional to prevent unauthorized priviledge escalation
-Admin routes are protected using role-based middleware

#Tech Stack
-Frontend : React ,React Router DOM , Tailwind CSS , Framer Motion (UI animations)
-Backend : Node.js , Express.js , MongoDB, JWT Authentication , Multer , CORS , bcrypt.js (Password hashing)

#Concepts used : 
-RESTful APIs 
-Inverted Index data structure for keyword-search
-JWT-based authentication & authorization
-Middleware based request handling
-MVC architecture
-File upload validation using Multer
-Secure password hashing

#Supported File Types : JPG , PNG 
( pdf support was intentionally excluded in the current version to keep the system safe and stable , it is planned as a future enhancement)

#Installation & Setup
-Clone the repository 

-Backend Setup
cd backend 
npm install 
npm start

-Frontend Setup
cd frontend 
npm install 
npm run dev

-Environment Variables 
-Create a .env file in the backend directory


#Live URL



#Author
Wani Rathaur
-Github : https://github.com/wani0502
-LinkedIn : https://lnkedin.com/in/wani-rathaur-096a54343
