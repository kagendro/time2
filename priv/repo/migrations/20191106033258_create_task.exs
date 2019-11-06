defmodule Time1.Repo.Migrations.CreateTask do
  use Ecto.Migration

  def change do
    create table(:task) do
      add :name, :string
      add :hours, :integer

      timestamps()
    end

  end
end
