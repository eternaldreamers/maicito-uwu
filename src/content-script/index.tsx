import { convert } from 'html-to-text'
import { render } from 'react-dom'
// import { createPortal } from 'preact/compat'
import '../base.css'
import './styles.scss'

import { useEffect, useState } from 'react'
import * as jsonContent from './content.json'

async function getMetadata() {
  const resp = document.getElementById('content')

  const content = convert(resp?.innerHTML as string)

  const preContent = `
  Resumen del texto:

  Se busca un **Senior C++ Storage Engineer** altamente motivado para unirse al equipo de **Voltron Data**. En este equipo, la persona tendrá la oportunidad de respaldar y hacer crecer los ecosistemas de **Voltron Data** y **Apache Arrow**, colaborando estrechamente con los equipos de desarrollo de **Voltron Data** para implementar funciones de almacenamiento y E/S eficientes dirigidas a una variedad de soluciones de almacenamiento en red, en la nube y locales.
  
  Destacados del texto:
  
  - **Senior C++ Storage Engineer**
  - **Voltron Data**
  - **Apache Arrow**
  - **innovación en procesamiento de datos**
  - **diversidad e inclusión**
  - **Apache development process**
  - **rendimiento, usabilidad y mantenibilidad**
  - **data lake storage technologies**
  - **distributed networked file systems**
  - **data storage file formats**
  - **compensación**
  - **beneficios**
  - **igualdad de oportunidades**
`

  try {
    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer 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`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant.',
          },
          {
            role: 'user',
            content: `Give me a summary of this text and highlight in bold the most important words of this text: ${content}`,
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        return res
      }).catch(() => {
        return preContent
      })
  } catch (error) {
    return preContent
  }

  return preContent
}

function OneClickContainer() {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({} as any)
  const [gptData, setGptData] = useState('')

  useEffect(() => {
    setIsLoading(true)
    setData(jsonContent)

    getMetadata().then((res) => {
      setGptData(res)
      setIsLoading(false)
    })
  }, [])

  function handleComplete() {
    const elementRef = document.getElementById('application')
    elementRef?.scrollIntoView({ behavior: 'smooth' })

    const first_name: any = document.getElementById('first_name')
    if (first_name) {
      first_name.value = data.firstName
    }

    const last_name: any = document.getElementById('last_name')
    if (last_name) {
      last_name.value = data.lastName
    }

    const email: any = document.getElementById('email')
    if (email) {
      email.value = data.email
    }

    const phone: any = document.getElementById('phone')
    if (phone) {
      phone.value = data.phone
    }

    // custom properties

    const linkedin: any = document.querySelector(
      '[autocomplete="custom-question-linkedin-profile"]',
    )
    if (linkedin) {
      linkedin.value = data.linkedin
    }

    const web: any = document.querySelector('[autocomplete="custom-question-website"]')
    if (web) {
      web.value = data.web
    }

    const github: any = document.querySelector('[autocomplete="custom-question-github"]')
    if (github) {
      github.value = data.github
    }
  }

  return (
    <div className="sidebar-free">
      <div className="one-card">
        <div>One Click</div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div>{gptData}</div>
            <br />
            <div>
              <div>
                <b>firstName: </b>
                {data.firstName}
              </div>
              <div>
                <b>lastName: </b>
                {data.lastName}
              </div>
              <div>
                <b>email: </b>
                {data.email}
              </div>
              <div>
                <b>phone: </b>
                {data.phone}
              </div>
              <div>
                <b>linkedin: </b>
                {data.linkedin}
              </div>
              <div>
                <b>web: </b>
                {data.web}
              </div>
              <div>
                <b>github: </b>
                {data.github}
              </div>
            </div>
          </div>
        )}
        <div>
          <button
            disabled={isLoading}
            type="button"
            className="btn btn-blue"
            onClick={handleComplete}
          >
            Complete with GPT
          </button>
        </div>
      </div>
    </div>
  )
}

async function run() {
  // fetch('https://rickandmortyapi.com/api/character/299')
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data)
  //   })

  const appendContainer = document.getElementById('wrapper')
  appendContainer?.classList.add('external')

  const container = document.createElement('div')
  container.classList.add('one-click')

  appendContainer?.appendChild(container)

  render(<OneClickContainer />, container)
}

run()
