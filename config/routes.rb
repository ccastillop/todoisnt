Rails.application.routes.draw do
  resources :projects do
    resources :tasks, shallow: true
  end
  get "/pages/:page", to: "static_pages#show", as: :page
  root "tasks#index"
end
