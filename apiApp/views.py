from rest_framework.decorators import api_view
from .models import CartItem, Order, OrderItem, Product, Category, Cart, Review, Wishlist
from .serializers import CartSerializer, CategoryDetailSerializer, CustomUserSerializer, LoginUserSerializer, ProductListSerializer, ProductDetailSerializer, CategoryListSerializer, CartItemSerializer, RegisterUserSerializer, ReviewSerializer, WishlistSerializer
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.db.models import Q
import stripe
from django.conf import settings
from rest_framework.generics import RetrieveUpdateAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.views import TokenRefreshView

stripe.api_key = settings.STRIPE_SECRET_KEY
endpoint_secret = settings.STRIPE_WEBHOOK

User = get_user_model()

class UserInfoView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CustomUserSerializer

    def get_Object(self):
        return self.request.user

class UserRegistrationView(CreateAPIView):
    serializer_class = RegisterUserSerializer

class UserLoginView(APIView):
    def post(self, request):
        serializer = LoginUserSerializer(data=request.data)

        #generating tokens for user
        if serializer.is_valid():
            user = serializer.validated_data
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            response = Response({
                "user": CustomUserSerializer(user).data
            },
                status=status.HTTP_200_OK
            )

            response.set_cookie(
                key='access_token', 
                value=access_token, 
                httponly=True,
                secure=True,
                samesite="None")
            
            response.set_cookie(
                key='refresh_token',
                value=str(refresh),
                httponly=True,
                secure=True,
                samesite="None"
            )

            return response
        
        return Response(
            serializer.errors, status=status.HTTP_400_BAD_REQUEST
        )

class UserLogoutView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")
        if refresh_token:
            try:
                refresh = RefreshToken(refresh_token)
                refresh.blacklist()
            except Exception as e:
                return Response({
                    "error": "error invalidating token: " + str(e) 
                }, status=status.HTTP_400_BAD_REQUEST)
        
        response = Response({
            "message": "successfully logged out"
        }, status=status.HTTP_200_OK)
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
        return response
    
class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response({
                "error": "Refresh toke not provided"
            }, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)

            response = Response({
                "message": "Token refreshed successfully",
            }, status=status.HTTP_200_OK)

            response.set_cookie(
                key='access_token', 
                value=access_token, 
                httponly=True,
                secure=True,
                samesite="None")
            
            return response
        except InvalidToken:
            return Response({
                "error": "Invalid Token"
            }, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def product_list(request):
    products = Product.objects.filter(featured=True)
    serializer = ProductListSerializer(products, many=True)
    return JsonResponse({
        'data': serializer.data
    })

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

@api_view(['GET'])
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

@api_view(['GET'])
def product_search(request):
    query = request.query_params.get("query")
    if not query:
        return Response(status = 204)
    
    products = Product.objects.filter(
        Q(name__icontains=query) | 
        Q(description__icontains=query) |
        Q(category__name__icontains=query)
    )

    if not products:
        return Response({"message": "No products found!"}, status=204)

    serializer = ProductListSerializer(products, many=True)
    return Response({"data": serializer.data, "message": "Products found!"}, status=200)

@api_view(['POST'])
def create_checkout_session(request):
    cart_code = request.data.get('cart_code')
    email = request.data.get('email')
    cart = Cart.objects.get(cart_code=cart_code)
    try:
        checkout_session = stripe.checkout.Session.create(
            customer_email=email,
            payment_method_types=['card'],
            line_items=[
                {
                    'price_data': {
                        'currency': 'usd',
                        'product_data': {
                            'name': item.product.name,
                        },
                        'unit_amount': int(item.product.price) * 100,
                    },
                    'quantity': item.quantity,
                }

                for item in cart.cartitems.all()
            ],
            mode='payment',
            success_url='https://nextshoppit.vercel.app/success',
            cancel_url='https://nextshoppit.vercel.app/cancel',
            metadata={"cart_code": cart_code}
        )

        return Response({'data': checkout_session})
    except Exception as e:
        return Response({'error': str(e)}, status=400)


@csrf_exempt
def my_webhook_view(request):
  payload = request.body
  sig_header = request.META['HTTP_STRIPE_SIGNATURE']
  event = None

  try:
    event = stripe.Webhook.construct_event(
      payload, sig_header, endpoint_secret
    )
  except ValueError as e:
    # Invalid payload
    return HttpResponse(status=400)
  except stripe.error.SignatureVerificationError as e:
    # Invalid signature
    return HttpResponse(status=400)

  if (
    event['type'] == 'checkout.session.completed'
    or event['type'] == 'checkout.session.async_payment_succeeded'
  ):
    session = event['data']['object']
    cart_code = session.get("metadata", {}).get("cart_code")

    fulfill_checkout(session, cart_code)

  return HttpResponse(status=200)

def fulfill_checkout(session, cart_code):
    order = Order.objects.create(
        stripe_checkout_id=session['id'],
        amount=session['amount_total'] / 100,
        currency=session['currency'],
        customer_email=session['customer_email'],
        status="Paid",
    )

    cart = Cart.objects.get(cart_code=cart_code)
    cartitems = cart.cartitems.all()

    for item in cartitems:
        OrderItem.objects.create(
            order=order,
            product=item.product,
            quantity=item.quantity
        )

    cart.delete()