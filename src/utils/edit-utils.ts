import { prisma } from "@/config/prisma.config";

export const edit = async (usuarioId: string): Promise<boolean> => {
  try {
    const usuario = await prisma.user.findUnique({
      where: { id: usuarioId },
    });

    if (!usuario) return false;
    if (usuario.role === "admin") return true;

    const config = await prisma.conf_edicion.findFirst({
      orderBy: { createdAt: "desc" },
    });

    const ahora = new Date();
    const dentro_global = !!config && ahora >= config.fecha_inicio && ahora <= config.fecha_fin;
    const dentro_usuario = !!usuario.modification_end_time && ahora <= usuario.modification_end_time;

    return dentro_global && dentro_usuario;
  } catch {
    return false;
  }
};
