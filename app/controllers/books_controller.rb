class BooksController < ApplicationController
  layout 'application'
  load_and_authorize_resource

  def index
    @books = Book.order(:title).page params[:page]
  end

end
