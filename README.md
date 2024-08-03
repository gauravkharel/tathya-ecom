#### Tathya Fullstack Ecommerce App v2
<<<<<<< refs/remotes/origin/feat/cart
=======
An Ecommerce App where businesses from Nepal sell products anywhere in the world. 
>>>>>>> local

### Tech Stack Used (PERN Stack)
- React
- TailwindCSS
- Node
- ExpressJS
- PostgreSQL
- Prisma ORM

### Blogs:
[1. Token Authentication in a SPA App : Recommendation](https://medium.com/lightrail/getting-token-authentication-right-in-a-stateless-single-page-application-57d0c6474e3)

[2. How To Validate a JWT Token](https://medium.com/dataseries/public-claims-and-how-to-validate-a-jwt-1d6c81823826)

[3. Mutation in React Query](https://tkdodo.eu/blog/mastering-mutations-in-react-query)

[4. Separate API Layers in react](https://profy.dev/article/react-architecture-api-layer)

[5. Error Handling in Express](https://www.turing.com/kb/how-to-master-express-js-error-handling)

[6. Uploadthing working as a wrapper for S3: Illustration](https://github.com/pingdotgg/uploadthing/blob/main/assets/Diagram.png)



### Developing feature by feature from backend to frontend (Also, product flow or, say, user story.)
#### Customer end:
1. Authentication with JWT
- User register with required credentials and, get redirected to login page. Once the login is done, than the user is redirected to home page to browse products and, product details. 
- Roles based authentication.
2. Products with filter and, search.
- User are alllowed to CRUD Products. 
-  In products, user can use filter and, search using categories, prices and, sizes filters.
- For better UX, lazy loading and, optimistic rendering is needed. 
        + Product detail layout with filters
        
3. Cart and, orders
- User can add anything to card and, have option to select product from cart to later, order. 

#### Employers end
1. Product management
2. Order managment
3. Dashboard

### Just JWT stuff
![How JWT is implemented](images/jwt.png)


### Problems
1. Cart Problem
Cart should retrieve from API and store in react context. And the context should update add to cart function and update cart in the backend and in the frontend over other component. 
As we used react-query to fetch the cart, the cart needs to get updated in each add to cart function call as cart data is updated. 
We already had the react query provided to all the component. 



