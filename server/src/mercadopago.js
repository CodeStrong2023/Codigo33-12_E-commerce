process.noDeprecation = true;
import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
    accessToken: "APP_USR-4972073114495345-103120-338493e48fae37002dac5c0d9b25562d-2068419215",
});

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Soy el server :)");
});

app.get("/success", (req, res) => {
    const paymentId = req.query.payment_id; // Ejemplo de cómo capturar un parámetro
    res.send(`La compra fue exitosa. ¡Gracias por tu compra! ID de Pago: ${paymentId}`);
});

app.get("/failure", (req, res) => {
    res.send("La compra falló. Por favor, intenta de nuevo.");
});

app.get("/pending", (req, res) => {
    res.send("La compra está pendiente. Te notificaremos cuando haya una actualización.");
});


app.post("/create_preference", async (req, res) => {
    console.log("Datos recibidos:", req.body); // Log de datos recibidos
    try {
        // Verifica que price sea mayor que cero
        const price = Number(req.body.price);
        console.log(price)
        if (price <= 0) {
            return res.status(400).json({ error: "El precio debe ser mayor que cero." });
        }

        const body = {
            items: [
                {
                    title: String(req.body.title),
                    quantity: Number(req.body.quantity),
                    unit_price: parseFloat(price),
                    currency_id: "ARS",
                },
            ],
            back_urls: {
                success: "http://localhost:4000/success", 
                failure: "http://localhost:4000/failure", 
                pending: "http://localhost:4000/pending", 
            },            
            auto_return: "approved",
        };

        console.log("Cuerpo de la preferencia:", JSON.stringify(body, null, 2));
        console.log(body)
        const preference = new Preference(client);
        console.log(preference)
        const result = await preference.create({body});

        res.json({
            id: result.id,
        });
    } catch (error) {
        console.log("Error al crear preferencia:", error); // Log del error
        res.status(500).json({
            error: "Error al crear preferencia",
        });
    }
});


app.listen(port, () => {
    console.log('El servidor está corriendo en el puerto ' + port);
});

