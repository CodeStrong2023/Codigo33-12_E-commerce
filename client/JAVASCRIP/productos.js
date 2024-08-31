const productos=[
    {
        id:111,
        productName:'Adidas Gazelle',
        price:480000,
        quanty:1,
        imagen:'/client/Imagenes/adidasGazelle/Gazellenegra.png'
    },
    {
        id:112,
        productName:'Adidas Gazelle',
        price:480000,
        quanty:1,
        imagen:'/client/Imagenes/adidasGazelle/GazelleRoja.png'
    },
    {
        id:113,
        productName:'Adidas Gazelle',
        price:480000,
        quanty:1,
        imagen:'/client/Imagenes/adidasGazelle/GazelleVerde.png'
    },
    {
        id:121,
        productName:'Adidas La trainer',
        price:480000,
        quanty:1,
        imagen:'/client/Imagenes/AdidasLaTrainer/LatrainerNegroNa.png'
    },
    {
        id:125,
        productName:'Adidas La trainer',
        price:480000,
        quanty:1,
        imagen:'/client/Imagenes/AdidasLaTrainer/LatrainerAzul.png'
    },
    {
        id:124,
        productName:'Adidas La trainer',
        price:480000,
        quanty:1,
        imagen:'/client/Imagenes/AdidasLaTrainer/LatrainerGrisos.png'
    },

]

// Adidas lleva el id = 1 que corresponde al primer numero del id, despues el modelo segun la carga se le pone otro id,
// ese id corresponde al segundo numero y el color es el tercer numero del id por eso lleva 3 numeros :)
// cada color debe llevar un numero ya asignado, es decir 1 = negro y asi con cada color 
// Resumen Formacion del id :: Marca=1er numero; MOdelo:2do numero; Color=3er numero 
// Si el id lleva mas de 3 numeros quiere decir que lleva mas de un color de referencia
// Colores /1=negro/2=Rojo/3=Verde/4=Gris/5=Azul/6=blanco/7=Beige/8=Amarillo
// Marcas /Adidas=1/Nike=2/=3/=4/=5/=6/=7/