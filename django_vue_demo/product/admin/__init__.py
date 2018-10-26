from django.contrib import admin
from .. import models


class ProductItemAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'product_name',
        'price',
        'description',
    )
    list_display_links = (
        'id',
        'product_name',
    )
    search_fields = (
        'id',
        'product_name',
    )


admin.site.register(models.ProductItem, ProductItemAdmin)
