class NoAttachmentsValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    if value&.body&.attachments&.any?
      record.errors.add(attribute, "attachments are not allowed")
    end
  end
end

