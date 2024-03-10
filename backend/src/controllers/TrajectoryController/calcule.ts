/*
    Aqui eu não tenho certeza se eu posso usar uma biblioteca
    para "resolver" o "Problema do Caixeiro Viajante", e não consegui
    entrar em contato, no linkedin só pode entrar em contato com a 
    "Lucida Dias" quem usa o Linkedin Premium.
    
    Se puder eu usaria o "https://openrouteservice.org/" que é OpenSource 
    e Gratuito ou o do Google Maps mas nesse caso é pago.

    Na dúvida vou fazer do meu jeito, que é mais simple e provavelmente
    bem menos eficiente 😁.
*/

import { UserType } from "../../models/UserModel";

const searchDistance = (coordinates1: number[], coordinates2: number[]) => {
    return Math.sqrt(Math.pow(coordinates2[0] - coordinates1[0], 2) + Math.pow(coordinates2[1] - coordinates1[1], 2));
}

export const orderUsersByCoordinates = (company: UserType, users: UserType[]) => {
    const negativeNegative:UserType[] = [];
    const negativePositive:UserType[] = [];
    const positivePositive:UserType[] = [];
    const positiveNegative:UserType[] = [];

    const trajectories = [company]

    let temp: {
        user: UserType|null,
        distance: number
    } = {
        user: null,
        distance: Infinity
    };

    // Separei em 4 partes os dados pra tentar otimizar a busca
    users.forEach(user => {
        const [x, y] = user.coordinates;
        if (x < 0 && y < 0) {
            negativeNegative.push(user);
        } else if (x < 0 && y >= 0) {
            negativePositive.push(user);
        } else if (x >= 0 && y >= 0) {
            positivePositive.push(user);
        } else {
            positiveNegative.push(user);
        }
    });

    // Calcula a distância todas as coordenadas do mesmo "setor" e adiciona a "trajetoria" a mais próxima.
    const calculeAllList = (list: UserType[]) => {
        list.forEach(_ => {
            list.forEach(user=> {
                if (trajectories.includes(user)) return;
                const newDistance = searchDistance(trajectories[trajectories.length-1].coordinates, user.coordinates);
                if (temp === null || newDistance < temp.distance) { temp = {user: user, distance: newDistance} };
            })
            if (temp?.user) {
                trajectories.push(temp.user)
                temp.user = null;
                temp.distance = Infinity;
            }
        })
    }

    calculeAllList(negativeNegative);
    calculeAllList(negativePositive);
    calculeAllList(positivePositive);
    calculeAllList(positiveNegative);

    return trajectories;
}