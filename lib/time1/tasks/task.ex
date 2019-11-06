defmodule Time1.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset

  schema "task" do
    field :hours, :integer
    field :name, :string

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:name, :hours])
    |> validate_required([:name, :hours])
  end
end
