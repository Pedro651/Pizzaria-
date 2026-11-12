import prismaClient from "../../prisma";

interface ListerOrdersServiceProps{
    draft?:string
}

class ListerOrdersService{
    async execute({draft}:ListerOrdersServiceProps){

        const orders = await prismaClient.order.findMany({
            where:{
                // Se eu receber o draft como true ele vai pegar todas q estiverem como true
                draft:draft === "true" ? true : false
            }, select: {
        id: true,
        table: true,
        name: true,
        draft: true,
        status: true,
        createdAt: true,
        items: {
          select: {
            id: true,
            amount: true,
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                description: true,
                banner: true,
              },
            },
          },
        },
      },
        })
        return orders


    }
}

export {ListerOrdersService }