class Houdini::V1::API < Grape::API
	#include Houdini::V1::Helpers::ApplicationHelper
	mount Houdini::V1::Nonprofit => '/nonprofit'
	# Additional mounts are added via generators above this line
  # DON'T REMOVE THIS OR THE PREVIOUS LINES!!!

	add_swagger_documentation
end