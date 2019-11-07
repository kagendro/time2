defmodule LensWeb.Router do
  use LensWeb, :router

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

  scope "/ajax", LensWeb do
    pipe_through :ajax

    resources "/users", UserController, except: [:new, :edit]
    resources "/photos", PhotoController, except: [:new, :edit]
    get "/photos/:id/file", PhotoController, :file
    resources "/tags", TagController, except: [:new, :edit]
    resources "/photo_tags", PhotoTagController, except: [:new, :edit]
    resources "/sessions", SessionController, only: [:create], singleton: true
  end

  scope "/", LensWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/*path", PageController, :index
  end

end