export type Task = {
  id: string
  title: string
  deadline: string
  isDone: boolean
  status: string
  isEditing: boolean
  userName:string
  uid:string
}
export  type getArticles = {
    id:number,
    title:string,
    description:string,
    cover_image:string|null
  }
  export type DashboardTypes={
  myCards: number;
  doneCards: number;
  activeCards: number;
  progress: number;
  }
  export type UserProfile = {
  name: string
  age: number
  about: string
  docId:string
}
export type Login = {
  email:string|number
}