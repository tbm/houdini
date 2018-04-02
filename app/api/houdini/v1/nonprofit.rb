class Houdini::V1::Nonprofit < Grape::API
helpers do
  def session
    env['rack.session']
  end

  def protect_against_forgery
    unless verified_request?
      error!('Unauthorized', 401)
    end
  end

  def verified_request?
    !protect_against_forgery? || request.get? || request.head? ||
        form_authenticity_token == request.headers['X-CSRF-Token'] ||
        form_authenticity_token == request.headers['X-Csrf-Token']
  end

  def form_authenticity_token
    session[:_csrf_token] ||= SecureRandom.base64(32)
  end

  def protect_against_forgery?
    allow_forgery_protection = Rails.configuration.action_controller.allow_forgery_protection
    allow_forgery_protection.nil? || allow_forgery_protection
  end
end
   before do
     protect_against_forgery
   end

  desc 'Return a nonprofit.' do
    success Entities::Nonprofit
  end
  params do
    requires :id, type: Integer, desc: 'Status id.'
  end
  route_param :id do
    get do
      np = Nonprofit.find(params[:id])
      present np, as: Houdini::V1::Entities::Nonprofit
    end
  end


end