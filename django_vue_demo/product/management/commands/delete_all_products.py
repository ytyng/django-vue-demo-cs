from django.core.management.base import BaseCommand

from ...models import ProductItem


class Command(BaseCommand):

    def handle(self, *args, **kwargs):
        ProductItem.objects.all().delete()
