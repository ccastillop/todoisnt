Rails.application.routes.draw do
  resources :tasks
  resources :projects do
    resources :tasks
  end
  get "/pages/:page" => "static_pages#show"
  root "tasks#index"
end
