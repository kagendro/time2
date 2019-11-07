defmodule Time1Web.TaskView do
  use Time1Web, :view
  alias Time1Web.TaskView

  def render("index.json", %{task: task}) do
    %{data: render_many(task, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      name: task.name,
      hours: task.hours}
  end
end

