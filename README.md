Problems I'm encountering:
- Role redirection route not working (pages unrecognised).
- Pagination on Manger page for datatables. 


List of things that I want to work on.

Authentication:
- Possibly reconsider the use of passport.js library for authentication.
- Instead code up my own authentication to fully understand the full auth flow. 
- Reconsider the encryption algorithm I'm using to increase security. 

User Based Role Login: 
- Implement a working page redirection depending on role of user upon login. 
- Design a function for users to set a password before first login. (securely email a page to set password)

Manager Page: 
- Create a paginated data table that displays all employees in the database.
- Make the names of these employees clickable to redirect to their profile. 
- Ensure that these routes can only be view by managers. 

Admin Page:
- Implement the same data table of Employees for admins. 
- Embed links beside each employee to redirect to an edit user page, or delete user.
- Ensure edit user routes are only accessible by admins.
- Create users, delete users, update user role, update password/email.

Employee profile page: 
- Improve the data chart that displays user's data. 
- Provide more data visualisation options.
- Integrate Pluralsight/HR locker APIs

Pluralsight API:
- Provide course recommendations based on user scores. 

App Structure / Design Pattern / Development
- Improve the MVC pattern. 
- Correct code where objects are being passed as null/undefined.
- Create a separate development environment and deployment parameters in my app. 