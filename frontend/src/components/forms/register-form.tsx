"use client"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { registerAction } from "@/actions/auth";
import { useRouter } from "next/navigation";

export function RegisterForm() {
   const [state, formAction ,isPending] = useActionState(registerAction, null)/*
    state:
    → guarda o resultado da função registerAction
    → exemplo: sucesso ou erro do cadastro
    -> State:serve como estado inicial do state

    formAction:
    → função que você coloca no <form>
    → ela dispara automaticamente o registerAction quando o form é enviado

    isPending:
    → true enquanto a requisição está rodando
    → false quando termina (serve pra loading)
   */
  const router = useRouter();

    useEffect(()=>{
      // Verifica se o cadastro deu certo
      if(state?.success && state?.redirectTo){
        // Redireciona para a rota que veio da action
        router.replace(state.redirectTo)
      }
    },[state, router])


  return (
    <Card className="bg-white border  border-green-200 w-full max-w-md mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.3)] ">
      <CardHeader>
        <CardTitle className="text-white text-center text-3xl sm:text-4xl font-bold">
          <span className="text-green-500">Pizzaria</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" action={formAction}>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-green-700">
              Nome
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Digite seu nome"
              required
              minLength={3}
              className="text-black bg-white border border-gray-400  "
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-green-700">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Digite seu email..."
              required
              className="text-black bg-white border border-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-green-700">
              Senha
            </Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Digite sua senha..."
              required
              className="text-black bg-white border border-gray-400"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-green-700 text-white hover:bg-green-800"
          >
            { isPending ? "Criando conta...": "Criar conta"}
          </Button>


          <p className="text-center text-sm text-gray-500 ">
            Já tem uma conta? <Link href="/login" className="text-green-700 hover:text-green-900 font-semibold">Faça o login</Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
