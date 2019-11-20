export interface DadosGov {
    id: number;
    dataReferencia: string;
    municipio: {
        codigoIBGE: string;
        nomeIBGE: string;
        pais: string;
        uf: {
            sigla: string;
            nome: string;
        }
    };
    tipo: {
        id: number;
        descricao: string;
        descricaoDetalhada: string;
    };
    valor: number;
    quantidadeBeneficiados: number;
}
