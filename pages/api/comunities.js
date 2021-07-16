import { SiteClient } from 'datocms-client';
export default async function(request, response) {
    if(request.method === 'POST') {
        const TOKEN = '8f6bbfbd556c4d7a8283cfa9175b51';
        const client = new SiteClient(TOKEN);
        const registroCriado = await client.items.create({
            itemType: '972027',
            ...request.body
            // title: 'Comunidade de Teste',
            // creatorSlug: 'cesarlucasjunior',
            // imageUrl: 'https://github.com/cesarlucasjunior.png'
        })

        response.json({
            registroCriado: registroCriado
        })
        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}