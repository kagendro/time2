defmodule Time1.Repo.Migrations.CreateWorkers do
  use Ecto.Migration

  def change do
    create table(:workers) do
      add :email, :string, null: false
      add :name, :string, null: false

      timestamps()
    end

  end
end
