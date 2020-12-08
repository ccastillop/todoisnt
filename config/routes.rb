Rails.application.routes.draw do
  resources :projects
  resources :tasks
  get "/pages/:page", to: "static_pages#show", as: :page
  root "tasks#index"
end
