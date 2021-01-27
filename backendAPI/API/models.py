from django.db import models

NAME_LENGTH = 40
REMARK_LENGTH = 200
ORDER_NUMBER_LENGTH = 30
BATCH_NUMBER_LENGTH = 30
MACHINE_ID_LENGTH = 10


class Institute(models.Model):
    institute = models.CharField(primary_key=True, max_length=NAME_LENGTH)


class Department(models.Model):
    department = models.CharField(primary_key=True, max_length=NAME_LENGTH)
    institute = models.ForeignKey(Institute, on_delete=models.CASCADE)


class Order(models.Model):
    order_NR = models.IntegerField(primary_key=True)
    institute = models.ForeignKey(Institute, on_delete=models.CASCADE)
    order_released = models.BooleanField()


class Batch(models.Model):
    # Batchverpakkingsprotocol
    batch_NR = models.CharField(primary_key=True, max_length=BATCH_NUMBER_LENGTH)
    machine_ID = models.CharField(max_length=MACHINE_ID_LENGTH)
    packaging_code = models.IntegerField()
    # bestand doorsturen, de naam van ingelogde medewerker wordt hier gelogd.
    DB = models.CharField(max_length=NAME_LENGTH)
    leave_datetime = models.DateTimeField()
    forward_datetime = models.DateTimeField()
    remarks_end_control = models.CharField(max_length=REMARK_LENGTH, blank=True, null=True)

    # Inspector Batch Report
    checked_by = models.CharField(max_length=NAME_LENGTH)
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    inspector = models.CharField(max_length=NAME_LENGTH)
    batch_started = models.DateTimeField()
    total_NR_bags = models.IntegerField()
    bags_checked = models.IntegerField()
    total_NR_patients = models.IntegerField()
    bags_rejected = models.IntegerField()
    NR_to_double_check = models.IntegerField()
    double_checked = models.IntegerField()


class BatchRow(models.Model):
    # MC = MD = Multidose => alle tabletten in alle aantallen bij elkaar in zakje
    # CD = Combidose => 1 soort tabletten per zakje. kunnen wel meerdere tabletten zijn.
    MC_CD_CHOICES = [
        ("MC", "MC"),
        ("CD", "CD")
    ]
    batch_NR = models.ForeignKey(Batch, on_delete=models.CASCADE)
    department = models.OneToOneField(Department, on_delete=models.CASCADE)
    # Als er meer dan 2k zakjes zijn wordt de opdracht automatisch gesplitst
    split_NR = models.IntegerField()
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    NR_patients = models.IntegerField()
    NR_bags = models.IntegerField()
    MC_CD = models.CharField(
        max_length=2,
        choices=MC_CD_CHOICES
    )
    remarks = models.CharField(max_length=REMARK_LENGTH, blank=True, null=True)


class OrderBatch(models.Model):
    order_NR = models.ForeignKey(Order, on_delete=models.RESTRICT)
    batch_NR = models.ForeignKey(Batch, on_delete=models.RESTRICT)


class Roll(models.Model):
    roll_NR = models.IntegerField(primary_key=True)
    batch_NR = models.ForeignKey(Batch, on_delete=models.CASCADE)
    patient = models.CharField(max_length=NAME_LENGTH)


class Bag(models.Model):
    PRE_BAG = "PREBAG"
    MED_BAG = "MEDICATIONBAG"
    AFTER_BAG = "AFTERBAG"
    BAG_CHOICES = [
        (PRE_BAG, "Voorloopzakje"),
        (MED_BAG, "Medicatiezakje"),
        (AFTER_BAG, "Naloopzakje")
    ]

    bag_NR = models.CharField(primary_key=True, max_length=BATCH_NUMBER_LENGTH)
    roll_NR = models.ForeignKey(Roll, on_delete=models.CASCADE)
    bag_type = models.CharField(
        max_length=15,
        choices=BAG_CHOICES
    )


class MissingPictures(models.Model):
    bag_NR = models.ForeignKey(Bag, on_delete=models.CASCADE)
    patient = models.CharField(max_length=NAME_LENGTH)
    corrected_by = models.CharField(max_length=NAME_LENGTH)
    checked_by = models.CharField(max_length=NAME_LENGTH)


class PillsToBeAdded(models.Model):
    pil_ID = models.IntegerField()
    bag_NR = models.ForeignKey(Bag, on_delete=models.CASCADE)
    medication_name = models.CharField(max_length=NAME_LENGTH)
    free_text = models.CharField(max_length=REMARK_LENGTH, blank=True, null=True)


class Error(models.Model):
    TOO_MUCH = "TOO_MUCH"
    TOO_LITTLE = "TOO_LITTLE"
    TOO_EARLY = "TOO_EARLY"
    TOO_LATE = "TOO_LATE"
    ERROR_CHOICES = [
        (TOO_MUCH, "Te veel"),
        (TOO_LITTLE, "Te weinig"),
        (TOO_EARLY, "Te vroeg"),
        (TOO_LATE, "Te laat")
    ]

    bag_NR = models.ForeignKey(Bag, on_delete=models.CASCADE)
    error_NR = models.IntegerField()
    error = models.CharField(
        max_length=10,
        choices=ERROR_CHOICES
    )
    patient = models.CharField(max_length=NAME_LENGTH)
    error_desc = models.CharField(max_length=REMARK_LENGTH, blank=True, null=True)
    free_text = models.CharField(max_length=REMARK_LENGTH, blank=True, null=True)
    error_datetime = models.DateTimeField()
    corrected_by = models.CharField(max_length=NAME_LENGTH)
    checked_by = models.CharField(max_length=NAME_LENGTH)


class Check(models.Model):
    order_NR = models.ForeignKey(Order, on_delete=models.CASCADE, blank=True, null=True)
    batch_NR = models.ForeignKey(Batch, on_delete=models.CASCADE, blank=True, null=True)
    roll_NR = models.ForeignKey(Roll, on_delete=models.CASCADE, blank=True, null=True)
    bag_NR = models.ForeignKey(Bag, on_delete=models.CASCADE, blank=True, null=True)
    check_type = models.CharField(max_length=NAME_LENGTH)
    checked_by = models.CharField(max_length=NAME_LENGTH)
    check_remarks = models.CharField(max_length=REMARK_LENGTH, blank=True, null=True)
