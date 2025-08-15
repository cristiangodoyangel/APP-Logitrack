from django.db import models

class TimeStampedModel(models.Model):
    """Campos comunes de auditoría."""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Cliente(TimeStampedModel):
    nombre = models.CharField(max_length=120)
    telefono = models.CharField(max_length=30, blank=True)
    email = models.EmailField(blank=True)
    direccion = models.CharField(max_length=200, blank=True)
    ciudad = models.CharField(max_length=80, blank=True)

    class Meta:
        db_table = "clientes"
        ordering = ["nombre"]

    def __str__(self):
        return self.nombre


class Chofer(TimeStampedModel):
    nombre = models.CharField(max_length=120)
    telefono = models.CharField(max_length=30, blank=True)
    activo = models.BooleanField(default=True)
    # vehículo actual asignado
    vehiculo = models.CharField(max_length=80, blank=True)  # ej: "Moto Honda 150cc"
    patente = models.CharField(max_length=15, blank=True)
    # última ubicación conocida
    ubic_lat = models.FloatField(null=True, blank=True)
    ubic_lon = models.FloatField(null=True, blank=True)

    class Meta:
        db_table = "choferes"
        ordering = ["nombre"]

    def __str__(self):
        return self.nombre

class Vehiculo(TimeStampedModel):
    tipo = models.CharField(max_length=50)  # ej: "Moto", "Camioneta"
    marca = models.CharField(max_length=50)
    modelo = models.CharField(max_length=50, blank=True)
    patente = models.CharField(max_length=15, unique=True)
    chofer_asignado = models.OneToOneField(
        'Chofer',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="vehiculo_asignado"
    )
    activo = models.BooleanField(default=True)  # 🔹 Nuevo campo

    class Meta:
        db_table = "vehiculos"
        ordering = ["marca", "modelo"]

    def __str__(self):
        return f"{self.tipo} {self.marca} {self.modelo} ({self.patente})"



class Pedido(TimeStampedModel):
    ESTADOS = (
        ("PEN", "Pendiente"),
        ("ENV", "En ruta"),
        ("ENT", "Entregado"),
        ("CAN", "Cancelado"),
    )

    idoped = models.AutoField(primary_key=True)
    cliente = models.ForeignKey(Cliente, on_delete=models.PROTECT, related_name="pedidos")
    chofer = models.ForeignKey(Chofer, on_delete=models.SET_NULL, null=True, blank=True, related_name="pedidos")
    vehiculo = models.ForeignKey(Vehiculo, on_delete=models.SET_NULL, null=True, blank=True, related_name="pedidos")

    categoria = models.CharField(max_length=50, blank=True)   # Ej: Documentos, Paquetería, Comida
    urgente = models.BooleanField(default=False)

    fecped = models.DateField()
    hora = models.TimeField(null=True, blank=True)
    notped = models.TextField(blank=True, null=True)

    estped = models.CharField(max_length=10, choices=ESTADOS, default="PEN")
    totped = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    latitud = models.FloatField(blank=True, null=True)
    longitud = models.FloatField(blank=True, null=True)

    asignado_at = models.DateTimeField(null=True, blank=True)
    entregado_at = models.DateTimeField(null=True, blank=True)

    nota_entrega = models.TextField(blank=True, null=True)

    class Meta:
        db_table = "pedidos"
        ordering = ["-fecped", "-hora"]

    def __str__(self):
        return f"Pedido #{self.idoped} - {self.cliente}"
