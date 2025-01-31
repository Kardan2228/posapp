export const checkExpirationStatus = (expirationDate?: string): string => {
    if (!expirationDate) return "Disponible ✅"; // Si no tiene fecha, es un producto no perecedero
  
    const today = new Date();
    const expiry = new Date(expirationDate);
    const diff = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
    if (diff < 0) return "Caducado ❌";
    if (diff <= 7) return "Próximo a vencer ⚠️";
    return "Disponible ✅";
  };
  