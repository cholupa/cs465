# cs465

Architecture

    Compare and contrast the types of frontend development you used in your full stack project, including Express HTML, JavaScript, and the single-page application (SPA).
    Why did the backend use a NoSQL MongoDB database?
    The first template was a basic html frontend page. The tehscond was using express and the third was with angular in the SPA admin page. all hav different techniques to get the pages up and running, but the most simple setup was using angular. The use of components and services to make the calls directly to the server were much more ismple than using controllers and routes with express. Mongodb was a good choice for the application as the information was dynamic and not only used for basic data such as user info, but also information on the trips and form data. Mongo is better suited for this as if there are multiple types of forms used, then document creation is much easier than the heavily structured and static data for an SQL database.
    

Functionality

    How is JSON different from Javascript and how does JSON tie together the frontend and backend development pieces?
    Provide instances in the full stack process when you refactored code to improve functionality and efficiencies, and name the benefits that come from reusable user interface (UI) components.
    JSON is the medium or middle man component to send and recieve the information from one place to another. It is easily read in structure and even easier to write. A good axample of this was the form creation. A JSON object was made to hold all the names and values for each field. With multiple forms each form can be written in a JSON object and fetched from the db. This also works well with Mongo as it also utilizes the same pattern in writing the documents.

Testing

    Methods for request and retrieval necessitate various types of API testing of endpoints, in addition to the difficulties of testing with added layers of security. Explain your understanding of methods, endpoints, and security in a full stack application.
    Multiple methods were used to test if the application was running properly, first from terminal with making sure the server was up and running, then the used of Postman. Postman was a good tool as you can test the security by making the HTTP calls directly. Editing params and submitting values will return the response from the server right on the same screen. This is also useful for testing the different endpoints in the API because they are wired to the HTTP calls.
