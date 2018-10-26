import factory

from factory import fuzzy
from . import models


class ProductItemFactory(factory.DjangoModelFactory):
    class Meta:
        model = models.ProductItem

    product_name = factory.lazy_attribute(
        lambda x:
        ''.join(factory.Faker('words', locale='ja_JP', nb=3).generate({})))

    price = fuzzy.FuzzyInteger(200, 2000, step=100)

    description = factory.Faker('text', locale='ja_JP', max_nb_chars=200)
