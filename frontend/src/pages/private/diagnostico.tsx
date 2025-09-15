import { useParams, useSearchParams } from "react-router-dom"

export function Diagnostico() {
  const {id} = useParams()
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")

  if(!token && !id) {
    return(
      <div>
        <h1>Você nao tem autorização para acessar essa pagina</h1>
      </div>
    )
  }

  return(
    <div>
      ola nivaldo
    </div>
  )
}