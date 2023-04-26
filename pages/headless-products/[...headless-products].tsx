import React from 'react';
import { Builder, builder, BuilderComponent, BuilderContent, Image } from '@builder.io/react';
import builderConfig from '@config/builder'
import styles from './productStyles.module.css'

builder.init(builderConfig.apiKey)


function HeadlessProduct({pdp, header, footer } : any) {

   
    return (
      <>
                {pdp || Builder.isEditing || Builder.isPreviewing ? (
                  <>
                  <BuilderComponent
                    name="symbol"
                    content={header}
                  />
                  <BuilderContent
                    key={pdp?.id}
                    modelName="product"
                    content={pdp}
                  >
                    { (data, loading) => {
                        if (loading) {
                          return <p>Loading</p>
                        }
                    return <>
                        <div className={styles.div}>
                          <div className={styles.div2} style={{backgroundColor: data.heroBackgroundColor }} data-el="div-1">
                            <section className={styles.section} >
                              <div className={styles.div3}></div>
                              <div className={styles.div4}></div>
                              <div className={styles.div5}>
                                <div className={styles.div6}>
                                  <div className={styles.column}>
                                    <div className={styles.div7}>
                                      <div className={styles.div8}><p>{data.name}</p></div>
                                      <div className={styles.div9}>
                                        <p>
                                          <span>
                                          {data.shortBlurb}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className={styles.column2}>
                                    <div className={styles.div10} data-el="div-2">
                                      <Image image={data.image} backgroundSize="contain"></Image>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </section>
                          </div>
                          <div className={styles.div11} data-el="div-3">
                            <section className={styles.section}>
                              <div className={styles.div12}><p>Nutritional Values</p></div>
                              <div className={styles.div13}><p>Per 12 oz. Serving</p></div>
                              {
                               
                               data.nutritionalValues ? (
                               Object.entries(data.nutritionalValues[0]).map((item : any) => {
                                  return(
                                    <div className={styles.repeatingBox} key={item.nutrient}>
                                    <div className={styles.div14}><p>{(item[0]).replace(/([A-Z])/g, ' $1')}</p></div>
                                    <div className={styles.div15}><p>{item[1]}</p></div>
                                    </div>
                                  )
                               }) 
                               ) : <p>It's broken :3 </p>
                                    
                              }

                            </section>
                          </div>
                      </div>
                      

                    </>
                    }}

                  </BuilderContent>
                  <BuilderComponent
                    name="symbol"
                    content={footer}
                  />
                  </>
                ) : (
                  <>
                    <h3>Product not found!</h3>
                  </>
                )}
      </>
    );
  }

  export const getStaticProps = async(context : any) => {
    const targeting = { urlPath: '_', device: '_' } as any;
    const path = `/headless-products/${(context.params?.content as string[])?.join('/') || ''}`;


    const [pdp, header, footer] = await Promise.all([
      builder.get('product', {userAttributes: { ...targeting, urlPath: path }}).promise(),
      builder.get('symbol', {entry: '572845917ac74828a0d24f059cfe5460',}).promise(),
      builder.get('symbol', {entry: '98fc342dbb4f4e50a7a79b89f560d7ad',}).promise()
    ])
  
  
    return({props:{
      'pdp': pdp || null, 
      'header': header || null,
      'footer': footer || null
    }})
  
  }
  
  export const getStaticPaths = async () => {
    const results = await builder.getAll('product', {
      key: 'product:all',
      fields: 'data.url',
      limit: 200,
      options: {
        noTargeting: true,
      },
    });
  
    const paths = results
      .filter(
        (item) =>
          item.data?.url?.startsWith('/headless-products/'),
      )
      .map((item) => ({
        params: {
          content: (item.data?.url?.replace('/headless-products/', '') || '').split('/'),
        },
      }));
  
    return {
      paths,
      fallback: 'blocking' as const,
    };
  };
  
  
 
  export default HeadlessProduct;


