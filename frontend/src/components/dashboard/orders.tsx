"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { EyeIcon, RefreshCcw } from "lucide-react";
import { Order } from "@/lib/types";
import { apiClient } from "@/lib/api";
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format";
import { OrderModal } from "@/components/dashboard/order.modal";

interface OrdersProps {
  token: string;
}

export function Orders({ token }: OrdersProps) {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectOrder, setSelectOrder] = useState<null | string>(null)

  const fetchOrders = async () => {
    try {
      const response = await apiClient<Order[]>("/orders?draft=false", {
        method: "GET",
        cache: "no-store",
        token: token,
      });

      //!order.status= Se o order estiver como false ele coloca no pendingOrders
      const pendingOrders = response.filter(order => !order.status)

      setOrders(pendingOrders);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    async function loadOrders() {
      await fetchOrders();
    }

    loadOrders();
  }, []);

  const calculateOrderTotal = (order:Order) =>{
    if(!order.items) return 0;

    //reduce:Vai pecorrer toda nossa lista 
    return order.items.reduce((total, item)=>{
    // total = valor acumulado da soma
    // item = item atual do array
      return total + item.product.price * item.amount
    // pega o total atual
    // soma com (preço do produto × quantidade)

    },0)
    //No reduce, o que vem depois da vírgula é o valor inicial do acumulador.
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Pedidos</h1>
          <p className="text-sm sm:text-base mt-1">
            Gerencie os pedidos da cozinha
          </p>
        </div>

        <Button className="bg-green-700 text-white hover:bg-green-900"
        onClick={fetchOrders}
        >
          
          <RefreshCcw className="w-5 h-5" />
        </Button>
      </div>

      {loading ? (
        <div>
          <p>Carregando pedidos</p>
        </div>
      ) : orders.length === 0 ? (
        <div>
          <p>Nenhum pedido encontrado.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <Card
              key={order.id}
              className="bg-white border-app-border text-black"
            >
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-lg lg:text-xl font-bold">
                    Mesa {order.table}
                  </CardTitle>
                  <Badge variant="secondary" className="text-white select-none bg-gray-500">
                    produção
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 sm:space-y-4 mt-auto">
                <div>
                  {order.items && order.items.length > 0 && (
                    <div className="space-y-1">
                      {order.items.slice(0, 2).map((item) => (
                        <p
                          key={item.id}
                          className="text-xs sm:text-sm text-gray-500 truncate"
                        >
                          • {item.amount}x {item.product.name}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-col xl:flex-row items-center justify-between pt-4 border-t border-app-border gap-3">
                  <div className="self-start">
                    <p className="text-sm md:text-base text-gray-700">Total</p>
                    <p className="text-base font-bold text-green-700">
                      {formatPrice(calculateOrderTotal(order))}
                    </p>
                  </div>

                  <Button
                    size="sm"
                    className="bg-green-700 hover:bg-green-900 w-full xl:w-auto"
                    onClick={() => setSelectOrder(order.id)}
                  >
                    <EyeIcon className="w-5 h-5" />
                    Detalhes
                  </Button>
                </div>


              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <OrderModal
      orderId={selectOrder}
      onClose={async () =>{
        setSelectOrder(null);
        await fetchOrders()
      }}
      token={token}
      />
    </div>
  );
}

