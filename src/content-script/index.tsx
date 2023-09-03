import { convert } from 'html-to-text'
import './styles.scss'

async function getMetadata() {
  const resp = document.getElementById('content')
  console.log(convert(resp?.innerHTML as string))

  return {}
}
async function run() {
  const metadata = await getMetadata()
  console.log(metadata)

  fetch('https://rickandmortyapi.com/api/character/299')
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    })
}

run()
