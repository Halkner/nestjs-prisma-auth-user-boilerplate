// Função pra criar filtros OR na query de consulta no banco
export function buildOrWhereFilter(filters: Record<string, any>) {
  const whereConditions = Object.entries(filters)
    .filter(([_, value]) => value !== undefined && value !== null) // Remove valores vazios
    .map(([key, value]) => {
      // Se for string, usa busca parcial (LIKE)
      if (typeof value === 'string') {
        return { [key]: { contains: value } };
      }
      // Caso contrário, usa a busca exata
      return { [key]: value };
    });

  return whereConditions.length > 0 ? { OR: whereConditions } : {};
}
