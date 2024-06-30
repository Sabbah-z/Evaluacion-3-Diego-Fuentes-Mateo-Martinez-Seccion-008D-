from django.urls import path
from  . import views

urlpatterns = [
    path('carrito', views.carrito, name='carrito'),
    path('contacto', views.contacto, name='contacto'),
    path('index', views.index, name='index'),
    path('productos', views.productos, name='productos'),
    path('suscribirse', views.suscribirse, name='suscribirse'),
    path('carrito/agregar/<int:producto_id>/', views.agregar_al_carrito, name='agregar_al_carrito'),
    path('carrito/eliminar/<int:item_id>/', views.eliminar_del_carrito, name='eliminar_del_carrito'),
    path('carrito/aumentar/<int:item_id>/', views.aumentar_cantidad, name='aumentar_cantidad'),
    path('carrito/disminuir/<int:item_id>/', views.disminuir_cantidad, name='disminuir_cantidad'),   
]