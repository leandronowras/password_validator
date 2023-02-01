import Password from "../src/Password"

test("Deve criar a classe Validate Password", () => {
  const rules = [{}]
  const password = new Password("123", rules)
  expect(password.value).toBe("123")
})

test("Deve ter pelo menos x caracteres", () => {
  const rules = [
    { minSize: 8 }
  ]
  const password = new Password("12345678", rules)
  expect(password.value).toBe("12345678")
})

test("Deve deve dar erro ao nao ter pelo menos x caracteres", () => {
  const MIN_SIZE = 8
  const rules = [
    { minSize: MIN_SIZE }
  ]
  const password = new Password('123', rules) 
  expect(password.errors).toStrictEqual(["minSize"])
})

test("Deve ter pelo menos x caracteres maiúsculos", () => {
  const MIN_UPPERCASE = 3
  const rules = [
    { minUppercase: MIN_UPPERCASE }
  ]
  const password = new Password("ABCabc123", rules)
  expect(password.value).toBe("ABCabc123") 
})

test("Deve deve dar erro ao nao ter pelo menos x caracteres maiúsculos", () => {
  const MIN_UPPERCASE = 3
  const rules = [
    { minUppercase: MIN_UPPERCASE }
  ]
  const password = new Password('123', rules) 
  expect(password.errors).toStrictEqual(["minUppercase"])
})

test("Deve ter pelo menos x caracteres minúsculos", () => {
  const MIN_LOWERCASE = 3
  const rules = [
    { minLowercase: MIN_LOWERCASE }
  ]
  const password = new Password("ABCabc123", rules)
  expect(password.value).toBe("ABCabc123") 
})

test("Deve dar erro ao nao ter pelo menos x caracteres minúsculos", () => {
  const MIN_LOWERCASE = 3
  const rules = [
    { minLowercase: MIN_LOWERCASE }
  ]
  const password = new Password('123', rules) 
  expect(password.errors).toStrictEqual(["minLowercase"])
})

test("Deve ter pelo menos x dígitos (0-9)", () => {
  const MIN_DIGITS = 3
  const rules = [
    { minDigit: MIN_DIGITS }
  ]
  const password = new Password("ABCabc123", rules)
  expect(password.value).toBe("ABCabc123") 
})

test("Deve dar erro ao nao ter pelo menos x digitos", () => {
  const MIN_DIGITS = 4
  const rules = [
    { minDigit: MIN_DIGITS }
  ]
  const password = new Password('123', rules) 
  expect(password.errors).toStrictEqual(["minDigit"]) 
})

test("Deve ter pelo menos x caracteres especiais ( Os caracteres especiais são os caracteres da seguinte string: '!@#$%^&*()-+\/{}[]' )", () => {
  const MIN_SPECIAL_CHARACTER = 3
  const rules = [
    { minSpecialChars: MIN_SPECIAL_CHARACTER }
  ]
  const password = new Password("!@#$", rules)
  expect(password.value).toBe("!@#$")  
})

test("Deve dar erro ao nao ter pelo menos x caracteres especiais ( Os caracteres especiais são os caracteres da seguinte string: '!@#$%^&*()-+\/{}[]' )", () => {
  const MIN_SPECIAL_CHARACTER = 5
  const rules = [
    { minSpecialChars: MIN_SPECIAL_CHARACTER }
  ]
  const password = new Password('123', rules) 
  expect(password.errors).toStrictEqual(["minSpecialChars"]) 
})

test("Não deve ter nenhum caractere repetido em sequência ( ou seja, 'aab' viola esta condição, mas 'aba' não)", () => {
  const rules = [
    { noRepeted: 0 }
  ]
  const password = new Password("123", rules)
  expect(password.value).toBe("123")
})

test("Deve dar erro ao ter caracteres repetidos em sequência ( ou seja, 'aab' viola esta condição, mas 'aba' não)", () => {
  const rules = [
    { noRepeted: 0 }
  ]
  const password = new Password('aa123', rules) 
  expect(password.errors).toStrictEqual(["noRepeted"]) 
})

test("Deve testar uma senha valida com todas as regras juntas", () => {
  const rules = [
    { minSize: 8 },
    { minUppercase: 3 },
    { minLowercase: 2 },
    { minDigit: 2 },
    { minSpecialChars: 2 }, 
    { noRepeted: 0 },

  ]
  const password = new Password("TesteSenhaForte!123&", rules)
  expect(password.value).toBe("TesteSenhaForte!123&") 
})

test("Deve testar uma senha invalida com todas as regras juntas", () => {
  const rules = [
    { minSize: 8 },
    { minUppercase: 3 },
    { minLowercase: 3 },
    { minDigit: 2 },
    { minSpecialChars: 2 }, 
    { noRepeted: 0 },

  ]
  const password = new Password("aa", rules)
  expect(password.errors).toStrictEqual(["minSize", "minUppercase", "minLowercase", "minDigit", "minSpecialChars", "noRepeted"]) 
})
