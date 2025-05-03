from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from . import views

urlpatterns = [
    path('product_list/', views.product_list, name='product_list'),
    path('featured_products/', views.featured_product_list, name='featured_products'),
    path('home_products/', views.home_product_list, name='home_products'),
    path('product/<slug:slug>', views.product_detail, name='product_detail'),
    path('category_list/', views.category_list, name='category_list'),
    path('category/<slug:slug>', views.category_detail, name='category_detail'),
    path('add_to_cart/', views.add_to_cart, name='add_to_cart'),
    path('update_cartitem_quantity/', views.update_cartitem_quantity, name='update_cartitem_quantity'),
    path('remove_from_cart/<int:pk>/', views.delete_cartitem, name='remove_from_cart'),
    path('add_review/', views.add_review, name='add_review'),
    path('delete_review/<int:pk>/', views.delete_review, name='delete_review'),
    path('update_review/<int:pk>/', views.update_review, name='update_review'),
    path('wishlist/', views.add_to_wishlist, name='add_to_wishlist'),

    #should have a ?query={search term} after the url
    path('search/', views.product_search, name='product_search'),

    #stripe payments
    path('create_checkout_session/', views.create_checkout_session, name='create_checkout_session'),
    path('webhook/', views.my_webhook_view, name='webhook'),

    #user
    path('user_info/', views.UserInfoView.as_view(), name='user_info'),
    path('register/', views.UserRegistrationView.as_view(), name='user_register'),
    path('login/', views.UserLoginView.as_view(), name='user_login'),
    path('logout/', views.UserLogoutView.as_view(), name='user_logout'),
    path('refresh/', views.CookieTokenRefreshView.as_view(), name='token_refresh')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)