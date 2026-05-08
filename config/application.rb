require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Tavla
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 8.1

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w[assets tasks])

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    config.action_view.field_error_proc = Proc.new do |html_tag, instance_tag|
      fragment = Nokogiri::HTML.fragment(html_tag)
      field = fragment.at("input,textarea,select,label")

      model = instance_tag.object
      field_name = instance_tag.instance_variable_get(:@method_name)
      field_errors = model.errors.full_messages_for(field_name)

      html = if field && field_errors.any?

        error_message = field_errors.join(", ") # just this field's errors
        if field.name == "label"
          field.add_class("text-error")
          field.to_s.html_safe
        else
          field.add_class("input-error")
          <<-HTML.html_safe
            #{fragment}
            <p class="text-error">#{error_message}</p>
          HTML
        end
      else
        html_tag
      end

      html
    end
  end
end
