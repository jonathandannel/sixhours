# About the project

This project was built to demonstrate my knowledge of React and the JavaScript programming language in general -- It was written within the context of a small take-home assessment for a Toronto-based startup/incubator.

It is a simple client side application that queries data from an external source (in this case, a private API) and displays the results in a simple and intuitive manner. Users can search for 'orders' by worker name and the orders will be filtered based on that. Querying orders returns a worker ID, which then must be cross referenced by querying a different route for worker information, such as name and company. It was a fun exercise to work on, and a great chance to show my familiarity with common web development tasks, such as:

- Fetching external data and manipulating it in a meaningful way
- Organizing and reorganizing data based on search terms or filters
- Using modern styling tools to create crisp, clean designs

Please note that the actual API routes and all references to the assessment and the company itself have been removed as to discourage 'cheating' on the assessment by other applicants, as requested by the company.

# Screen

# Features

- Fast, responsive search
- Single page application, no refreshing required
- Functional stateless React components using the Hooks API
- Data for workers and work orders is fetched only once. Subsequent filters and result toggles will not trigger more API calls
- Toggle switch for sorting by oldest or newest work orders
- Friendly dates and a simple UI
- Created in ~6 hours :)

# Thank you for your time

This project was made with love (and haste) on Monday, August 5, 2019. I deeply apologize for any non-JSX induced rage that may occur as a result of viewing the code!
