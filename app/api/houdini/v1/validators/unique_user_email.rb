# License: AGPL-3.0-or-later WITH Web-Template-Output-Additional-Permission-3.0-or-later
class Houdini::V1::Validators::UniqueUserEmail < Grape::Validations::Base
  def validate_param!(attr_name, params)
    if User.find_by_email(params[attr_name])
      fail Grape::Exceptions::Validation, params: [@scope.full_name(attr_name)], message: 'is not unique. Please use a different email.'
    end
  end
end