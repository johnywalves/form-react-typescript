interface IRegister {
  id?: number
  name: string
  birthday: string
  cpf: string
  phone: string
  email: string
  obs?: string
}

export const initial: IRegister = {
  name: "",
  birthday: "",
  cpf: "",
  phone: "",
  email: "",
  obs: ""
}

export default IRegister;