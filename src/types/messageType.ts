
export type Message = {
  id: string,
  type: "me" | "user",
  login: string,
  message:string,
}