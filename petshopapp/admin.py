from django.contrib import admin

# Register your models here.

from .models import Producto, Carrito, ItemCarrito


admin.site.register(Producto)
admin.site.register(Carrito)
admin.site.register(ItemCarrito)