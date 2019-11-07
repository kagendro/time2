defmodule Time1Web.Router do
  use Time1Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :ajax do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  scope "/ajax", Time1Web do
    pipe_through :ajax

    resources "/users", UserController, except: [:new, :edit]
    resources "/tasks", TaskController, except: [:new, :edit]
    get "/tasks/:id/file", TaskController, :file
    resources "/sessions", SessionController, only: [:create], singleton: true
  end

  scope "/", Time1Web do
    pipe_through :browser

    get "/", PageController, :index
    get "/*path", PageController, :index
  end

end