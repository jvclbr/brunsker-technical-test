import { z } from "zod";

export const ViaCepSchema= z.object({
    cep: z.string(),
    logradouro: z.string(),
    complemento: z.string(),
    bairro: z.string(),
    localidade: z.string(),
    uf: z.string(),
    ibge: z.string(),
    gia: z.string(),
    ddd: z.string(),
    siafi: z.string()
});

export type ViaCepDTO = z.infer<typeof ViaCepSchema>;