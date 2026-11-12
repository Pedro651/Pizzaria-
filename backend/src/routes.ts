//Aqui você define o nome da rota de cada aplicção

import { Router } from "express"
import { CreateUSerController } from "./controles/user/CreateUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { createUserSchema , authUserSchema} from "./schemas/userSchema";
import  {AuthUserController} from "./controles/user/AuthUserController"
import { DetailUSerController } from "./controles/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controles/category/CreateCategoryController";
import { isAdmin } from "./middlewares/isAdmin";
import { createCategorySchema } from "./schemas/categorySchema";
import { ListCategoryController } from "./controles/category/ListCategoryController";
import multer from "multer";
import uploadConfig from "./config/multer"
import { CreateProductController } from "./controles/product/CreateProductController";
import { createProductSchema, listProductByCategorySchema, ListProductSchema } from "./schemas/productSchema";
import { ListProductController } from "./controles/product/ListProductController";
import { DeleteProductController } from "./controles/product/DeleteProductDeleteController";
import { ListProductByController } from "./controles/product/ListProductByCategoryController";
import { ListOrdersController } from "./controles/order/ListOrdersCOntroller";
import { addItemSchema, createOrderSchema, deleteOrderSchema, detailOrderSchema, finishOrderSchema, removeItemOrderSchema, sendOrderSchema } from "./schemas/orderSchema";
import { CreateOrderController } from "./controles/order/CreateOrderController";
import { AddItemController } from "./controles/order/AddItemController";
import { RemoverItemController } from "./controles/order/RemoverItemController";
import { DetailOrderController } from "./controles/order/DetailOrderController";
import { SendOrderController } from "./controles/order/SenOrderController";
import { FinishOrderController } from "./controles/order/FinishOrderController";
import { DeleteOrderController } from "./controles/order/DeleteOrderController";

const router = Router();
const upload = multer(uploadConfig);

router.post("/users",validateSchema(createUserSchema), new CreateUSerController().handle)

//Você usa validateSchema: Quando o usuário envia dados no req.body (POST/PUT), para validar antes de chegar no controller.
router.post("/session",validateSchema(authUserSchema), new AuthUserController().handle)

//Primeiro ele passa pelo middleware(isAuthenticated) pra dps ir pra nossa rota
router.get("/me" ,isAuthenticated, new DetailUSerController().handle)

// ROUTER CATEGORY:

//Se ele não tiver logado, não vai conseguir criar categoria(isAuthenticated)
//OBS: Quando for colocar o middleware ,tem q estar dps do isAuthenticated, pq ele valida se o usuário está logado ou n
//Com o isAdmin -> So quem ta com Admin pode criar categoria se n tiver ele n vai pro controller
//new CreateCategoryController().handle -> Ela cria o controller e chama a função que executa a lógica.
router.post("/category",isAuthenticated,isAdmin,validateSchema(createCategorySchema), new CreateCategoryController().handle)

router.get("/category" ,isAuthenticated,new ListCategoryController().handle)

// ROUTER PRODUCT:

router.post(
  "/product",
  isAuthenticated,
  isAdmin,
  upload.single("file"),
  validateSchema(createProductSchema),
  new CreateProductController().handle
);

router.get("/product",isAuthenticated,validateSchema(ListProductSchema),new ListProductController().handle)


router.delete("/product",isAuthenticated,isAdmin, new DeleteProductController().handle)

router.get("/category/product",isAuthenticated,validateSchema(listProductByCategorySchema), new ListProductByController().handle)



//ROUTER ORDERS:

router.post("/order",isAuthenticated, validateSchema(createOrderSchema), new CreateOrderController().handle )

router.get("/orders", isAuthenticated, new ListOrdersController().handle)


//Add itens a order

router.post("/order/add" ,isAuthenticated,validateSchema(addItemSchema),new AddItemController().handle)


router.get("/order/detail",isAuthenticated,validateSchema(detailOrderSchema), new DetailOrderController().handle )

router.delete("/order/remove",isAuthenticated,validateSchema(removeItemOrderSchema), new RemoverItemController().handle )

router.put("/order/send", isAuthenticated,validateSchema(sendOrderSchema), new SendOrderController().handle)

router.put("/order/finish",isAuthenticated,validateSchema(finishOrderSchema),new FinishOrderController().handle)

router.delete("/order", isAuthenticated,validateSchema(deleteOrderSchema) ,new DeleteOrderController().handle)

export {router};