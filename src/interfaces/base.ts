// TODO: check response interface

interface IError {
  [key: string]: string
}

// export interface IMeta {
//   path: string
//   perPage: number
//   currentPage: number
//   lastPage: number
//   from: number | null
//   to: number | null
//   total: number
// }

export interface IBaseResponse {
  status: number
  error?: IError
  // meta?: IMeta
}
