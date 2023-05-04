export interface Errors {
    employee_no:string, name:string, email:string, password:string,
     password_confirmation:string,department: string,
  }


  export interface UserContextType {
    user: {}|null|any,
    setUser: (user: {name:string}|{}) => void,
    token: string|null,
    setToken: (token: string|any) => void,
    notification: string|null,
    setNotification: (message: string) => void,
  }