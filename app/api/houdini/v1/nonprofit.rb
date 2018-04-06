# License: AGPL-3.0-or-later WITH Web-Template-Output-Additional-Permission-3.0-or-later
class Houdini::V1::Nonprofit < Houdini::V1::BaseAPI
   helpers Houdini::V1::Helpers::ApplicationHelper, Houdini::V1::Helpers::RescueHelper

   before do
    # protect_against_forgery
   end

  desc 'Return a nonprofit.' do
    success Houdini::V1::Entities::Nonprofit
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

   #rescue_ar_invalid(User => :user)
  desc 'Register a nonprofit' do
    success Houdini::V1::Entities::Nonprofit

    #this needs to be a validation an array
    failure [{code:400, message:'Validation Errors',  model: Houdini::V1::Entities::ValidationError}]
  end
  params do
    requires :nonprofit, type: Hash do
      requires :name, type:String, desc: 'Organization Name', allow_blank: false
      requires :url, type:String, allow_blank: false, desc: 'Organization website URL', url: true
      requires :zip_code, type:String, allow_blank: false, desc: "Organization Address ZIP Code"
      requires :state_code, type:String, allow_blank: false, desc: "Organization Address State Code", values: Format::Geography::StateCodes
      requires :city, type:String, allow_blank: false, desc: "Organization Address City"
      optional :email, type:String, desc: 'Organization email (public)'
      optional :phone, type:String, desc: 'Organization phone (public)'
    end

    requires :user, type: Hash do
      requires :name, type:String, desc: 'Full name', allow_blank:false
      requires :email, type:String, desc: 'Username', allow_blank: false
      requires :password, type:String, desc: 'Password', allow_blank: false, is_equal_to: :password_confirmation
      requires :password_confirmation, type:String, desc: 'Password confirmation', allow_blank: false
    end


  end
  post '/register' do

    Qx.transaction do
      np = Nonprofit.new(OnboardAccounts.set_nonprofit_defaults(params[:nonprofit]))
      np.save!

      billing_plan = BillingPlan.find(Settings.default_bp.id)
      b_sub = np.billing_subscription.build(billing_plan: billing_plan, status: 'active')
      b_sub.save!

      u = User.new(params[:user])
      u.save!

      role = u.roles.build(host: np, name: 'nonprofit_admin')
      role.save!
    end
    #onboard callback

    present np, as: Houdini::V1::Entities::Nonprofit
  end


end