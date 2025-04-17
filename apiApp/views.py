from rest_framework.decorators import api_view
from .models import CartItem, Product, Category, Cart, Review
from .serializers import CartSerializer, CategoryDetailSerializer, ProductListSerializer, ProductDetailSerializer, CategoryListSerializer, CartItemSerializer, ReviewSerializer
from rest_framework.response import Response
from django.contrib.auth import get_user_model

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
    User = get_user_model()
    product_id = request.data.get('product_id')
    email = request.data.get('email')
    rating = request.data.get('rating')
    review_text = request.data.get('review')

    product = Product.objects.get(id=product_id)
    user = User.objects.get(email=email)

    review = Review.objects.create(product=product, user=user, rating=rating, review=review_text)

    serializer = ReviewSerializer(review)

    return Response({"data": serializer.data, "message": "Review added successfully!"})