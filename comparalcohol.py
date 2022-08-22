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


def crear_cervezas(marca, modelo, presentacion, mililitros, precio):
    cer_list.append(Cerveza(marca, modelo, presentacion, mililitros, precio))


def compara(primera, segunda):
    # Obtener el precio por mililitro, primero divide el precio entre la presentación y el resultado entre los mililitros
    resultado_primera = round((cer_list[primera].precio / cer_list[primera].unidades) / cer_list[primera].mililitros, 4)
    resultado_segunda = round((cer_list[segunda].precio / cer_list[segunda].unidades) / cer_list[segunda].mililitros, 4)
    
    return f"El precio de {cer_list[primera].marca} {cer_list[primera].presentacion} es de ${resultado_primera} por mililitro. \nEl precio de {cer_list[segunda].marca} {cer_list[segunda].presentacion} es de ${resultado_segunda} por mililitro. \n "


# Aquí se va creando el catalogo de cervezas 
crear_cervezas("Miller Ligth", "Mofle", 1, 700, 28)
crear_cervezas("Miller Ligth", "12 Pack", 12, 355, 166)
crear_cervezas("Coors Ligth", "12 Pack", 12, 355, 125)
crear_cervezas("Bud Ligth", "12 Pack", 12, 355, 118)
crear_cervezas("Oscura Victoria", "Familiar", 1, 1200, 36.6)
crear_cervezas("Miller High Life", "Familiar", 12, 940, 516)

print(compara(4,5))