import React, { Fragment, useEffect, useState } from "react";
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

let outputJson = {};

export default function Home() {

  const [fields, setFields] = useState(null);

  const handleFileSelected = e => {

    if (e.target.files.length > 0) {

      var fileReader = new FileReader();
  
      fileReader.onload = ev => {
        outputJson = JSON.parse(ev.target.result);
        setFields(JSON.parse(ev.target.result));
  
        console.log(outputJson);
  
      };
  
      fileReader.readAsText(Array.from(e.target.files)[0], "UTF-8");

    }
  }

  const handleValueChange = (key, value) => {
    outputJson[key] = value;
  }

  const download = () => {
    const exportJson = JSON.stringify(outputJson);
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(exportJson);

    let exportFileDefaultName = 'es.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  return (
    <>
      <Head>
        <title>JSON Editor - Tiendana</title>
        <meta name="description" content="JSON Editor" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

        <img src="https://d320eox725dcq1.cloudfront.net/assets/images/logo.svg" alt="" className={styles.logo} />

        <input type="file" className={styles.file}
          label='Upload' accept='.json' 
          onChange={handleFileSelected} />

          <div className={styles.fields}>
            {
              fields !== null ?
              <>
                <button className="download" onClick={download}>Guardar</button>
                {Object.keys(fields).map((key, index) => <div className={styles.field} key={index}>
                  <div className={styles.key} title={key}>{key}</div>
                  <div className={styles.value}>
                    <textarea type="text" defaultValue={fields[key]} onChange={e => handleValueChange(key, e.target.value)} ></textarea>
                  </div>
                </div>)}
              </> : null
            }
          </div>
      </main>
    </>
  )
}
