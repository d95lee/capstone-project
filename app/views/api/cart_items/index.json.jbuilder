@cart_items.each do |cart_item|
    json.set! cart_item.id do
        json.extract! cart_item, 
        :id, :quantity, :user_id, :product_id
        # if cart_item.photo.attached?
        #     json.photoUrl url_for(cart_item.photo)
        # end
    end
end