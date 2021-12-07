import { apiAdapter as api } from "@config/index";

export async function makeFile(name: string, contents: string) {
  const { data } = await api.post("/file/", { name, contents });
  return data;
}
