Rails.application.routes.draw do
  root "projects#index"

  resources :reviews
  resources :sheets
end
