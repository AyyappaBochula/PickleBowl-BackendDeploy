from django.db import models
from django.utils.text import slugify


# -----------------------
# CATEGORY MODEL
# -----------------------
class Category(models.Model):

    name = models.CharField(max_length=100)

    slug = models.SlugField(
        unique=True,
        blank=True
    )

    image = models.ImageField(
        upload_to="categories/"
    )

    is_festival = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def save(self, *args, **kwargs):

        if not self.slug:
            self.slug = slugify(self.name)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


# -----------------------
# PRODUCT MODEL
# -----------------------
class Product(models.Model):

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="products"
    )

    name = models.CharField(
        max_length=200
    )

    slug = models.SlugField(
        unique=True,
        blank=True
    )

    # 🔥 DEFAULT PRICE
    # USED FOR LISTING / FALLBACK
    price_per_kg = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    rating = models.FloatField(
        default=4.0
    )

    image = models.ImageField(
        upload_to="products/"
    )

    description = models.TextField(
        blank=True,
        null=True
    )

    # 🔥 FESTIVAL PRODUCT
    is_festival_offer = models.BooleanField(
        default=False
    )

    # 🔥 POPULAR PRODUCT
    is_popular = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def save(self, *args, **kwargs):

        if not self.slug:
            self.slug = slugify(self.name)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["-updated_at"]


# -----------------------
# PRODUCT WEIGHTS MODEL
# -----------------------
class ProductWeight(models.Model):

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="weights"
    )

    # 100, 250, 500, 1000
    weight_in_grams = models.PositiveIntegerField()

    # PRICE FOR THIS WEIGHT
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    # OPTIONAL STOCK
    stock = models.PositiveIntegerField(
        default=0
    )

    # OPTIONAL ACTIVE
    is_available = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ["weight_in_grams"]

    def __str__(self):

        if self.weight_in_grams >= 1000:
            weight = f"{self.weight_in_grams / 1000} KG"
        else:
            weight = f"{self.weight_in_grams} G"

        return f"{self.product.name} - {weight}"


# -----------------------
# FESTIVAL MODEL
# -----------------------
class Festival(models.Model):

    name = models.CharField(
        max_length=100
    )

    image = models.ImageField(
        upload_to="festivals/"
    )

    start_date = models.DateField()

    end_date = models.DateField()

    def __str__(self):
        return self.name


# -----------------------
# FESTIVAL PRODUCT MAP
# -----------------------
class FestivalProduct(models.Model):

    festival = models.ForeignKey(
        Festival,
        on_delete=models.CASCADE
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )

    discount_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    def __str__(self):
        return f"{self.festival.name} - {self.product.name}"