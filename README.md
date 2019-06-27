Read Me
- 
**Notes:** 
- .gitignore file contains mode_nodules 
- run npm install in app directory before using.




List of things that need to be worked on/improved
- 

**Problems I'm encountering:**
- `roleRedirect()` function in `/app/utilities/roleCheck.js` not working - think this has something to do with using passport.js.

- trouble using jQuery to create paginated datatables. 

- updating all users scores and career levels in the respondents table in database
upon redirecting to manager page. Wanted to do this instead of doing it manually. 
Something like, `if table row empty update row`. (last two functions in `/app/controllers/respondentController.js`)

**Authentication:**
- Possibly reconsider the use of passport.js library for authentication.
- Instead code up my own authentication to fully understand the full auth flow. 
- Reconsider the password encryption algorithm I'm using to increase security. 

**User Based Role Login:** 
- Implement a working page redirection depending on role of user upon login. 
- Design a function for users to set a password before first login. (securely email a page to set password)

**Manager Page:** 
- Create a paginated data table that displays all employees in the database.
- Make the names of these employees clickable to redirect to their profile. 
- Ensure that these routes can only be viewed by managers. 

**Admin Page:**
- Implement the same data table of Employees for admins. 
- Embed links beside each employee to redirect to an edit user, or delete user.
- Ensure edit user routes are only accessible by admins.
- Create users, delete users, update user role, update password/email.

**Employee profile page:** 
- Improve the data chart that displays user's data. 
- Provide more data visualisation options.
- Integrate Pluralsight/HR locker APIs

**Pluralsight API:**
- Provide course recommendations based on user scores. 

**App Structure / Design Pattern / Development**
- Improve the MVC pattern. 
- Correct code where objects are being passed as null/undefined
    - When trying to update all respondent scores and career levels in respondent table. 
- Create a separate development environment and deployment parameters in my app. 