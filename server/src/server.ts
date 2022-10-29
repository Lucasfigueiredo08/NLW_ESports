import express from 'express'
import {PrismaClient} from '@prisma/client'
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString } from './utils/convert-to-minutes-to-hourString';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());


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

app.post("/games/:id/ads", async (request, response) => {
    const gameId = request.params.id;
    const body:any = request.body;

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(","),
            hourStart: convertHourStringToMinutes(body.hourStart),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel
        }
    })

    return response.status(201).json(ad);
});

//TODO Método não está trazendo os anuncions por game 
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
                weekDays: ad.weekDays.split(','),
                hourStart: convertMinutesToHourString(ad.hourStart),
                hourEnd: convertMinutesToHourString(ad.hourEnd)
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



