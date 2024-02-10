import { Router, json } from "express";
import { prisma } from "../db.js";

import  Jwt  from "jsonwebtoken";

const router = Router();

router.post('/signup', async (req,res) =>{
    const newUser = await prisma.user.create({
        data: req.body
    })

    const token = Jwt.sign({_id: newUser.id}, "secretKey");

    res.status(200).json({token});
})

router.post('/signin', async(req,res)=>{
    const {name,password} = req.body;
    const user = await prisma.user.findFirst({
        where:{
            name: name
        }
    })

    if(!user) return res.status(401).send("The name doesn't exists");
    if(user.password !== password) return res.status(401).send('Wrong Password');

    const token = Jwt.sign({_id : user.id}, 'secretKey');

    return res.status(200).json({token});
})

router.post('/addOrder', async(req,res)=>{
    let GPU ='';
    let HDD ='';
    let RAM ='';
    for (let n of req.body.order.GPU){
        GPU += n.name+",";
    }
    for (let n of req.body.order.HDD){
        HDD += n.name+",";
    }
    for (let n of req.body.order.RAM){
        RAM += n.name+",";
    }

    const order = req.body.order;
    const client = req.body.client;

    order.GPU = GPU.trim();
    order.HDD = HDD.trim();
    order.RAM = RAM.trim();

    const existsClient = await prisma.client.findFirst({
        where: {
            ci: client.ci.trim()
        }
    })
    console.log(existsClient);
    if(!existsClient){
        const newClient = await prisma.client.create({
            data: client
        })
        order.clientId = newClient.id;
    
        const newOrder = await prisma.order.create({
            data:order,
        })
    }
    else{
        order.clientId = existsClient.id;

        console.log({order});
    
        const newMachine = await prisma.order.create({
            data:order
        })
    }
})
router.post('/finishedorder', async(req,res)=>{
    const orderFinished = await prisma.order.delete({
        where:{
            id : parseInt(req.body.order.id)
        }
    })
    if(!!orderFinished){
        orderFinished.completed = req.body.completed;
        orderFinished.id = undefined;
    
        const newFinishedOrder = await prisma.orderFinished.create({
            data: orderFinished
        })
        console.log('funciona');
    
        return res.send(newFinishedOrder);
    }
    return res.status(404).json({error:"Order not Found"});
})

router.get('/finishedorders/', async(req,res)=>{
    const ordersFound = await prisma.orderFinished.findMany({
        include:{
            client: true
        }
    });
    if(!ordersFound) return res.status(404).json({error:"Product not found"});
    return res.send(ordersFound);
})
router.get('/finishedorders/:id', async(req,res)=>{
    const ordersFound = await prisma.orderFinished.findFirst({
        where:{
            id : parseInt(req.params.id)
        },
        include: {
            client: true
        }
    });
    if(!ordersFound) return res.status(404).json({error:"Product not found"});
    return res.send(ordersFound);
})
router.delete('/finishedorders/:id', async(req,res)=>{
    const ordersFound = await prisma.orderFinished.delete({
        where:{
            id : parseInt(req.params.id)
        }
    });
    if(!ordersFound) return res.status(404).json({error:"Product not found"});
    return res.send(ordersFound);
})



router.get('/orders/', async(req,res)=>{
    const ordersFound = await prisma.order.findMany({
        include:{
            client:true 
        }
    });
    if(!ordersFound) return res.status(404).json({error:"Product not found"});
    return res.send(ordersFound);
})
router.get('/orders/:id', async(req,res)=>{
    const ordersFound = await prisma.order.findFirst({
        where:{
            id : parseInt(req.params.id)
        },
        include: {
            client: true
        }
    });
    if(!ordersFound) return res.status(404).json({error:"Product not found"});
    return res.send(ordersFound);
})
router.delete('/orders/:id', async(req,res)=>{
    const ordersFound = await prisma.order.delete({
        where:{
            id : parseInt(req.params.id)
        }
    });
    if(!ordersFound) return res.status(404).json({error:"Product not found"});
    return res.send(ordersFound);
})


router.get('/clients/', async(req,res)=>{
    const clientsFound = await prisma.client.findMany({
        include:{
            order:true,
            orderFinished:true
        }
    });
    if(!clientsFound) return res.status(404).json({error:"Product not found"});
    return res.send(clientsFound);
})
router.get('/client/:id', async(req,res)=>{
    const clientFound = await prisma.client.findFirst({
        where:{
            id : parseInt(req.params.id)
        },
        include:{
            order:true,
            orderFinished:true
        }
    });
    if(!clientFound) return res.status(404).json({error:"Product not found"});
    return res.send(clientFound);
})
router.delete('/client/:id', async(req,res)=>{
    const clientFound = await prisma.client.findFirst({
        where:{
            id : parseInt(req.params.id)
        }
    });
    await prisma.order.deleteMany({
        where:{
            client:clientFound
        }
    })
    await prisma.orderFinished.deleteMany({
        where:{
            client:clientFound
        }
    })
    await prisma.client.delete({
        where:{
            id : parseInt(req.params.id)
        }
    });
    if(!clientFound) return res.status(404).json({error:"Product not found"});
    return res.send(clientFound);
})




router.get('/tasks', (req,res)=>{
    res.json([
        {
        _id :1,
        name: "task 1",
        description: "sadly",
        date: "23-07-2023"
        },
        {
        _id :2,
        name: "task 2",
        description: "sadly",
        date: "23-07-2023"
        },
        {
        _id :3,
        name: "task 3",
        description: "sadly",
        date: "23-07-2023"
        }]
    )
});
router.get('/private-tasks',verifyToken, (req,res)=>{
    res.json([
        {
        _id :1,
        name: "task 1",
        description: "sadly",
        date: "23-07-2023"
        },
        {
        _id :2,
        name: "task 2",
        description: "sadly",
        date: "23-07-2023"
        },
        {
        _id :3,
        name: "task 3",
        description: "sadly",
        date: "23-07-2023"
        }]
    )
})
router.get('/profile', verifyToken, (req,res)=>{
    return res.status(200).json(req.userId);
});

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send("Unauthorize Request");
    }

    const token = req.headers.authorization.split(' ')[1];
    if(token === 'null'){
        return res.status(401).send("Unauthorize Request");
    }

    const payload = Jwt.verify(token, 'secretKey');
    req.userId = payload._id;

    next();
}


router.get('/products', async (req,res) =>{
    const products = await prisma.product.findMany();
    res.json(products);
})

router.post('/products',async(req,res)=>{
    const newProduct = await prisma.product.create({
        data: req.body
    })
    res.json(newProduct);
})

router.get('/products/:id', async(req,res)=>{
    const productFound = await prisma.product.findFirst({
        where:{
            id : parseInt(req.params.id)
        }
    })
    if(!productFound) return res.status(404).json({error:"Product not found"});
    return res.json(productFound);
})

router.delete('/products/:id', async(req,res)=>{
    const productDeleted = await prisma.product.delete({
        where:{
            id : parseInt(req.params.id)
        }
    })
    if(!productDeleted) return res.status(404).json({error:"Product not found"});
    return res.json(productDeleted);
})

router.put('/products/:id',async (req,res)=>{
    const productupdate = await prisma.product.update({
        where:{
            id:parseInt(req.params.id)
        },
        data:req.body

    })
    return res.json(productupdate);
})

export default router;
