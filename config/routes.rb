Rails.application.routes.draw do
  root "projects#index"

  get '/auth/:provider/callback', to: 'sessions#create'

  resources :projects do
    resources :reviews
    resources :sheets
  end
end
