defmodule Time1.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :name, :string
      add :hours, :integer
      add :worker_id, references(:workers, on_delete: :nothing)

      timestamps()
    end

    create index(:tasks, [:worker_id])
  end
end
