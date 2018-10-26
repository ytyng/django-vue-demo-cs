from rest_framework import viewsets
from . import serializers
from . import models


class CredentialViewSet(viewsets.ModelViewSet):
    # permission_classes = なし
    lookup_field = 'id'

    queryset = models.ProductItem.objects.all()
    serializer_class = serializers.ProductItemSerializer
