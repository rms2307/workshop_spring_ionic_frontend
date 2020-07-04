export interface ClienteDTO {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    imageUrl?: string;
    perfis?: string[];
}