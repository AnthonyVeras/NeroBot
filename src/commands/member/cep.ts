import { PREFIX } from "../../config";
import { InvalidParameterError } from "../../errors/InvalidParameterError";
import { consultarCep, CepResponse as CorreiosCepResponse } from "correios-brasil";
import { CommandHandlerParams } from "../../types/commands";

// Nossa interface compatível com a resposta do correios-brasil
interface CepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  [key: string]: any; // Permite qualquer outra propriedade
}

export const name = "cep";
export const description = "Consulta CEP";
export const commands = ["cep"];
export const usage = `${PREFIX}cep 01001-001`;

export const handle = async ({ 
  args, 
  sendWarningReply, 
  sendSuccessReply 
}: CommandHandlerParams): Promise<void> => {
  const cep = args[0];

  if (!cep || ![8, 9].includes(cep.length)) {
    throw new InvalidParameterError(
      "Você precisa enviar um CEP no formato 00000-000 ou 00000000!"
    );
  }

  try {
    // Primeiro convertemos para unknown e depois para nossa interface
    const data = await consultarCep(cep) as unknown as CepResponse;

    if (!data.cep) {
      await sendWarningReply("CEP não encontrado!");
      return;
    }

    await sendSuccessReply(`*Resultado*
      
*CEP*: ${data.cep}
*Logradouro*: ${data.logradouro}
*Complemento*: ${data.complemento}
*Bairro*: ${data.bairro}
*Localidade*: ${data.localidade}
*UF*: ${data.uf}
*IBGE*: ${data.ibge}`);
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}; 