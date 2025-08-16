from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = "ADMIN", "Administrador"
        CHOFER = "CHOFER", "Chofer"
        CLIENTE = "CLIENTE", "Cliente"

    role = models.CharField(
        max_length=10,
        choices=Role.choices,
        default=Role.CLIENTE,
        help_text="Define el rol del usuario en la plataforma",
    )

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
