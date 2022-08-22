cer_list = []


class Cerveza:
    def __init__(self, marca, modelo, presentacion, mililitros, precio):
        self.marca = marca
        self.modelo = modelo
        self.presentacion = presentacion
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
    primera = (cer_list[primera].precio /
               cer_list[primera].presentacion)/cer_list[primera].mililitros
    segunda = (cer_list[segunda].precio /
               cer_list[segunda].presentacion)/cer_list[segunda].mililitros

    if primera > segunda:
        return f"El precio de {cer_list[primera].nombre} es de {primera} por mililitro \nEl precio de {cer_list[segunda].nombre} es de{segunda} por mililitro. \n "


crear_cervezas("Miller", "Ligth", 1, 700, 28)
crear_cervezas("Miller", "Ligth", 12, 355, 166)

for c in range(len(cer_list)):
    print(cer_list[c].Atributos())
