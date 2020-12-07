Rails.application.routes.draw do
  resources :projects do
    resources :tasks, shallow: true
  end
  get "/pages/:page" => "static_pages#show"
  root "tasks#index"
end
