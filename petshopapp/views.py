from django.shortcuts import render, get_object_or_404, redirect
from .models import Producto, Carrito, ItemCarrito


# Create your views here.

def contacto(request):
    context={}
    return render(request,'petshopapp/contacto.html', context)

def index(request):
    productos = Producto.objects.all()
    context = {'productos': productos}
    return render(request, 'petshopapp/index.html', context)

def suscribirse(request):
    context={}
    return render(request,'petshopapp/suscribirse.html', context)

#---

def productos(request):
    productos = Producto.objects.all()
    return render(request, 'petshopapp/productos.html', {'productos': productos})

def carrito(request):
    carrito, created = Carrito.objects.get_or_create(id=request.session.get('carrito_id'))
    items = ItemCarrito.objects.filter(carrito=carrito)
    total = sum(item.precio_unitario * item.cantidad for item in items)
    return render(request, 'petshopapp/carrito.html', {'items': items, 'total': total})

def agregar_al_carrito(request, producto_id):
    producto = get_object_or_404(Producto, id=producto_id)
    carrito, created = Carrito.objects.get_or_create(id=request.session.get('carrito_id'))
    item, created = ItemCarrito.objects.get_or_create(carrito=carrito, producto=producto, precio_unitario=producto.precio)
    if not created:
        item.cantidad += 1
    item.save()
    request.session['carrito_id'] = carrito.id
    return redirect('carrito')

def eliminar_del_carrito(request, item_id):
    item = get_object_or_404(ItemCarrito, id=item_id)
    item.delete()
    return redirect('carrito')

def aumentar_cantidad(request, item_id):
    item = get_object_or_404(ItemCarrito, id=item_id)
    item.cantidad += 1
    item.save()
    return redirect('carrito')

def disminuir_cantidad(request, item_id):
    item = get_object_or_404(ItemCarrito, id=item_id)
    if item.cantidad > 1:
        item.cantidad -= 1
        item.save()
    return redirect('carrito')