class Author < ApplicationRecord
    has_and_belongs_to_many :books
    validates :name, unique:  true
end
