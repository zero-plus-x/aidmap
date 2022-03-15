type CountryInfo = {
  typeCode?: string
  textCode?: string
  link?: string
}

type CountryCenter = number[]

export type Country = {
  nameCode: string
  localLanguage: string
  info: CountryInfo[]
  center: CountryCenter
  zoom: number
}

export type Countries = {
  [key: string]: Country
}
