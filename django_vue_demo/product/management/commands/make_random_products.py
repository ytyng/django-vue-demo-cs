from django.core.management.base import BaseCommand

from ...models import ProductItem
from ...factories import ProductItemFactory


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument(
            '--limit',
            type=int,
            default=1000,
            dest='limit',
            action='store'
        )

    def handle(self, limit, *args, **kwargs):
        creation_count = limit - ProductItem.objects.all().count()

        ProductItemFactory.create_batch(creation_count)
