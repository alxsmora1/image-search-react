import { useState } from "react"
import { Field, Form, Formik } from "formik"
import './header.css'
import './content.css'
import './article.css'

const App = () => {
  const [photos, setPhotos] = useState([])
  const open = url => window.open(url)
  console.log(photos)
  return (
    <div>
      <header>
        <h2 className="logo">Image Search App </h2>
        <Formik
        initialValues={{ search: '' }}
        onSubmit={async values => {
          // Llamar a la API
          const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
          {
            headers: {
              'Authorization': 'Client-ID nTihTOELMzpv0Sabwjz1ySq3zCPRfq-JkCn3fKVWH7o'
            }
          })
          const data = await response.json()
          setPhotos(data.results)
        }}
        >
          <Form>
            <Field name="search" placeholder="Search images" />
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map(photo => 
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular} alt={photo.alt_description} />
              <p>{[photo.description, photo.alt_description].join(' - ')}</p>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
