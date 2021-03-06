import Head from 'next/head'
import { useState } from 'react'
import useSWR from 'swr'
import cx from 'clsx'

import styles from '../styles/Home.module.css'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {
  const [selectedDb, setSelectedDb] = useState(null)
  const {
    data: itemsList,
    mutate,
    isValidating,
  } = useSWR(selectedDb ? '/api/get-entries/' + selectedDb : null, fetcher)
  const { data: databaseList } = useSWR('/api/databases/list', fetcher)

  function addNewEntry(event) {
    event.preventDefault()

    const text = event.target.children.text.value

    fetch('/api/add-entry/' + selectedDb, {
      method: 'POST',
      body: JSON.stringify({ text }),
      headers: { 'Content-Type': 'application/json' },
    }).then(() => {
      event.target.children.text.value = ''
      mutate('/api/get-entries')
    })
  }

  console.log(itemsList)

  return (
    <div className={styles.container}>
      <Head>
        <title>Explore notion API</title>
        <meta
          name="description"
          content="Explore notion API by omarhoumz.com"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <h1>Databases</h1>

          <ul className={styles.ul}>
            {databaseList?.results.map(({ id, title }) => {
              return (
                <li key={id}>
                  <button
                    type="button"
                    className={cx(styles.button, {
                      [styles.selected]: selectedDb === id,
                    })}
                    onClick={() => setSelectedDb(id)}
                  >
                    {title}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <div>
          <h1>Hi</h1>

          <form onSubmit={addNewEntry}>
            <input type="text" name="text" autoComplete="off" />

            <button type="submit">Add new entry</button>
          </form>

          {!itemsList || isValidating ? null : (
            <>
              <ul>
                {itemsList?.results?.map(({ properties, id }) => {
                  return (
                    <li key={id}>{properties?.Name?.title[0]?.plain_text}</li>
                  )
                })}
              </ul>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
