# Time2

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix

## Design

Login:

My idea was to provide with a place to both sign up, or sign into the timesheet app. If they chose to sign in, they would be promped to write their name, email, password, and password confirmation, which would then be stored in my database. The other option, sign in, would prompt users to input just their email and password, and also provide a drop down where they could select whether they are a 'worker' or 'manager'. This selection determines what features they will have access to within the app.

Timesheets:

One of the main features of this app is creating timesheets. Under the "create new timesheet" tab in the navigation bar, the user will see a form consisting of 8 rows. Here, the user can select which job they worked on from a dropdown, and also input the number of hours they worked on it. Once they are ready, they can press the submit button which will push the timesheet to the database. 

Home Screen:

To keep things simple, I chose to aggregate all of the users timesheets on the home page. For the user, nothing can be adjusted on this page. All they can do is view their timesheets. When a manager logs in, however, they will have additional functionality that allows them to mark whether or not the users timesheet is approved. This is shown as a check box in the third row of each timesheet. Once this is completed, the worker will be able to see the approval status of their timesheets on their page. 
