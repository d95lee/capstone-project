class API::ProductsController < ApplicationController
    def show
        @product = Product.find(params[:id])
        if @product
            render json: @product
        else
            render json: { product: nil }
        end
    end

    def index 
        @products = Product.all
    end

end
