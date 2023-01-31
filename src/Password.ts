type RulesInput = {
  minSize?: number,
  minUppercase?: number,
  minLowercase?: number,
  minDigit?: number,
  minSpecialChars?: number,
  noRepeted?: number
}[]

export default class Password {
  value: string | undefined
  errors: string[] = []
  // #todo:
  // criar array com nome das rules e garantir q o metodo certo da classe seja chamado
  // depois separar por arquivos e ter 2 branches para comparar codigo
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

    if (this.errors.length === 0) {
      this.value = password
    }
  }

  minSize(password: string, value: number | number[]) {
    if (password.length < value) this.errors.push('minSize')
  }
  
  minUppercase(password: string, value: number | number[]) {
    if (value == 0) return
    const upperCases = password.match(/[A-Z]/g)

    if (upperCases == null) {
      this.errors.push('minUppercase')
      return
    } 

    if (upperCases.length < value) this.errors.push('minUppercase')
  }

  minLowercase(password: string, value: number | number[]) {
    if (value == 0) return
    const lowerCases = password.match(/[a-z]/g) 

    if (lowerCases == null) {
      this.errors.push('minLowercase') 
      return
    }
    if (lowerCases.length < value) this.errors.push('minLowercase') 
  }

  minDigit(password: string, value:number | number[]) {
    if (value == 0) return
    const digits = password.match(/[0-9]/g) 

    if (digits == null) {
      this.errors.push('minDigit') 
      return
    }
    if (digits.length < value) this.errors.push('minDigit')
  }

  minSpecialChars(password: string, value:number | number[]) {
    if (value == 0) return
    const specialChars = password.match(/[!@#$%^&*()\-+\/{}\[\]\\]/g) 
    if (specialChars == null) {
      this.errors.push('minSpecialChars')  
      return
    }
    if (specialChars.length < value) this.errors.push('minSpecialChars')  
  }

  noRepeted(password: string, value: number | number[]) {
    if (password.length < 2) return
    for (let i = 0; i < password.length - 1; i++) {
      if (password[i] === password[i + 1]) {
        this.errors.push('noRepeted')  
      }
    }
  }
}