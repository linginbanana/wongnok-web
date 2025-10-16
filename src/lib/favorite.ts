

// lib/favorite.ts
import { api } from "@/lib/axios";


export async function toggleFavoriteMenu(id: string, isActive: boolean) {
  try {
    if (isActive) {
      // เพิ่ม favorite
      const res = await api.post(`/favorites/${id}`);
      return res.status === 200;
    } else {
      // ลบ favorite
      const res = await api.delete(`/favorites/${id}`);
      return res.status === 200;
    }
  } catch (err) {
    console.error("toggleFavoriteMenu error:", err);
    return false;
  }
}

export async function fetchRecipeFavorite({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search?: string;
}) {
  try {
    const res = await api.get("/favorites", {
      params: { page, limit, search },
    });
    return res.data;
  } catch (err) {
    console.error("fetchRecipeFavorite error:", err);
    throw err;
  }
}
