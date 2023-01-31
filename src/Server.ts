import express from 'express'
import Password from './Password'
const app = express()
const PORT = 8080

app.use(express.json())

app.post("/verify", (request, response) => {
  const passwordInput = request.body.password

  const rulesArray = request.body.rules
  const rulesFormated = rulesArray.map((rule: string) => {
    const temp = Object.values(rule)
    return {[temp[0]]: temp[1]}
  }) 
 
  const password = new Password(passwordInput, rulesFormated)

  if (password.value) {
    response.send(
      {
        "verify": true,
        "noMatch": []
      }
    )
  } else {
    response.send(
      {
        "verify": false,
        "noMatch": password.errors
      }
    )
  }
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})