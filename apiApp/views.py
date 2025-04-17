from rest_framework.decorators import api_view
from .models import CartItem, Product, Category, Cart, Review, Wishlist
from .serializers import CartSerializer, CategoryDetailSerializer, ProductListSerializer, ProductDetailSerializer, CategoryListSerializer, CartItemSerializer, ReviewSerializer, WishlistSerializer
from rest_framework.response import Response
from django.contrib.auth import get_user_model

User = get_user_model()

@api_view(['GET'])
def product_list(request):
    products = Product.objects.filter(featured=True)
    serializer = ProductListSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def product_detail(request, slug):
    product = Product.objects.get(slug=slug)
    serializer = ProductDetailSerializer(product)
    return Response(serializer.data)

@api_view(['GET'])
def category_list(request):
    categories = Category.objects.all()
    serializer = CategoryListSerializer(categories, many=True)
    return Response(serializer.data)

def category_detail(request, slug):
    category = Category.objects.get(slug=slug)
    serializer = CategoryDetailSerializer(category)
    return Response(serializer.data)

@api_view(['POST'])
def add_to_cart(request):
    cart_code = request.data.get('cart_code')
    product_id = request.data.get('product_id')

    cart, created = Cart.objects.get_or_create(cart_code=cart_code)
    product = Product.objects.get(id=product_id)

    cartitem, created = CartItem.objects.get_or_create(cart=cart, product=product)
    cartitem.quantity = 1
    cartitem.save()

    serializer = CartSerializer(cart)
    return Response(serializer.data)

@api_view(['POST'])
def update_cartitem_quantity(request):
    cartitem_id = request.data.get('item_id')
    quantity = request.data.get('quantity')

    quantity = int(quantity)

    cartitem = CartItem.objects.get(id=cartitem_id)
    cartitem.quantity = quantity
    cartitem.save()

    serializer = CartItemSerializer(cartitem)
    return Response({"data": serializer.data, "message": "Cartitem updated successfully!"})

@api_view(['POST'])
def add_review(request):
    product_id = request.data.get('product_id')
    email = request.data.get('email')
    rating = request.data.get('rating')
    review_text = request.data.get('review')

    product = Product.objects.get(id=product_id)
    user = User.objects.get(email=email)

    if Review.objects.filter(product=product, user=user).exists():
        return Response({"message": "You have already reviewed this product!"}, status=400)

    review = Review.objects.create(product=product, user=user, rating=rating, review=review_text)

    serializer = ReviewSerializer(review)

    return Response({"data": serializer.data, "message": "Review added successfully!"})

@api_view(['PUT'])
def update_review(request, pk):
    review = Review.objects.get(id=pk)
    rating = request.data.get('rating')
    review_text = request.data.get('review')

    review.rating = rating
    review.review = review_text
    review.save()

    serializer = ReviewSerializer(review)

    return Response({"data": serializer.data, "message": "Review updated successfully!"})

@api_view(['DELETE'])
def delete_review(request, pk):
    review = Review.objects.get(id=pk)
    review.delete()

    return Response({"message": "Review deleted successfully!"}, status=204)

@api_view(['POST'])
def add_to_wishlist(request):
    email = request.data.get('email')
    product_id = request.data.get('product_id')

    user = User.objects.get(email=email)
    product = Product.objects.get(id=product_id)

    wishlist = Wishlist.objects.filter(user=user, product=product)

    if wishlist:
        wishlist.delete()
        return Response("Product removed from wishlist successfully!", status=204)
    

    new_wishlist = Wishlist.objects.create(user=user, product=product)
    serilaizer = WishlistSerializer(new_wishlist)

    return Response({"data": serilaizer.data,"message": "Product added to wishlist successfully!"})

@api_view(['DELETE'])
def delete_cartitem(request, pk):
    cartitem = CartItem.objects.get(id=pk)
    cartitem.delete()

    return Response({"message": "Cart item deleted successfully!"}, status=204)