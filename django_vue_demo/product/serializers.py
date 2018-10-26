from rest_framework import serializers, fields

from .models import ProductItem


class ProductItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ProductItem
        fields = ('id', 'product_name', 'price', 'description')

    value = fields.JSONField(help_text="JSON")
