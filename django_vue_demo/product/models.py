from django.db import models


class ProductItem(models.Model):
    product_name = models.CharField(
        verbose_name='商品名',
        max_length=200)

    price = models.PositiveIntegerField(
        verbose_name='価格')

    description = models.TextField(
        verbose_name='解説')
