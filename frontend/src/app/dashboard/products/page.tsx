import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { Category, Product } from "@/lib/types";
import { Package } from "lucide-react";
import { ProductForm } from "@/components/dashboard/product-form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DeleteButtonProduct } from "@/components/dashboard/delete-button";

export default async function Products() {
  const token = await getToken();

  // Buscar categorias para o formulário
  const categories = await apiClient<Category[]>("/category", {
    token: token!,
  });

  // Buscar produtos
  const products = await apiClient<Product[]>("/product", {
    //token! -> Eu tenho certeza de que token não é null nem undefined
    token: token!,
  });

  // Função para formatar o preço
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price / 100);
  };
  
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            Produtos
          </h1>
          <p className="text-sm sm:text-base mt-1">Gerencie seus produtos</p>
        </div>

        <ProductForm categories={categories} />
      </div>

      {products.length !== 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {products.map((product) => (
            <Card
              key={product.id}
              className="bg-white border-app-border transition-shadow hover:shadow-md text-green-700 overflow-hidden "
            >
              <div className="relative w-full h-48 ">
                <Image
                  src={product.banner}
                  alt={product.name}
                  fill
                  className="object-cover "
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <CardHeader>
                <CardTitle className="gap-2 flex items-center text-base md:text-lg">
                  <div className="flex flex-row gap-2 items-center">
                    <Package className="w-5 h-5" />
                  <span>{product.name}</span>
                  </div>

                  <DeleteButtonProduct productId={product.id}/>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-black text-sm line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-app-border">
                  <span className="text-black font-bold text-lg">
                    {formatPrice(product.price)}
                  </span>
                  {product.category && (
                    <span className="text-xs bg-gray-300 px-2 py-1 rounded">
                      {product.category.name}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {products.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 mx-auto text-green-700 mb-4" />
          <p className="text-black text-lg">Nenhum produto cadastrado</p>
          <p className="text-gray-500 text-sm mt-2">
            Comece adicionando seu primeiro produto
          </p>
        </div>
      )}
    </div>
  );
}
