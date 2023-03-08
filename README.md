![My Forum website project](https://github.com/rostamali/my-forum/blob/main/public/my-forum-website-preview.png 'My Forum website project')

</br>

# Welcome to My Forum Website

<p>Welcome to our My Forum website, where you can create an account and join in on the conversation with other users. By creating an account, you can create new threads, comment on existing threads, and update your user profile to share more about yourself with the community.</p>

</br>

### **Frontend Technology :**

</br>

-   **Next.js:** With [Next.js](https://nextjs.org/), we are able to provide our users with fast-loading pages and a seamless browsing experience.
-   **TypeScript:** [TypeScript](https://www.typescriptlang.org/) ensures that our code is easy to read, maintain, and debug.

-   **React Query:** [React Query](https://tanstack.com/query/latest) makes it easy for us to handle server state management and caching, while [Axios](https://axios-http.com/docs/intro) enables us to make API calls and fetch data from our database.

-   **Tailwind CSS:** I have also utilized [Tailwind CSS](https://tailwindcss.com/) and [Flowbite](https://flowbite-react.com/) to create beautiful and responsive user interfaces, making our website easy to navigate and aesthetically pleasing.

-   **React Hook Form:** [React Hook Form](https://react-hook-form.com/) is a powerful library that allows you to easily build and validate forms in React. We validate the form with [Yup](https://www.npmjs.com/package/yup) schema validation library.

-   **Next Themes:** We managed the website theme dark/light using Next Themes. Full website is design according to both dark and light theme.

-   **Toastify:** We used [React-Toastify](https://www.npmjs.com/package/react-toastify) to add notifications on this website.

</br>

### **Backend Technology :**

</br>

-   **Next connect:** We manage our API routes using Next Connect. With [Next Connect](https://github.com/hoangvvo/next-connect), we can easily add new functionality to your application's server, without having to write low-level code or deal with complex configurations.

-   **Mongoose:** With [Mongoose](https://mongoosejs.com/), you create schemas for our data, define validation rules, and perform CRUD operations on our [MongoDB](https://www.mongodb.com/) database.

-   **JWT:** For Authenticating and Authorization, we used [JSON Web Token](https://jwt.io/) to save user data in cookies.

-   **Nodemailer:** With [Nodemailer](https://nodemailer.com/about/), user can easily get forget or reset password link through their email.

</br>

### **Website Feature & API Functionality :**

</br>

### **# Authentication & Authorization:**

</br>

-   Create a new user account with Username, email, Password
-   User can singin by using user email and password with JWT and cookie
-   User have several role and according to role "user" can only access to user dashboard and "admin" have their own dashboard also.
-   According to user role we also managed some protected api route. Frontend also have some protected routes.
-   User can forget ans reset password

</br>

### **# Forum Functonality**

</br>

-   **Create Thread:** With React Hook Form and React Draft Editor validation, user can easily create thread posts with a rich text editor.

-   **Deleted Threrad:** If a user wants to permanently delete a thread, there have a "Delete" button that permanently removes the thread from the database.

-   **Create Category:** To organize thread posts, we provide admins with the ability to create categories. In "Category" Page have a form to add a new category.

-   **Delete Category:** Admin can also delete the category permanently.

As an admin of our forum website, we have certain tools and capabilities to help manage and moderate the community. One of these tools is the ability to disable a user account if we find that they are violating our community guidelines or behaving inappropriately.

</br>

### **# Website Preview On YouTube**

[![My Forum Website preview](http://img.youtube.com/vi/SrFEl_XWhoE/0.jpg)](http://www.youtube.com/watch?v=SrFEl_XWhoE)

</br>

## That's all for now. Thanks a lot for visiting My Forum website project.
