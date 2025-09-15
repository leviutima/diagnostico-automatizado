import { useParams, useSearchParams } from "react-router-dom"

export function Diagnostico() {
  const {id} = useParams()
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")
  
  console.log('=== DEBUG DIAGNOSTICO ===')
  console.log('ID:', id)
  console.log('Token:', token)
  console.log('URL completa:', window.location.href)
  console.log('Pathname:', window.location.pathname)
  console.log('Search:', window.location.search)

  if(!token || !id) {
    return(
      <div style={{padding: '20px'}}>
        <h1>Você não tem autorização para acessar essa página</h1>
        <h2>Debug Info:</h2>
        <p><strong>ID:</strong> {id || 'undefined'}</p>
        <p><strong>Token:</strong> {token || 'undefined'}</p>
        <p><strong>URL:</strong> {window.location.href}</p>
      </div>
    )
  }

  return(
    <div style={{padding: '20px'}}>
      <h1>Olá Nivaldo!</h1>
      <p><strong>ID:</strong> {id}</p>
      <p><strong>Token:</strong> {token}</p>
    </div>
  )
}