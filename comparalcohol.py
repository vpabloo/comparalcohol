cer_list = []


class Cerveza:
    def __init__(self, marca, presentacion, unidades, mililitros, precio):
        self.marca = marca
        self.presentacion = presentacion
        self.unidades = unidades
        self.mililitros = mililitros
        self.onzas = mililitros*0.033814
        self.precio = precio
        self.preciomililitro = precio/mililitros

    def Atributos(self):
        print("· Nombre:\t\t", self.marca, self.modelo)
        print("· Presentacion:\t\t", self.presentacion)
        print("· Mililitros:\t\t", self.mililitros)
        print("· Onzas:\t\t", self.onzas)
        print("· Precio:\t\t", self.precio)
        print("· Precio p/mililitro:\t\t", self.preciomililitro)
        print("--------------------------------------------")


def crear_cervezas(marca, presentacion, unidades, mililitros, precio):
    cer_list.append(Cerveza(marca, presentacion, unidades, mililitros, precio))

# Compara dos cervezas.
def compara(primera, segunda):
    # Obtener el precio por mililitro, primero divide el precio entre la presentación y el resultado entre los mililitros.
    resultado_primera = round(
        (cer_list[primera].precio / cer_list[primera].unidades) / cer_list[primera].mililitros, 4)
    resultado_segunda = round(
        (cer_list[segunda].precio / cer_list[segunda].unidades) / cer_list[segunda].mililitros, 4)

    return f"El precio de {cer_list[primera].marca} {cer_list[primera].presentacion} es de ${resultado_primera} por mililitro. \nEl precio de {cer_list[segunda].marca} {cer_list[segunda].presentacion} es de ${resultado_segunda} por mililitro. \n "

# Compara la lista completa de cervezas.
def compara_todas():
    for c in range(len(cer_list)):
        resultado = round(
            (cer_list[c].precio / cer_list[c].unidades) / cer_list[c].mililitros, 4)
        print(
            f"El precio de {cer_list[c].marca} {cer_list[c].presentacion} es de ${resultado} por mililitro.")
    pass

# Aquí se va creando el catalogo de cervezas:
# "Marca", representa la marca y típo de cerveza
# "Presentación", representa el paquete de venta, (Mofle, familiar, 12 pack, mega familiar, botella, latón, lata)
# "Unidades", representa ¿Cuantas cervezas viene el paquete? 12, 6, 1
# "Mililitros", la cantidad de mililitros por una cerveza, no por el paquete completo expresado en mililitros (355, 700, 1200, 940)
# "Precio", el precio del paquete completo o de la unidad, en caso que sea requerido


crear_cervezas("Miller Ligth", "Mofle", 1, 700, 28)
crear_cervezas("Miller Ligth", "12 Pack", 12, 355, 166)
crear_cervezas("Coors Ligth", "12 Pack", 12, 355, 125)
crear_cervezas("Bud Ligth", "12 Pack", 12, 355, 118)
crear_cervezas("Oscura Victoria", "Mega Familiar", 1, 1200, 36.6)
crear_cervezas("Miller High Life", "Familiar", 12, 940, 516)

# Ingresa el indice de las cervezas que quieres comparar (El índice comienza en 0)
print(compara(3, 5))

# No requiere argumentos
compara_todas()
