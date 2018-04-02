class Houdini::API < Grape::API
  format :json
  mount Houdini::V1::API => '/v1'
end