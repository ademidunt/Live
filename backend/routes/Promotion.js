import express from 'express';
import { getPromotion, getPromotions, createPromotion, updatePromotion, getPromotionByVenueId} from '../controllers/PromotionOps.js';

const app = express();

app.use(express.json());

//Get all promotions
app.get('/', async (req, res) => {
    res.send(await getPromotions());
});

//Get a promotion by promotionId
app.get('/:promotionId', async (req, res) => {
    console.log(req.params);
    res.send(await getPromotion(req.params.promotionId));
});

//Create a new promotion
app.post('/', async (req, res) => {
    const review = req.body;

    res.send(await createPromotion(review));
});

//Update a promotion
app.post('/:promotionId', async (req, res) => {
    const promotion = {
        ...req.body,
        ...{promotionId: req.params.promotionId}
    }

    res.send(await updatePromotion(promotion));
});

//Get promotions with venueId
app.get('/venue/:venueId', async (req, res) => {
    res.send(await getPromotionByVenueId(req.params.venueId));
});

export default app;