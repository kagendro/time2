# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Time1.Repo.insert!(%Time1.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.


alias Time1.Repo
alias Time1.Workers.Worker

Repo.insert!(%Worker{name: "Kevin", email: "kevin.gendron@gmail.com"})
Repo.insert!(%Worker{name: "Bob", email: "bob@example.com"})
