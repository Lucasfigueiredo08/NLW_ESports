import express from 'express'
import {PrismaClient} from '@prisma/client'
import { decompressFromBase64 } from '@prisma/client/runtime';

const app = express();
/**
 * Log da query executada pelo prisma
 */
const prisma = new PrismaClient({
    log: ['query']
});

/** 
 * Query: /ads?page=2&sort=title
 * Route: /ads/5
 * Body: fica escondido na aplicação
*/

app.get("/games", async (request, response) => {
    const games = await prisma.game.findMany({
        include: { //join
            _count: { // contador
                select: { // select 
                    ads: true
                }
            }
        }
        /**
         *  SELECT `main`.`Game`.`id`, `main`.`Game`.`title`, `main`.`Game`.`bannerUrl`, `aggr_selection_0_Ad`.`_aggr_count_ads` FROM `main`.`Game` LEFT JOIN (SELECT `main`.`Ad`.`gameId`, COUNT(*) AS `_aggr_count_ads` FROM `main`.`Ad` WHERE 1=1 GROUP BY `main`.`Ad`.`gameId`) AS `aggr_selection_0_Ad` ON (`main`.`Game`.`id` = `aggr_selection_0_Ad`.`gameId`) WHERE 1=1 LIMIT ? OFFSET ?
         */
    })
    
    return response.json(games)
});

app.post("/ads", (request, response) => {
    return response.status(201).json([]);
});

""
app.get("/games/:id/ads",async (request, response) => {
    // return response.send("Acessou ads");
    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true
        },
        where: {
            gameId: gameId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    
    return response.json(
        ads.map( ad => {
            return {
                ...ad,
                weekDays: ad.weekDays.split(',')
            }
        })
        );
});


//TODO  não ta funcionando essa função - Vídeo 3, hora 1:33
app.get("/ads/:id/discord",async (request, response) => {
    const adId = request.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },
        where: {
            id: adId,
        } 
    })

    return response.json({
        discord: ad.discord,
    })
});

app.listen(3333);



