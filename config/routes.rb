Rails.application.routes.draw do
  root "projects#index"

  # routes for calls to Google API
  get '/auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')
  get 'signout', to: 'sessions#destroy', as: 'signout'

  resources :sessions, only: [:create, :destroy]

  resources :projects
  resources :reviews
  resources :sheets
end
