import { stripe } from "../index.js";

export const checkoutPayment = async (req, res) => {
    try {

        const { product } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: product.name,
                            images: [product.image],
                        },
                        unit_amount: product.price * 100
                    },
                    quantity: 1,
                }
            ],
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
        })

        return res.status(200).json({
            success: true,
            url: session.url
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: {
                message: "Internal server error.",
                code: "INTERNAL_SERVER_ERROR"
            }
        })
    }
}