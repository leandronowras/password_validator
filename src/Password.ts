type RulesInput = {
  minSize?: number,
  minUppercase?: number,
  minLowercase?: number,
  minDigit?: number,
  minSpecialChars?: number,
  noRepeted?: number
}[]

export default class Password {
  value: string
  // #todo:
  // criar array com nome das rules e garantir q o metodo certo da classe seja chamado
  // depois separar por arquivos e ter 2 branches para comparar codigo
  // this.password por ultimo, passar passard em cada metodo
  // refatorar nome da classe so para password
  // array vazio e depois recebe push em quais regras nao passou, se for length 0 salva a senha

  constructor(password: string, rules: RulesInput) {
    rules.map((rule) => {
      if (Object.keys(rule).toString() === "minSize") {
        this.minSize(password, Object.values(rule))
      }
      else if (Object.keys(rule).toString() === "minUppercase") {
        this.minUppercase(password, Object.values(rule))
      }
      else if (Object.keys(rule).toString() === "minLowercase") {
        this.minLowercase(password, Object.values(rule))
      }
      else if (Object.keys(rule).toString() === "minDigit") {
        this.minDigit(password, Object.values(rule))
      }
      else if (Object.keys(rule).toString() === "minSpecialChars") {
        this.minSpecialChars(password, Object.values(rule))
      }
      else if (Object.keys(rule).toString() === "noRepeted") {
        this.noRepeted(password, Object.values(rule))
      }
    })

    this.value = password
  }

  minSize(password: string, value: number | number[]) {
    if (password.length < value) throw new Error(`Senha deve ter tamanho minimo de ${value} caracteres`)
  }
  
  minUppercase(password: string, value: number | number[]) {
    if (value == 0) return
    const upperCases = password.match(/[A-Z]/g)

    if (upperCases == null) throw new Error(`Senha deve ter tamanho minimo de ${value} caracteres maiusculos`) 
    if (upperCases.length < value) throw new Error(`Senha deve ter tamanho minimo de ${value} caracteres maiusculos`)
  }

  minLowercase(password: string, value: number | number[]) {
    if (value == 0) return
    const lowerCases = password.match(/[a-z]/g) 

    if (lowerCases == null) throw new Error(`Senha deve ter tamanho minimo de ${value} caracteres minúsculos`) 
    if (lowerCases.length < value) throw new Error(`Senha deve ter tamanho minimo de ${value} caracteres minúsculos`)
  }

  minDigit(password: string, value:number | number[]) {
    if (value == 0) return
    const digits = password.match(/[0-9]/g) 

    if (digits == null) throw new Error(`Senha deve ter tamanho minimo de ${value} Digitos`)  
    if (digits.length < value) throw new Error(`Senha deve ter tamanho minimo de ${value} digitos`)
  }

  minSpecialChars(password: string, value:number | number[]) {
    if (value == 0) return
    const specialChars = password.match(/[!@#$%^&*()\-+\/{}\[\]\\]/g) 
    if (specialChars == null) throw new Error(`Senha deve ter tamanho minimo de ${value} caracteres especiais`)  
    if (specialChars.length < value) throw new Error(`Senha deve ter tamanho minimo de ${value} caracteres especiais`)
  }

  noRepeted(password: string, value: number | number[]) {
    if (password.length < 2) return
    for (let i = 0; i < password.length - 1; i++) {
      if (password[i] === password[i + 1]) {
        throw new Error('Senha nao pode ter caracteres repetidos em sequencia')
      }
    }
  }
}