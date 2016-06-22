Rails.application.routes.draw do
  root 'fleets#index'
  resources :fleets
  resources :vehicles
  resources :drivers
  get '*unmatched_route', to: 'fleets#index'
end
