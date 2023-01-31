import Password from "../src/Password"

test("Deve criar a classe Validate Password", () => {
  const rules = [{}]
  const validatePassword = new Password("123", rules)
  expect(validatePassword).toBeTruthy()
})

test("Deve ter pelo menos x caracteres", () => {
  const rules = [
    { minSize: 8 }
  ]
  const validatePassword = new Password("12345678", rules)
  expect(validatePassword).toBeTruthy()
})

test("Deve deve dar erro ao nao ter pelo menos x caracteres", () => {
  const MIN_SIZE = 8
  const rules = [
    { minSize: MIN_SIZE }
  ]
  expect(() => new Password('123', rules)).toThrow(new Error(`Senha deve ter tamanho minimo de ${MIN_SIZE} caracteres`));
})

test("Deve ter pelo menos x caracteres maiúsculos", () => {
  const MIN_UPPERCASE = 3
  const rules = [
    { minUppercase: MIN_UPPERCASE }
  ]
  const validatePassword = new Password("ABCabc123", rules)
  expect(validatePassword).toBeTruthy() 
})

test("Deve deve dar erro ao nao ter pelo menos x caracteres maiúsculos", () => {
  const MIN_UPPERCASE = 3
  const rules = [
    { minUppercase: MIN_UPPERCASE }
  ]
  expect(() => new Password('123', rules)).toThrow(new Error(`Senha deve ter tamanho minimo de ${MIN_UPPERCASE} caracteres maiusculos`));
})

test("Deve ter pelo menos x caracteres minúsculos", () => {
  const MIN_LOWERCASE = 3
  const rules = [
    { minLowercase: MIN_LOWERCASE }
  ]
  const validatePassword = new Password("ABCabc123", rules)
  expect(validatePassword).toBeTruthy() 
})

test("Deve dar erro ao nao ter pelo menos x caracteres minúsculos", () => {
  const MIN_LOWERCASE = 3
  const rules = [
    { minLowercase: MIN_LOWERCASE }
  ]
  expect(() => new Password('123', rules)).toThrow(new Error(`Senha deve ter tamanho minimo de ${MIN_LOWERCASE} caracteres minúsculos`));
})

test("Deve ter pelo menos x dígitos (0-9)", () => {
  const MIN_DIGITS = 3
  const rules = [
    { minDigit: MIN_DIGITS }
  ]
  const validatePassword = new Password("ABCabc123", rules)
  expect(validatePassword).toBeTruthy() 
})

test("Deve dar erro ao nao ter pelo menos x digitos", () => {
  const MIN_DIGITS = 4
  const rules = [
    { minDigit: MIN_DIGITS }
  ]
  expect(() => new Password('123', rules)).toThrow(new Error(`Senha deve ter tamanho minimo de ${MIN_DIGITS} digitos`));
})

test("Deve ter pelo menos x caracteres especiais ( Os caracteres especiais são os caracteres da seguinte string: '!@#$%^&*()-+\/{}[]' )", () => {
  const MIN_SPECIAL_CHARACTER = 3
  const rules = [
    { minSpecialChars: MIN_SPECIAL_CHARACTER }
  ]
  const validatePassword = new Password("!@#$", rules)
  expect(validatePassword).toBeTruthy()  
})

test("Deve dar erro ao nao ter pelo menos x caracteres especiais ( Os caracteres especiais são os caracteres da seguinte string: '!@#$%^&*()-+\/{}[]' )", () => {
  const MIN_SPECIAL_CHARACTER = 5
  const rules = [
    { minSpecialChars: MIN_SPECIAL_CHARACTER }
  ]
  expect(() => new Password('!@#', rules)).toThrow(new Error(`Senha deve ter tamanho minimo de ${MIN_SPECIAL_CHARACTER} caracteres especiais`));
})

test("Não deve ter nenhum caractere repetido em sequência ( ou seja, 'aab' viola esta condição, mas 'aba' não)", () => {
  const rules = [
    { noRepeted: 0 }
  ]
  const password = new Password("123", rules)
  expect(password).toBeTruthy()
})

test("Deve dar erro ao ter caracteres repetidos em sequência ( ou seja, 'aab' viola esta condição, mas 'aba' não)", () => {
  const rules = [
    { noRepeted: 0 }
  ]
  expect(() => new Password("aab", rules)).toThrow(new Error("Senha nao pode ter caracteres repetidos em sequencia"))
})

test("Deve testar todas as regras juntas", () => {
  const rules = [
    { minSize: 8 },
    { minUppercase: 3 },
    { minLowercase: 2 },
    { minDigit: 2 },
    { minSpecialChars: 2 }, 
    { noRepeted: 0 },

  ]
  const password = new Password("TesteSenhaForte!123&", rules)
  expect(password).toBeTruthy() 
})
